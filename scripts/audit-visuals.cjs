const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const desktopOut = path.join(__dirname, '..', 'audit-desktop.png');
const mobileOut = path.join(__dirname, '..', 'audit-mobile.png');

async function audit() {
  console.log('Auditing desktop (1440x900)...');
  const desktopProc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1440,2400',
    `--screenshot=${desktopOut}`,
    'http://localhost:5173/'
  ]);

  await new Promise(res => desktopProc.on('close', res));
  console.log('Desktop screenshot saved:', fs.existsSync(desktopOut));

  console.log('Auditing mobile (390x844)...');
  const mobileProc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=390,2000',
    `--screenshot=${mobileOut}`,
    'http://localhost:5173/'
  ]);

  await new Promise(res => mobileProc.on('close', res));
  console.log('Mobile screenshot saved:', fs.existsSync(mobileOut));
}

audit().then(() => {
  console.log('Visual audit complete.');
  process.exit(0);
});

