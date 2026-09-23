import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/favicon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generate() {
  await sharp(svgBuffer).resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp(svgBuffer).resize(16, 16).png().toFile('public/favicon-16x16.png');
  await sharp(svgBuffer).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(svgBuffer).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(svgBuffer).resize(512, 512).png().toFile('public/icon-512.png');
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico');
  console.log('Favicons generated successfully!');
}

generate().catch(console.error);
