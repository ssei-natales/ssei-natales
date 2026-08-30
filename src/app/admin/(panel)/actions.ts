"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function parseLinkFields(formData: FormData) {
  const categoria = String(formData.get("categoria") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (categoria !== "cartilla" && categoria !== "documento") {
    return { error: "Elegí una categoría válida." };
  }
  if (!titulo || !url) {
    return { error: "Título y link son obligatorios." };
  }
  return { categoria, titulo, url };
}

export async function createLink(_prevState: { error?: string } | undefined, formData: FormData) {
  const fields = parseLinkFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { count } = await supabase
    .from("links")
    .select("id", { count: "exact", head: true })
    .eq("categoria", fields.categoria);

  const { error } = await supabase.from("links").insert({ ...fields, orden: count ?? 0 });
  if (error) return { error: "No se pudo guardar. Probá de nuevo." };

  revalidatePath("/admin");
  return {};
}

export async function updateLink(id: string, formData: FormData) {
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
