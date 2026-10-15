const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://www.datocms-assets.com/157026/1782928796-royal-caribbean-montage.mp4';
const dest = path.join(__dirname, '..', 'public', 'videos', 'fantasy-rc-montage.mp4');

console.log('Downloading royal caribbean montage...');
const file = fs.createWriteStream(dest);
https.get(url, res => {
  if (res.statusCode !== 200) {
    file.close();
    console.error('Failed:', res.statusCode);
    return;
  }
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      const stats = fs.statSync(dest);
      console.log(`✓ fantasy-rc-montage.mp4 (${Math.round(stats.size / 1024)} KB)`);
    });
  });
}).on('error', err => console.error(err.message));
