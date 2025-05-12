
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "lucide-react";

export default function AdminAffiliates() {
  const affiliateData = [
    { id: 1, name: "João Silva", email: "joao@example.com", products: 5, sales: 23, commission: "R$1.250,00", status: "active" },
    { id: 2, name: "Maria Souza", email: "maria@example.com", products: 3, sales: 15, commission: "R$875,00", status: "active" },
    { id: 3, name: "Pedro Santos", email: "pedro@example.com", products: 4, sales: 12, commission: "R$560,00", status: "active" },
    { id: 4, name: "Ana Oliveira", email: "ana@example.com", products: 2, sales: 8, commission: "R$320,00", status: "pending" },
    { id: 5, name: "Lucas Costa", email: "lucas@example.com", products: 7, sales: 31, commission: "R$1.860,00", status: "active" },
  ];

  const pendingAffiliates = [
    { id: 6, name: "Carla Mendes", email: "carla@example.com", date: "12/04/2025", products: 0, status: "pending" },
    { id: 7, name: "Roberto Alves", email: "roberto@example.com", date: "10/04/2025", products: 0, status: "pending" },
    { id: 8, name: "Juliana Lima", email: "juliana@example.com", date: "08/04/2025", products: 0, status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pendente</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspenso</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Afiliados</h1>
          <Button>Adicionar Afiliado</Button>
        </div>
        
        <Tabs defaultValue="ativos" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="ativos">Afiliados Ativos</TabsTrigger>
            <TabsTrigger value="pendentes">Solicitações Pendentes</TabsTrigger>
            <TabsTrigger value="todos">Todos Afiliados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ativos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Afiliados Ativos
                </CardTitle>
                <CardDescription>
                  Afiliados ativos que podem promover produtos na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Produtos</TableHead>
                      <TableHead>Vendas</TableHead>
                      <TableHead>Comissão Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affiliateData.filter(a => a.status === "active").map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell>{affiliate.id}</TableCell>
                        <TableCell className="font-medium">{affiliate.name}</TableCell>
                        <TableCell>{affiliate.email}</TableCell>
                        <TableCell>{affiliate.products}</TableCell>
                        <TableCell>{affiliate.sales}</TableCell>
                        <TableCell>{affiliate.commission}</TableCell>
                        <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pendentes">
            <Card>
              <CardHeader>
                <CardTitle>Solicitações Pendentes de Afiliados</CardTitle>
                <CardDescription>
                  Usuários que solicitaram se tornar afiliados e aguardam aprovação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Data da Solicitação</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAffiliates.map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell>{affiliate.id}</TableCell>
                        <TableCell className="font-medium">{affiliate.name}</TableCell>
                        <TableCell>{affiliate.email}</TableCell>
                        <TableCell>{affiliate.date}</TableCell>
                        <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white border-0">Aprovar</Button>
                          <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-600 text-white border-0">Recusar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="todos">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Afiliados</CardTitle>
                <CardDescription>
                  Lista completa de todos os afiliados na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Produtos</TableHead>
                      <TableHead>Vendas</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...affiliateData, ...pendingAffiliates].map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell>{affiliate.id}</TableCell>
                        <TableCell className="font-medium">{affiliate.name}</TableCell>
                        <TableCell>{affiliate.email}</TableCell>
                        <TableCell>{affiliate.products || 0}</TableCell>
                        <TableCell>{affiliate.sales || 0}</TableCell>
                        <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
