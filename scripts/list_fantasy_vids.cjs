const fs = require('fs');

// Look at the video URLs we found from fantasy.co
const allVids = [
  'https://www.datocms-assets.com/157026/1751470729-home-desktop-sizzle-july2.mp4',
  'https://www.datocms-assets.com/157026/1782861061-salesforce-sales-cloud.mp4',
  'https://www.datocms-assets.com/157026/1782928783-royal-caribbean-rcbook.mp4',
  'https://www.datocms-assets.com/157026/1782928708-liv-golf-flag.mp4',
  'https://www.datocms-assets.com/157026/1782928813-fantasy-slow-motion-generative-interfaces-fantasy-interactive.mp4',
  'https://www.datocms-assets.com/157026/1782928811-fantasy-if-it-looks-like-a-duck-2-copy.mp4',
  'https://www.datocms-assets.com/157026/1782931446-fantasy-build-your-own-software-hero.mp4',
  'https://www.datocms-assets.com/157026/1782931449-fantasy-what-is-an-app-now-hero-upscaled.mp4',
  'https://www.datocms-assets.com/157026/1782846164-bny-eliza-ai-opening-hero-desktop.mp4',
  'https://www.datocms-assets.com/157026/1782928796-royal-caribbean-montage.mp4',
  'https://www.datocms-assets.com/157026/1782931452-fantasy-sizzle-reel-2026.mp4',
  'https://www.datocms-assets.com/157026/1782931430-art-basel-app-feature-montage.mp4',
  'https://www.datocms-assets.com/157026/1782924877-product-innovation-travel-vignette.mp4',
  'https://www.datocms-assets.com/157026/1782924855-amper-platform-hero-desktop.mp4',
  'https://www.datocms-assets.com/157026/1782928766-fantasy-careers-hero-4.mp4'
];

allVids.forEach(v => console.log(v.split('/').pop()));
