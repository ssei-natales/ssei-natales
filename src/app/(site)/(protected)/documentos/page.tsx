import { getSubcategorias } from "@/lib/data/subcategorias";
import { SubcategoriasIndex } from "@/components/subcategorias-index";

export default async function DocumentosIndexPage() {
  const subcategorias = await getSubcategorias();
  const documentos = subcategorias.filter((s) => s.tipo === "documento");

  return <SubcategoriasIndex titulo="Documentos" basePath="/documentos" items={documentos} />;
}
