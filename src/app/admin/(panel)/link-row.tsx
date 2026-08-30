"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteLink, moveLink, updateLink } from "./actions";

type Link = { id: string; titulo: string; url: string; grupo: string | null };

export function LinkRow({ link }: { link: Link }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  if (editing) {
    return (
      <TableRow>
        <TableCell colSpan={3}>
          <form
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
            action={(formData) => {
              startTransition(async () => {
                const result = await updateLink(link.id, formData);
                if (result?.error) setError(result.error);
                else setEditing(false);
              });
            }}
          >
            <Input name="grupo" defaultValue={link.grupo ?? ""} placeholder="Grupo (opcional)" className="sm:w-40" />
            <Input name="titulo" defaultValue={link.titulo} required className="sm:flex-1" />
            <Input name="url" type="url" defaultValue={link.url} required className="sm:flex-1" />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={pending}>
                Guardar
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
            </div>
          </form>
          {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        {link.grupo && <span className="mr-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">{link.grupo}</span>}
        {link.titulo}
      </TableCell>
      <TableCell className="max-w-xs truncate text-muted-foreground">{link.url}</TableCell>
      <TableCell className="flex justify-end gap-1">
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Subir"
          disabled={pending}
          onClick={() => startTransition(() => moveLink(link.id, "up"))}
        >
          <ArrowUp className="size-3.5" />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Bajar"
          disabled={pending}
          onClick={() => startTransition(() => moveLink(link.id, "down"))}
        >
          <ArrowDown className="size-3.5" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
          Editar
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={pending}
          onClick={() => startTransition(() => deleteLink(link.id))}
        >
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
}
