
import React from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAffiliates() {
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Programa de Afiliados</h1>
          <Button>Aprovar Solicitações</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Lista de Afiliados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Nome</th>
                  <th className="text-left py-2 font-medium">Email</th>
                  <th className="text-left py-2 font-medium">Vendas</th>
                  <th className="text-left py-2 font-medium">Comissão Total</th>
                  <th className="text-left py-2 font-medium">Taxa</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Pedro Costa</td>
                  <td className="py-3">pedro@exemplo.com</td>
                  <td className="py-3">28</td>
                  <td className="py-3">€ 1.245,60</td>
                  <td className="py-3">15%</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Detalhes</Button>
                    <Button variant="outline" size="sm">Pagamentos</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Sofia Mendes</td>
                  <td className="py-3">sofia@exemplo.com</td>
                  <td className="py-3">42</td>
                  <td className="py-3">€ 2.180,00</td>
                  <td className="py-3">20%</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Detalhes</Button>
                    <Button variant="outline" size="sm">Pagamentos</Button>
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
