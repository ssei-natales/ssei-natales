"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteSubcategoria, updateSubcategoriaEmbed } from "./actions";
import { AddLinkForm } from "./add-link-form";
import { LinkRow } from "./link-row";

type Link = { id: string; titulo: string; url: string; grupo: string | null };
type Subcategoria = { id: string; nombre: string; embed_url: string | null };

export function SubcategoriaSection({ subcategoria, links }: { subcategoria: Subcategoria; links: Link[] }) {
  const [pending, startTransition] = useTransition();
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{subcategoria.nombre}</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setShowEmbed((v) => !v)}>
            {subcategoria.embed_url ? "Editar embed" : "+ Embed"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive"
            disabled={pending}
            onClick={() => startTransition(() => deleteSubcategoria(subcategoria.id))}
          >
            Eliminar subcategoría
          </Button>
        </div>
      </div>

      {showEmbed && (
        <form
          className="mb-4 flex items-center gap-2"
          action={(formData) => startTransition(() => updateSubcategoriaEmbed(subcategoria.id, formData))}
        >
          <Input
            name="embed_url"
            defaultValue={subcategoria.embed_url ?? ""}
            placeholder="URL embebible (ej. carpeta de Drive), opcional"
            className="flex-1"
          />
          <Button type="submit" size="sm" disabled={pending}>
            Guardar
          </Button>
        </form>
      )}

      {links.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <LinkRow key={link.id} link={link} />
            ))}
          </TableBody>
        </Table>
      )}

      <div className="mt-3">
        <AddLinkForm subcategoriaId={subcategoria.id} />
      </div>
    </div>
  );
}
