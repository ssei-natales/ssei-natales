import { BulkCreateForm } from "./bulk-create-form";

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cargá funcionarios o administradores nuevos. La contraseña queda asignada como la escribiste acá — cada
          persona puede cambiarla después desde "Mi cuenta".
        </p>
      </div>
      <BulkCreateForm />
    </div>
  );
}
