
import React from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminProducts() {
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
          <Button className="gap-2">
            <Plus size={16} />
            <span>Adicionar Produto</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Lista de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Nome</th>
                  <th className="text-left py-2 font-medium">Criador</th>
                  <th className="text-left py-2 font-medium">Categoria</th>
                  <th className="text-left py-2 font-medium">Preço</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Curso de Marketing Digital</td>
                  <td className="py-3">João Silva</td>
                  <td className="py-3">Marketing</td>
                  <td className="py-3">€ 149,90</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Excluir</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">E-book Gestão Financeira</td>
                  <td className="py-3">Maria Oliveira</td>
                  <td className="py-3">Finanças</td>
                  <td className="py-3">€ 29,90</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Excluir</Button>
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
