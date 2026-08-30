import { ChangePasswordForm } from "./change-password-form";

export default function CuentaPage() {
  return (
    <div className="glass glass-glow mt-8 rounded-3xl p-8 sm:p-10">
      <h1 className="font-[family-name:var(--font-brand)] text-2xl">Mi cuenta</h1>
      <p className="mt-2 text-sm text-muted-foreground">Cambiá la contraseña que te asignaron.</p>
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
