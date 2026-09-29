/**
 * Makes one landing-page hero image in both formats the site uses.
 *
 *   node scripts/make-paid-hero.mjs <source> <output-base> <mobile|desktop> [focusY]
 *
 * - mobile  → 4:5 crop, at most 1122 px wide (same as the homepage mobile banners)
 * - desktop → 2.39:1 crop, at most 1939 px wide (same as the homepage desktop banners)
 * - Writes <output-base>.webp and <output-base>.jpg. Never upscales.
 * - focusY (0 = top, 1 = bottom, default 0.5) chooses which part of the height is kept.
 *
 * Example:
 *   node scripts/make-paid-hero.mjs public/images/cloth-drying-hangers.webp \
 *     public/images/paid/cloth-drying-hangers-mobile mobile 0.4
 */
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

const SPECS = {
  mobile: { ratio: 4 / 5, maxWidth: 1122 },
  desktop: { ratio: 2.39, maxWidth: 1939 },
};

const [source, outputBase, kind, focusArg] = process.argv.slice(2);
const spec = SPECS[kind];

if (!source || !outputBase || !spec) {
  console.error(
    "Usage: node scripts/make-paid-hero.mjs <source> <output-base> <mobile|desktop> [focusY]",
  );
  process.exit(1);
}

const focusY = Math.min(1, Math.max(0, Number(focusArg ?? 0.5) || 0));
const { width, height } = await sharp(source).metadata();

let cropWidth = width;
let cropHeight = Math.round(width / spec.ratio);
if (cropHeight > height) {
  cropHeight = height;
  cropWidth = Math.round(height * spec.ratio);
}

const left = Math.round((width - cropWidth) / 2);
const top = Math.round((height - cropHeight) * focusY);
const outWidth = Math.min(cropWidth, spec.maxWidth);
const outHeight = Math.round(outWidth / spec.ratio);

const pipeline = sharp(source)
  .extract({ left, top, width: cropWidth, height: cropHeight })
  .resize(outWidth, outHeight, { kernel: "lanczos3" });

mkdirSync(dirname(outputBase), { recursive: true });
await pipeline.clone().webp({ quality: 82 }).toFile(`${outputBase}.webp`);
await pipeline
  .clone()
  .jpeg({ quality: 85, mozjpeg: true, progressive: true })
  .toFile(`${outputBase}.jpg`);

console.log(
  `${outputBase}.webp + .jpg  ${outWidth}x${outHeight}  (${kind}, from ${width}x${height})`,
);
