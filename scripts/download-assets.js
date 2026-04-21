import fs from 'fs';
import path from 'path';
import https from 'https';

const RELEASE_BASE = "https://github.com/sungjinwooo8/TuneX/releases/download/v1.0.0";
const MODELS = [
  'bugatti.glb',
  'ferrari.glb',
  'porsche.glb',
  'mercedes.glb',
  'mclaren.glb',
  'carbon_fiber_bugatti.glb',
  'stock_mitchlin_pax.glb'
];

const targetDir = path.join(process.cwd(), 'public', 'models');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect (GitHub Releases redirect to AWS S3)
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function start() {
  console.log('Starting asset sync from GitHub Releases...');
  for (const model of MODELS) {
    const url = `${RELEASE_BASE}/${model}`;
    const dest = path.join(targetDir, model);
    try {
      await downloadFile(url, dest);
    } catch (err) {
      console.error(`Error downloading ${model}:`, err.message);
    }
  }
  console.log('Asset sync complete!');
}

start();
