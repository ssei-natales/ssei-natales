"use client";

import { useTransition } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { changeUserRole, type UserRow } from "./actions";

function RoleCell({ user }: { user: UserRow }) {
  const [pending, startTransition] = useTransition();

  return (
    <Select
      value={user.role}
      disabled={pending}
      onValueChange={(value) => startTransition(() => changeUserRole(user.id, value as "admin" | "funcionario"))}
    >
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="funcionario">Funcionario</SelectItem>
        <SelectItem value="admin">Administrador</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function UsersTable({ users }: { users: UserRow[] }) {
  if (users.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay usuarios cargados.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Correo</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Creado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <RoleCell user={user} />
            </TableCell>
            <TableCell className="text-muted-foreground">{new Date(user.createdAt).toLocaleDateString("es-CL")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
