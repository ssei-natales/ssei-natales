import sharp from "sharp";

const DIR = "public/Barra_lateral";
const TARGET_WIDTH = 300;
const TILE_REPEATS = 12;

async function trimAndResize(path, width) {
  const trimmed = await sharp(path).trim({ threshold: 10 }).toBuffer();
  const buf = await sharp(trimmed).resize({ width }).toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, width: meta.width, height: meta.height };
}

async function main() {
  const top = await trimAndResize(`${DIR}/pista-28-1.webp`, TARGET_WIDTH);
  const bottom = await trimAndResize(`${DIR}/pista-10-1.webp`, TARGET_WIDTH);

  // Puntos de corte elegidos a mano en el hueco entre dos luces (detectados
  // por análisis de píxeles), medidos en cada imagen original recortada a
  // su contenido (350px y 344px de ancho respectivamente) y reescalados.
  const topCutRaw = 699; // en pista-28-1 recortada (350px de ancho)
  const tileEndRaw = 1006; // fin del tramo repetible en pista-28-1
  const bottomCutRaw = 1629; // en pista-10-1 recortada (344px de ancho) — bien arriba del "10"

  const topScale = top.width / 350;
  const bottomScale = bottom.width / 344;

  const topCut = Math.round(topCutRaw * topScale);
  const tileEnd = Math.round(tileEndRaw * topScale);
  const tileHeight = tileEnd - topCut;
  const bottomCut = Math.round(bottomCutRaw * bottomScale);
  const bottomHeight = bottom.height - bottomCut;

  const topSlice = await sharp(top.buf).extract({ left: 0, top: 0, width: top.width, height: topCut }).toBuffer();
  const tile = await sharp(top.buf).extract({ left: 0, top: topCut, width: top.width, height: tileHeight }).toBuffer();
  const bottomSlice = await sharp(bottom.buf)
    .extract({ left: 0, top: bottomCut, width: bottom.width, height: bottomHeight })
    .toBuffer();

  const middleHeight = tileHeight * TILE_REPEATS;
  const totalHeight = topCut + middleHeight + bottomHeight;

  const composites = [{ input: topSlice, left: 0, top: 0 }];
  for (let i = 0; i < TILE_REPEATS; i++) {
    composites.push({ input: tile, left: 0, top: topCut + i * tileHeight });
  }
  composites.push({ input: bottomSlice, left: 0, top: topCut + middleHeight });

  await sharp({
    create: { width: TARGET_WIDTH, height: totalHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite(composites)
    .webp({ quality: 92 })
    .toFile(`${DIR}/pista-completa-v3.webp`);

  console.log(
    JSON.stringify({
      width: TARGET_WIDTH,
      totalHeight,
      topCut,
      tileHeight,
      middleHeight,
      bottomHeight,
      topWidth: top.width,
      bottomWidth: bottom.width,
    }),
  );
}

main();
