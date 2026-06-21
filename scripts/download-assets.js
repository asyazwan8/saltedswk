const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE = 'https://salted.myfoodcourt.info/img/PortalImage/909';

const assets = [
  // Brand
  { url: `${BASE}/Portal/909_12273544_980111015344667_8236064075758703159_o.jpg`, dest: 'public/brand/restaurant.jpg' },

  // Menu food images
  { url: `${BASE}/Food/909_8662_5.jpg`, dest: 'public/menu/sarawak-laksa.jpg' },
  { url: `${BASE}/Food/909_8658_1.jpg`, dest: 'public/menu/kolo-mee.jpg' },
  { url: `${BASE}/Food/909_8663_6.jpg`, dest: 'public/menu/mee-kolok-daging.jpg' },
  { url: `${BASE}/Food/909_8661_4.jpg`, dest: 'public/menu/vegetarian-kolo-mee.jpg' },
  { url: `${BASE}/Food/909_8664_7.jpg`, dest: 'public/menu/kolo-kueh-tiaw.jpg' },
  { url: `${BASE}/Food/909_8660_3.jpg`, dest: 'public/menu/beehoon-belacan.jpg' },
  { url: `${BASE}/Food/909_8665_8.jpg`, dest: 'public/menu/crispy-tomato-mee.jpg' },
  { url: `${BASE}/Food/909_8659_2.jpg`, dest: 'public/menu/teh-c-peng-special.jpg' },
  { url: `${BASE}/Food/909_8666_9.jpg`, dest: 'public/menu/fruit-cocktail-pudding.jpg' },
];

function download(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); console.log('✅ Downloaded:', dest); resolve(); });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        console.warn(`⚠️  Skipped (${res.statusCode}):`, url);
        resolve();
      }
    }).on('error', (e) => { console.warn('⚠️  Error:', e.message); resolve(); });
  });
}

(async () => {
  console.log('📥 Downloading SALTed brand and menu assets...\n');
  for (const a of assets) await download(a.url, a.dest);
  console.log('\n✅ Asset download complete. Check public/brand/ and public/menu/');
  console.log('📝 NOTE: Download logo.png manually from @saltedswk Instagram profile picture');
  console.log('   and save it to public/brand/logo.png');
})();
