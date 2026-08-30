import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="bg-ambient flex min-h-screen items-center justify-center p-4">
      <Card className="glass glass-glow w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-brand)] text-lg">SSEI Natales — Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
