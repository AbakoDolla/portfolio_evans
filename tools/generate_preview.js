import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';

const IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images');
const OUT_DIR = path.resolve(process.cwd(), 'public');
const PREVIEW_PATH = path.join(OUT_DIR, 'preview.png');

async function generatePreview() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('No public/images directory found.');
    process.exit(1);
  }

  const allFiles = fs.readdirSync(IMAGES_DIR);
  const files = allFiles
    .filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
    .map((f) => path.join(IMAGES_DIR, f));

  if (files.length === 0) {
    console.error('No images found in public/images to generate preview.');
    process.exit(1);
  }

  const src = files[0];
  console.log('Using source for preview:', path.basename(src));

  // generate OG preview 1200x630 center-cropped
  const image = await Jimp.read(src);
  image.cover(1200, 630, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
  await image.quality(80).writeAsync(PREVIEW_PATH);
  console.log('Generated', PREVIEW_PATH);

  // optimize images: produce -opt.webp versions
  for (const f of files) {
    try {
      const img = await Jimp.read(f);
      const name = path.parse(f).name;
      const outWebp = path.join(IMAGES_DIR, `${name}-opt.webp`);
      img.resize(1600, Jimp.AUTO).quality(80);
      await img.writeAsync(outWebp);
      console.log('Optimized', path.basename(f));
    } catch (err) {
      console.warn('Failed to optimize', f, err && err.message ? err.message : err);
    }
  }

  console.log('Image optimization complete.');
}

generatePreview().catch((err) => {
  console.error(err);
  process.exit(1);
});
