
import React from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPayments() {
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Pagamentos</h1>
          <Button>Processar Pagamentos</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pagamentos Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Destinatário</th>
                  <th className="text-left py-2 font-medium">Tipo</th>
                  <th className="text-left py-2 font-medium">Método</th>
                  <th className="text-left py-2 font-medium">Valor</th>
                  <th className="text-left py-2 font-medium">Data de Solicitação</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Pedro Costa</td>
                  <td className="py-3">Afiliado</td>
                  <td className="py-3">Transferência Bancária</td>
                  <td className="py-3">€ 485,25</td>
                  <td className="py-3">09/05/2025</td>
                  <td className="py-3">
                    <span className="bg-amber-100 text-amber-800 rounded-full px-2 py-1 text-xs">Pendente</span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">Aprovar</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Carlos Martins</td>
                  <td className="py-3">Produtor</td>
                  <td className="py-3">PayPal</td>
                  <td className="py-3">€ 1.250,00</td>
                  <td className="py-3">10/05/2025</td>
                  <td className="py-3">
                    <span className="bg-amber-100 text-amber-800 rounded-full px-2 py-1 text-xs">Pendente</span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">Aprovar</Button>
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
