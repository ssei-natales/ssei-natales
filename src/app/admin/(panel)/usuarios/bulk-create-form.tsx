"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { bulkCreateUsers } from "./actions";

export function BulkCreateForm() {
  const [state, formAction, pending] = useActionState(bulkCreateUsers, undefined);

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-3">
        <textarea
          name="usuarios"
          rows={8}
          required
          placeholder={"correo,contraseña,rol\njuan.perez@dgac.gob.cl,ClaveTemporal123,funcionario\nmaria.soto@dgac.gob.cl,ClaveTemporal123,admin"}
          className="w-full rounded-xl border border-input bg-transparent p-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <p className="text-xs text-muted-foreground">
          Un usuario por línea: <code>correo,contraseña,rol</code>. El rol es opcional — si lo dejás vacío o escribís
          cualquier cosa que no sea "admin", queda como funcionario.
        </p>
        <Button type="submit" disabled={pending}>
          {pending ? "Creando…" : "Crear usuarios"}
        </Button>
        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      </form>

      {state?.results && (
        <div className="space-y-1 rounded-xl border border-border/60 p-3">
          {state.results.map((r, i) => (
            <p key={i} className={`text-sm ${r.ok ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
              {r.ok ? "✓" : "✗"} {r.email} {r.error && `— ${r.error}`}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
