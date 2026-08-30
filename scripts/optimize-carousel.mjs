import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "carousel");
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort();

const converted = [];

for (const file of files) {
  const input = path.join(dir, file);
  const base = path.basename(file, path.extname(file));
  const output = path.join(dir, `${base}.webp`);
  if (fs.existsSync(output)) {
    converted.push(input);
    continue;
  }

  const before = fs.statSync(input).size;
  await sharp(input)
    .resize({ width: 1920, height: 1080, fit: "cover" })
    .webp({ quality: 78 })
    .toFile(output);
  const after = fs.statSync(output).size;
  console.log(`${file} -> ${base}.webp  ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB`);
  converted.push(input);
}

for (const input of converted) {
  try {
    fs.unlinkSync(input);
  } catch (e) {
    console.log(`No se pudo borrar todavía ${path.basename(input)} (${e.code}) — borralo a mano si sigue ahí.`);
  }
}
