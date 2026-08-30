"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function safeRedirect(path: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

export async function signIn(_prevState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = safeRedirect(String(formData.get("redirectTo") ?? ""));

  if (!email || !password) {
    return { error: "Ingresá tu correo y contraseña." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect(redirectTo);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
