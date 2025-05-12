
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminAffiliates() {
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');
  
  // Type definition to ensure all affiliate objects have the required properties
  type ApprovedAffiliate = {
    id: number;
    name: string;
    email: string;
    products: number;
    sales: number; // This is the property that was missing in some objects
    commission: string;
    status: string;
  };
  
  type PendingAffiliate = {
    id: number;
    name: string;
    email: string;
    date: string;
    products: number;
    status: string;
  };

  // Sample data for approved affiliates
  const approvedAffiliates: ApprovedAffiliate[] = [
    { id: 1, name: "João Silva", email: "joao@example.com", products: 12, sales: 45, commission: "R$2.430,00", status: "active" },
    { id: 2, name: "Maria Santos", email: "maria@example.com", products: 8, sales: 32, commission: "R$1.890,00", status: "active" },
    { id: 3, name: "Carlos Oliveira", email: "carlos@example.com", products: 5, sales: 18, commission: "R$970,00", status: "inactive" },
    { id: 4, name: "Ana Costa", email: "ana@example.com", products: 10, sales: 37, commission: "R$2.105,00", status: "active" },
    { id: 5, name: "Lucas Mendes", email: "lucas@example.com", products: 3, sales: 9, commission: "R$485,00", status: "inactive" },
  ];

  // Sample data for pending affiliates
  const pendingAffiliates: PendingAffiliate[] = [
    { id: 6, name: "Fernando Alves", email: "fernando@example.com", date: "10/05/2025", products: 0, status: "pending" },
    { id: 7, name: "Patricia Lima", email: "patricia@example.com", date: "09/05/2025", products: 0, status: "pending" },
    { id: 8, name: "Roberto Gomes", email: "roberto@example.com", date: "08/05/2025", products: 0, status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Inativo</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Afiliados</h1>
            <p className="text-muted-foreground">Gerencie os afiliados da sua plataforma.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Novo Afiliado</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Afiliados
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedAffiliates.length}</div>
              <p className="text-xs text-muted-foreground">
                +{pendingAffiliates.length} afiliados pendentes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Afiliados Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {approvedAffiliates.filter(a => a.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((approvedAffiliates.filter(a => a.status === "active").length / approvedAffiliates.length) * 100)}% do total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Comissões Pagas
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$7.880,00</div>
              <p className="text-xs text-muted-foreground">
                +12.2% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendas via Afiliados
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">141</div>
              <p className="text-xs text-muted-foreground">
                +8.3% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Lista de Afiliados
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar afiliado..." className="pl-9 w-[200px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'approved' | 'pending')} className="space-y-4">
              <TabsList>
                <TabsTrigger value="approved">Aprovados</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="approved">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Produtos</TableHead>
                      <TableHead>Vendas</TableHead>
                      <TableHead>Comissão</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedAffiliates.map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell className="font-medium">{affiliate.name}</TableCell>
                        <TableCell>{affiliate.email}</TableCell>
                        <TableCell>{affiliate.products}</TableCell>
                        <TableCell>{affiliate.sales}</TableCell>
                        <TableCell>{affiliate.commission}</TableCell>
                        <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAffiliates.map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell className="font-medium">{affiliate.name}</TableCell>
                        <TableCell>{affiliate.email}</TableCell>
                        <TableCell>{affiliate.date}</TableCell>
                        <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="text-green-600 border-green-600">Aprovar</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600">Rejeitar</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
