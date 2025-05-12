
import React from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSales() {
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Histórico de Vendas</h1>
          <Button>Exportar Relatório</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Transações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Pedido</th>
                  <th className="text-left py-2 font-medium">Produto</th>
                  <th className="text-left py-2 font-medium">Cliente</th>
                  <th className="text-left py-2 font-medium">Data</th>
                  <th className="text-left py-2 font-medium">Valor</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">#ORD-2546</td>
                  <td className="py-3">Curso de Marketing Digital</td>
                  <td className="py-3">João Silva</td>
                  <td className="py-3">12/05/2025</td>
                  <td className="py-3">€ 149,90</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Pago</span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">Detalhes</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">#ORD-2545</td>
                  <td className="py-3">E-book Gestão Financeira</td>
                  <td className="py-3">Maria Oliveira</td>
                  <td className="py-3">11/05/2025</td>
                  <td className="py-3">€ 29,90</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Pago</span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">Detalhes</Button>
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
