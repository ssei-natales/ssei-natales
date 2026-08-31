import sharp from "sharp";

const DIR = "public/Barra_lateral";
const TARGET_WIDTH = 220;
const TILE_REPEATS = 22;

async function resizeToWidth(path, width) {
  const buf = await sharp(path).resize({ width }).toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, width: meta.width, height: meta.height };
}

async function main() {
  const top = await resizeToWidth(`${DIR}/tramo-28-v2.webp`, TARGET_WIDTH);
  const bottom = await resizeToWidth(`${DIR}/tramo-10-v2.webp`, TARGET_WIDTH);

  // Puntos de corte elegidos a mano en el hueco entre dos luces (no sobre
  // una luz ni sobre una raya), medidos en la imagen original antes de
  // escalar, y reescalados al ancho objetivo.
  const topCutRaw = 207; // en tramo-28-v2 original (206px de ancho)
  const tileEndRaw = 340; // fin del tramo repetible en tramo-28-v2 original
  const bottomCutRaw = 580; // en tramo-10-v2 original (174px de ancho) — bien arriba del "10" para no cortarlo

  const topScale = top.width / 206;
  const bottomScale = bottom.width / 174;

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
    .toFile(`${DIR}/pista-completa-v2.webp`);

  console.log(
    JSON.stringify({
      width: TARGET_WIDTH,
      totalHeight,
      topCut,
      tileHeight,
      middleHeight,
      bottomHeight,
    }),
  );
}

main();
