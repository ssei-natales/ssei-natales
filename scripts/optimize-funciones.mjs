import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "funciones");
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort();

const converted = [];

for (const file of files) {
  const input = path.join(dir, file);
  const base = path.basename(file, path.extname(file)).toLowerCase();
  const output = path.join(dir, `${base}.webp`);
  if (fs.existsSync(output) && output !== input) {
    converted.push(input);
    continue;
  }

  const before = fs.statSync(input).size;
  await sharp(input)
    .resize({ width: 1200, height: 800, fit: "cover", position: "bottom" })
    .webp({ quality: 80 })
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
