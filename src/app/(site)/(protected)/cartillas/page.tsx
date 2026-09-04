import { getSubcategorias } from "@/lib/data/subcategorias";
import { SubcategoriasIndex } from "@/components/subcategorias-index";

export default async function CartillasIndexPage() {
  const subcategorias = await getSubcategorias();
  const cartillas = subcategorias.filter((s) => s.tipo === "cartilla");

  return <SubcategoriasIndex titulo="Cartillas" basePath="/cartillas" items={cartillas} />;
}
