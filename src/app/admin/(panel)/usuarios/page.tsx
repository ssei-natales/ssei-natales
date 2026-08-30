import { listUsers } from "./actions";
import { UsersTable } from "./users-table";
import { BulkCreateForm } from "./bulk-create-form";

export default async function UsuariosPage() {
  const users = await listUsers();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Funcionarios y administradores con acceso al sitio. Cambiá el rol desde el selector de cada fila.
        </p>
      </div>

      <UsersTable users={users} />

      <section className="space-y-3">
        <h2 className="font-medium">Agregar nuevos</h2>
        <p className="text-sm text-muted-foreground">
          La contraseña queda asignada como la escribiste acá — cada persona puede cambiarla después desde "Mi
          cuenta".
        </p>
        <BulkCreateForm />
      </section>
    </div>
  );
}
