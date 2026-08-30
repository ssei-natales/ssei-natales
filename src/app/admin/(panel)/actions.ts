"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const ACCENTS: Record<string, string> = {
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
  ñ: "n",
  ü: "u",
};

function slugify(nombre: string) {
  return nombre
    .toLowerCase()
    .replace(/[áéíóúñü]/g, (char) => ACCENTS[char] ?? char)
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createSubcategoria(
  _prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const tipo = String(formData.get("tipo") ?? "");
  const nombre = String(formData.get("nombre") ?? "").trim();

  if (tipo !== "cartilla" && tipo !== "documento") {
    return { error: "Tipo inválido." };
  }
  if (!nombre) {
    return { error: "El nombre es obligatorio." };
  }

  const supabase = await createClient();
  const { count } = await supabase
    .from("subcategorias")
    .select("id", { count: "exact", head: true })
    .eq("tipo", tipo);

  const { error } = await supabase
    .from("subcategorias")
    .insert({ tipo, nombre, slug: slugify(nombre), orden: count ?? 0 });
  if (error) return { error: "No se pudo crear. Probá con otro nombre." };

  revalidatePath("/admin");
  return {};
}

export async function deleteSubcategoria(id: string) {
  const supabase = await createClient();
  await supabase.from("subcategorias").delete().eq("id", id);
  revalidatePath("/admin");
}

export async function updateSubcategoriaEmbed(id: string, formData: FormData) {
  const embedUrl = String(formData.get("embed_url") ?? "").trim();
  const supabase = await createClient();
  await supabase
    .from("subcategorias")
    .update({ embed_url: embedUrl || null })
    .eq("id", id);
  revalidatePath("/admin");
}

function parseLinkFields(formData: FormData) {
  const subcategoriaId = String(formData.get("subcategoria_id") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const grupo = String(formData.get("grupo") ?? "").trim();

  if (!subcategoriaId) return { error: "Falta la subcategoría." };
  if (!titulo || !url) return { error: "Título y link son obligatorios." };
  return { subcategoria_id: subcategoriaId, titulo, url, grupo: grupo || null };
}

export async function createLink(
  _prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const fields = parseLinkFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { count } = await supabase
    .from("links")
    .select("id", { count: "exact", head: true })
    .eq("subcategoria_id", fields.subcategoria_id);

  const { error } = await supabase.from("links").insert({ ...fields, orden: count ?? 0 });
  if (error) return { error: "No se pudo guardar. Probá de nuevo." };

  revalidatePath("/admin");
  return {};
}

export async function updateLink(id: string, formData: FormData): Promise<{ error?: string }> {
  const fields = parseLinkFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { error } = await supabase.from("links").update(fields).eq("id", id);
  if (error) return { error: "No se pudo actualizar. Probá de nuevo." };

  revalidatePath("/admin");
  return {};
}

export async function deleteLink(id: string) {
  const supabase = await createClient();
  await supabase.from("links").delete().eq("id", id);
  revalidatePath("/admin");
}

export async function moveLink(id: string, direction: "up" | "down") {
  const supabase = await createClient();

  const { data: link } = await supabase.from("links").select("id, subcategoria_id, grupo, orden").eq("id", id).single();
  if (!link) return;

  let query = supabase.from("links").select("id, orden").eq("subcategoria_id", link.subcategoria_id);
  query = link.grupo ? query.eq("grupo", link.grupo) : query.is("grupo", null);
  query =
    direction === "up"
      ? query.lt("orden", link.orden).order("orden", { ascending: false })
      : query.gt("orden", link.orden).order("orden", { ascending: true });

  const { data: neighbors } = await query.limit(1);
  const neighbor = neighbors?.[0];
  if (!neighbor) return;

  await supabase.from("links").update({ orden: neighbor.orden }).eq("id", link.id);
  await supabase.from("links").update({ orden: link.orden }).eq("id", neighbor.id);

  revalidatePath("/admin");
}
