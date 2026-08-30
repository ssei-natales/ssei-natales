"use client";

import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createLink } from "./actions";

export function AddLinkForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(async (prev: { error?: string } | undefined, formData: FormData) => {
    const result = await createLink(prev, formData);
    if (!result.error) formRef.current?.reset();
    return result;
  }, undefined);

  return (
    <form ref={formRef} action={formAction} className="grid gap-3 sm:grid-cols-[1fr_2fr_1fr_auto] sm:items-end">
      <div className="space-y-1.5">
        <Label htmlFor="categoria">Categoría</Label>
        <Select name="categoria" defaultValue="cartilla">
          <SelectTrigger id="categoria">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cartilla">Cartilla</SelectItem>
            <SelectItem value="documento">Documento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título</Label>
        <Input id="titulo" name="titulo" required placeholder="Ej. Libro Jefe de Turno" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="url">Link</Label>
        <Input id="url" name="url" type="url" required placeholder="https://…" />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Agregando…" : "Agregar"}
      </Button>

      {state?.error && <p className="text-sm text-destructive sm:col-span-4">{state.error}</p>}
    </form>
  );
}
