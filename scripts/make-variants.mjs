import sharp from "sharp";

const [source, ...widthArgs] = process.argv.slice(2);

if (!source || widthArgs.length === 0) {
  console.error("Usage: node scripts/make-variants.mjs <file.webp> <width...>");
  process.exit(1);
}

const base = source.replace(/\.webp$/i, "");
const image = sharp(source);
const metadata = await image.metadata();

for (const arg of widthArgs) {
  const targetWidth = Number(arg);
  if (!targetWidth || Number.isNaN(targetWidth)) {
    console.error(`Invalid width: ${arg}`);
    continue;
  }

  const outWidth = Math.min(metadata.width ?? targetWidth, targetWidth);
  const outPath = `${base}-${targetWidth}.webp`;

  await sharp(source).resize(outWidth).webp({ quality: 78 }).toFile(outPath);

  console.log(`${outPath} (${outWidth}px, source was ${metadata.width}px)`);
}
