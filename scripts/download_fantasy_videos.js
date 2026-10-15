const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  {
    name: 'fantasy-hero-sizzle.mp4',
    url: 'https://www.datocms-assets.com/157026/1751470729-home-desktop-sizzle-july2.mp4'
  },
  {
    name: 'fantasy-mobile-app.mp4',
    url: 'https://www.datocms-assets.com/157026/1782931430-art-basel-app-feature-montage.mp4'
  },
  {
    name: 'fantasy-web-salesforce.mp4',
    url: 'https://www.datocms-assets.com/157026/1782861061-salesforce-sales-cloud.mp4'
  },
  {
    name: 'fantasy-ai-eliza.mp4',
    url: 'https://www.datocms-assets.com/157026/1782846164-bny-eliza-ai-opening-hero-desktop.mp4'
  },
  {
    name: 'fantasy-master-sizzle.mp4',
    url: 'https://www.datocms-assets.com/157026/1782931452-fantasy-sizzle-reel-2026.mp4'
  },
  {
    name: 'fantasy-software-build.mp4',
    url: 'https://www.datocms-assets.com/157026/1782931446-fantasy-build-your-own-software-hero.mp4'
  },
  {
    name: 'fantasy-spatial-rcbook.mp4',
    url: 'https://www.datocms-assets.com/157026/1782928783-royal-caribbean-rcbook.mp4'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'videos');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadFile(item) {
  const dest = path.join(destDir, item.name);
  return new Promise((resolve, reject) => {
    console.log(`Starting download: ${item.name} from ${item.url}`);
    const file = fs.createWriteStream(dest);
    https.get(item.url, res => {
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`Failed to download ${item.name}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          console.log(`Successfully downloaded ${item.name} (${Math.round(stats.size / 1024)} KB)`);
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
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('All downloads completed!');
}

run();
