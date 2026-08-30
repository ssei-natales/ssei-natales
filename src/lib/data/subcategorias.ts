import { createClient } from "@/lib/supabase/server";

export type Subcategoria = { id: string; tipo: "cartilla" | "documento"; nombre: string; slug: string };
export type Link = {
  id: string;
  subcategoria_id: string;
  titulo: string;
  url: string;
  grupo: string | null;
  es_embed: boolean;
};

export async function getSubcategorias() {
  const supabase = await createClient();
  const { data } = await supabase.from("subcategorias").select("*").order("tipo").order("orden");
  return (data ?? []) as Subcategoria[];
}

export async function getSubcategoriaConLinks(tipo: "cartilla" | "documento", slug: string) {
  const supabase = await createClient();
  const { data: subcategoria } = await supabase
    .from("subcategorias")
    .select("*")
    .eq("tipo", tipo)
    .eq("slug", slug)
    .single();

  if (!subcategoria) return null;

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("subcategoria_id", subcategoria.id)
    .order("orden");

  return { subcategoria: subcategoria as Subcategoria, links: links ?? [] };
}
