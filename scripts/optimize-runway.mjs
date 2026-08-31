import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "Barra_lateral");

const targets = [
  { file: "pista.png", width: 320 },
  { file: "avion.png", width: 280 },
  { file: "vsei.png", width: 280 },
];

for (const { file, width } of targets) {
  const input = path.join(dir, file);
  const base = path.basename(file, path.extname(file));
  const output = path.join(dir, `${base}.webp`);

  const before = fs.statSync(input).size;
  await sharp(input).resize({ width }).webp({ quality: 90 }).toFile(output);
  const after = fs.statSync(output).size;
  console.log(`${file} -> ${base}.webp  ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB`);
}

for (const { file } of targets) {
  try {
    fs.unlinkSync(path.join(dir, file));
  } catch (e) {
    console.log(`No se pudo borrar todavía ${file} (${e.code}) — borralo a mano si sigue ahí.`);
  }
}
