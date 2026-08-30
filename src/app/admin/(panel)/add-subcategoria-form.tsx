"use client";

import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSubcategoria } from "./actions";

export function AddSubcategoriaForm({ tipo }: { tipo: "cartilla" | "documento" }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(async (prev: { error?: string } | undefined, formData: FormData) => {
    const result = await createSubcategoria(prev, formData);
    if (!result.error) formRef.current?.reset();
    return result;
  }, undefined);

  return (
    <form ref={formRef} action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="tipo" value={tipo} />
      <Input name="nombre" required placeholder="Nombre de la nueva subcategoría" className="max-w-xs" />
      <Button type="submit" variant="outline" disabled={pending}>
        {pending ? "Agregando…" : "+ Agregar subcategoría"}
      </Button>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
    </form>
  );
}
