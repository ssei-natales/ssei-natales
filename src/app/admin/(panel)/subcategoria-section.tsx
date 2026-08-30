"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteSubcategoria } from "./actions";
import { AddLinkForm } from "./add-link-form";
import { LinkRow } from "./link-row";

type Link = { id: string; titulo: string; url: string; grupo: string | null };
type Subcategoria = { id: string; nombre: string };

export function SubcategoriaSection({ subcategoria, links }: { subcategoria: Subcategoria; links: Link[] }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{subcategoria.nombre}</h3>
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
