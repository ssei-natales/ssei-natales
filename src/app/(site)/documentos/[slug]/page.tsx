import { notFound } from "next/navigation";
import { getSubcategoriaConLinks } from "@/lib/data/subcategorias";
import { SubcategoriaContent } from "@/components/subcategoria-content";

export default async function DocumentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getSubcategoriaConLinks("documento", slug);
  if (!data) notFound();

  return <SubcategoriaContent subcategoria={data.subcategoria} links={data.links} />;
}
