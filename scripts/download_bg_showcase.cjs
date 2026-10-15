const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  {
    name: 'bg-slowmo-interfaces.mp4',
    url: 'https://www.datocms-assets.com/157026/1782928813-fantasy-slow-motion-generative-interfaces-fantasy-interactive.mp4'
  },
  {
    name: 'bg-apps-showcase.mp4',
    url: 'https://www.datocms-assets.com/157026/1782931449-fantasy-what-is-an-app-now-hero-upscaled.mp4'
  },
  {
    name: 'bg-web-platforms.mp4',
    url: 'https://www.datocms-assets.com/157026/1782924855-amper-platform-hero-desktop.mp4'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'videos');

async function downloadFile(item) {
  const dest = path.join(destDir, item.name);
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${item.name}...`);
    const file = fs.createWriteStream(dest);
    https.get(item.url, res => {
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`Failed ${item.name}: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          console.log(`✓ ${item.name} (${Math.round(stats.size / 1024)} KB)`);
          resolve();
        });
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item);
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log('All 3 background videos downloaded!');
}

run();
