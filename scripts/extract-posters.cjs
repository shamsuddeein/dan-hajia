const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 9876;
const manifestPath = path.join(__dirname, '..', 'media', 'media-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const videoRecords = manifest.records.filter(r => r.destination_relative.endsWith('.mp4'));
console.log(`Found ${videoRecords.length} video records.`);

const postersDir = path.join(__dirname, '..', 'public', 'media', 'posters');
if (!fs.existsSync(postersDir)) {
  fs.mkdirSync(postersDir, { recursive: true });
}

let savedCount = 0;
let chromeProcess = null;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (parsedUrl.pathname === '/') {
    // Serve HTML page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html>
<head><title>Poster Generator</title></head>
<body>
<h1>Extracting Posters...</h1>
<div id="status">Starting...</div>
<script>
const videos = ${JSON.stringify(videoRecords)};
const statusDiv = document.getElementById('status');

async function processVideos() {
  for (let i = 0; i < videos.length; i++) {
    const item = videos[i];
    statusDiv.textContent = 'Processing ' + (i + 1) + '/' + videos.length + ': ' + item.destination_relative;
    try {
      await extractPoster(item);
    } catch (err) {
      console.error('Error on ' + item.destination_relative, err);
    }
  }
  statusDiv.textContent = 'All done!';
  await fetch('/done', { method: 'POST' });
}

function extractPoster(item) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'auto';
    video.src = '/media/' + item.destination_relative;

    let seeked = false;

    video.onloadeddata = () => {
      const targetTime = Math.min(1.0, (video.duration || 2) * 0.25);
      video.currentTime = targetTime;
    };

    video.onseeked = async () => {
      if (seeked) return;
      seeked = true;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        await fetch('/save-poster', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: item.id,
            dataUrl: dataUrl,
            width: canvas.width,
            height: canvas.height
          })
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    };

    video.onerror = (e) => {
      console.error('Video error on ' + item.id, e);
      resolve(); // proceed
    };

    setTimeout(() => {
      if (!seeked) {
        console.warn('Timeout waiting for video ' + item.id);
        resolve();
      }
    }, 15000);
  });
}

window.onload = () => {
  setTimeout(processVideos, 500);
};
</script>
</body>
</html>
    `);
    return;
  }

  if (parsedUrl.pathname.startsWith('/media/')) {
    const relPath = decodeURIComponent(parsedUrl.pathname.replace('/media/', ''));
    const filePath = path.join(__dirname, '..', 'media', relPath);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'application/octet-stream';
      if (ext === '.mp4') contentType = 'video/mp4';
      if (ext === '.jpeg' || ext === '.jpg') contentType = 'image/jpeg';
      
      const stat = fs.statSync(filePath);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stat.size,
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    } else {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
  }

  if (parsedUrl.pathname === '/save-poster' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const base64Data = payload.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
        const filename = 'source-' + payload.id + '-poster.jpeg';
        const targetFile = path.join(postersDir, filename);
        fs.writeFileSync(targetFile, base64Data, 'base64');
        savedCount++;
        console.log(`Saved poster (${savedCount}/${videoRecords.length}): ${filename}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, filename: filename }));
      } catch (err) {
        console.error('Error saving poster:', err);
        res.writeHead(500);
        res.end('Error');
      }
    });
    return;
  }

  if (parsedUrl.pathname === '/done' && req.method === 'POST') {
    console.log(`Done! Total posters saved: ${savedCount}`);
    res.writeHead(200);
    res.end('OK');
    cleanup();
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

function cleanup() {
  setTimeout(() => {
    if (chromeProcess) {
      try { chromeProcess.kill(); } catch (e) {}
    }
    server.close(() => {
      console.log('Server closed. Poster generation complete.');
      process.exit(0);
    });
  }, 1000);
}

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    `http://localhost:${PORT}`
  ]);

  chromeProcess.on('error', (err) => {
    console.error('Chrome spawn error:', err);
  });
});

