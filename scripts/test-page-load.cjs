const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const args = [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  'http://localhost:5173/'
];

const chrome = spawn(chromePath, args);

setTimeout(async () => {
  try {
    const response = await fetch('http://localhost:9222/json');
    const tabs = await response.json();
    const targetTab = tabs.find(t => t.url.includes('5173'));
    if (targetTab) {
      console.log('Target Tab found!');
      console.log('Title:', targetTab.title);
      console.log('URL:', targetTab.url);
    } else {
      console.log('All tabs:', tabs.map(t => ({ title: t.title, url: t.url })));
    }
  } catch (err) {
    console.error('CDP error:', err.message);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}, 3000);
