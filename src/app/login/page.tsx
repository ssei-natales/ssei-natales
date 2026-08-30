import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <div className="bg-ambient flex min-h-screen items-center justify-center p-4">
      <Card className="glass glass-glow w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-brand)] text-lg">SSEI Natales</CardTitle>
          <p className="text-sm text-muted-foreground">Acceso para funcionarios y administradores.</p>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={redirectTo ?? "/"} />
        </CardContent>
      </Card>
    </div>
  );
}
