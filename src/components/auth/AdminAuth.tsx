
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLoginForm, AdminLoginFormValues } from "./AdminLoginForm";

interface AdminAuthProps {
  onSubmit: (data: AdminLoginFormValues) => void;
}

export const AdminAuth = ({ onSubmit }: AdminAuthProps) => {
  return (
    <Card className="border-2 shadow-lg max-w-md mx-auto bg-secondary/10">
      <CardHeader className="space-y-1 text-center bg-secondary text-white rounded-t-md">
        <CardTitle className="text-2xl font-bold">Painel Administrativo</CardTitle>
        <CardDescription className="text-white/90">
          Entre com suas credenciais para acessar
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <AdminLoginForm onSubmit={onSubmit} />
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-muted-foreground text-center">
          Acesso restrito apenas para administradores autorizados da plataforma.
        </p>
      </CardFooter>
    </Card>
  );
};
