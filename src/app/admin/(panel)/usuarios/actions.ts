"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type ResultRow = { email: string; ok: boolean; error?: string };

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return profile?.role === "admin" ? user : null;
}

export async function bulkCreateUsers(
  _prevState: { results?: ResultRow[]; error?: string } | undefined,
  formData: FormData,
): Promise<{ results?: ResultRow[]; error?: string }> {
  const admin = await requireAdmin();
  if (!admin) return { error: "No autorizado." };

  const raw = String(formData.get("usuarios") ?? "");
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return { error: "Pegá al menos un usuario." };

  const adminClient = createAdminClient();
  const results: ResultRow[] = [];

  for (const line of lines) {
    const [email, password, rolRaw] = line.split(",").map((s) => s.trim());
    if (!email || !password) {
      results.push({ email: email || line, ok: false, error: "Falta correo o contraseña" });
      continue;
    }
    const rol = rolRaw?.toLowerCase().startsWith("admin") ? "admin" : "funcionario";

    const { data: created, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error || !created.user) {
      results.push({ email, ok: false, error: error?.message ?? "Error desconocido" });
      continue;
    }

    const { error: profileError } = await adminClient.from("profiles").update({ role: rol }).eq("id", created.user.id);
    if (profileError) {
      results.push({ email, ok: false, error: `Usuario creado pero no se pudo asignar el rol: ${profileError.message}` });
      continue;
    }

    results.push({ email: `${email} (${rol})`, ok: true });
  }

  revalidatePath("/admin/usuarios");
  return { results };
}

export async function changeUserRole(userId: string, role: "admin" | "funcionario") {
  const admin = await requireAdmin();
  if (!admin) return;

  const adminClient = createAdminClient();
  await adminClient.from("profiles").update({ role }).eq("id", userId);
  revalidatePath("/admin/usuarios");
}

export type UserRow = { id: string; email: string; role: string; createdAt: string };

export async function listUsers(): Promise<UserRow[]> {
  const admin = await requireAdmin();
  if (!admin) return [];

  const adminClient = createAdminClient();
  const [{ data: authUsers }, { data: profiles }] = await Promise.all([
    adminClient.auth.admin.listUsers(),
    adminClient.from("profiles").select("id, role"),
  ]);

  const roleById = new Map((profiles ?? []).map((p) => [p.id, p.role as string]));

  return (authUsers?.users ?? [])
    .map((u) => ({
      id: u.id,
      email: u.email ?? "(sin correo)",
      role: roleById.get(u.id) ?? "funcionario",
      createdAt: u.created_at,
    }))
    .sort((a, b) => a.email.localeCompare(b.email));
}
