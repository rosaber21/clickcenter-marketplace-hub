
import React from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
          <Button className="gap-2">
            <Plus size={16} />
            <span>Adicionar Usuário</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lista de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Nome</th>
                  <th className="text-left py-2 font-medium">Email</th>
                  <th className="text-left py-2 font-medium">Tipo</th>
                  <th className="text-left py-2 font-medium">Data de Registro</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Ana Pereira</td>
                  <td className="py-3">ana@exemplo.com</td>
                  <td className="py-3">Cliente</td>
                  <td className="py-3">10/04/2025</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Suspender</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Carlos Santos</td>
                  <td className="py-3">carlos@exemplo.com</td>
                  <td className="py-3">Afiliado</td>
                  <td className="py-3">05/05/2025</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Suspender</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
