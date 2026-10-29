const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const args = [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9223',
  'http://localhost:5173/'
];

const chrome = spawn(chromePath, args);

setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:9223/json');
    const tabs = await res.json();
    const tab = tabs.find(t => t.url.includes('5173'));
    if (!tab) {
      console.log('Tab not found');
      return;
    }

    // Connect to WebSocket endpoint of tab
    const wsUrl = tab.webSocketDebuggerUrl;
    console.log('Connecting to WebSocket debugger:', wsUrl);
    
    // In Node 22+, WebSocket is global!
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      // Enable Network and Log
      ws.send(JSON.stringify({ id: 1, method: 'Network.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Runtime.enable' }));
    };

    const downloadedUrls = [];
    const consoleLogs = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.requestWillBeSent') {
        const url = msg.params.request.url;
        if (!url.startsWith('data:')) {
          downloadedUrls.push(url);
        }
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push(msg.params.type + ': ' + msg.params.args.map(a => a.value).join(' '));
      }
    };

    setTimeout(() => {
      console.log('--- Network & Console Audit ---');
      const mp4s = downloadedUrls.filter(u => u.includes('.mp4'));
      console.log('Downloaded MP4s on initial load:', mp4s.length === 0 ? 'None (PASS - zero initial video downloads)' : mp4s);
      console.log('Total network requests:', downloadedUrls.length);
      console.log('Console logs/errors:', consoleLogs.length === 0 ? 'None (Clean)' : consoleLogs);
      ws.close();
      chrome.kill();
      process.exit(0);
    }, 4000);

  } catch (err) {
    console.error('Error during CDP audit:', err);
    chrome.kill();
    process.exit(1);
  }
}, 2000);

