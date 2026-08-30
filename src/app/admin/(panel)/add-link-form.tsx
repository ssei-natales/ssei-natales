"use client";

import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLink } from "./actions";

export function AddLinkForm({ subcategoriaId }: { subcategoriaId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(async (prev: { error?: string } | undefined, formData: FormData) => {
    const result = await createLink(prev, formData);
    if (!result.error) formRef.current?.reset();
    return result;
  }, undefined);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input type="hidden" name="subcategoria_id" value={subcategoriaId} />
      <Input name="grupo" placeholder="Grupo (opcional, ej. Rescate 1)" className="sm:w-48" />
      <Input name="titulo" required placeholder="Título del botón" className="sm:flex-1" />
      <Input name="url" type="url" required placeholder="https://…" className="sm:flex-1" />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Agregando…" : "Agregar link"}
      </Button>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
    </form>
  );
}
