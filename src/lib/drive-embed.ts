// Un link normal de carpeta de Drive (/drive/folders/{id}) no se puede
// embeber en un iframe — hay que usar este formato especial que Google
// también usa internamente para "Insertar → Carpeta de Drive" en Sites.
export function toDriveEmbedUrl(url: string): string {
  const match = url.match(/\/drive\/folders\/([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  return `https://drive.google.com/embeddedfolderview?id=${match[1]}#list`;
}
