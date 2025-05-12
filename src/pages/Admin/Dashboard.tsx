
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "./AdminLayout";
import { BarChart3, Users, Package, Link as LinkIcon, Wallet, TrendingUp, CreditCard, Settings } from "lucide-react";

export default function AdminDashboard() {
  const [totalSales, setTotalSales] = useState(12849.95);
  const [activeProducts, setActiveProducts] = useState(78);
  const [activeAffiliates, setActiveAffiliates] = useState(124);
  const [activeCreators, setActiveCreators] = useState(42);
  
  return (
    <AdminLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">€ {totalSales.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</div>
                <TrendingUp className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+18% desde o mês passado</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{activeProducts}</div>
                <Package className="h-8 w-8 text-secondary/60" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+12 nos últimos 30 dias</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Afiliados Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{activeAffiliates}</div>
                <LinkIcon className="h-8 w-8 text-green-500/60" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+24 nos últimos 30 dias</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Produtores Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{activeCreators}</div>
                <Users className="h-8 w-8 text-amber-500/60" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+8 nos últimos 30 dias</p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Vendas recentes</CardTitle>
              <CardDescription>Últimas transações realizadas na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Produto</th>
                    <th className="text-left py-2 font-medium">Cliente</th>
                    <th className="text-left py-2 font-medium">Valor</th>
                    <th className="text-left py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Curso de Marketing Digital</td>
                    <td className="py-3">João Silva</td>
                    <td className="py-3">€ 149,90</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Completo</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">E-book Gestão Financeira</td>
                    <td className="py-3">Maria Oliveira</td>
                    <td className="py-3">€ 29,90</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Completo</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Consultoria de Negócios</td>
                    <td className="py-3">Carlos Mendes</td>
                    <td className="py-3">€ 399,00</td>
                    <td className="py-3"><span className="bg-amber-100 text-amber-800 rounded-full px-2 py-1 text-xs">Pendente</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Pacote de Templates Premium</td>
                    <td className="py-3">Ana Costa</td>
                    <td className="py-3">€ 89,90</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Completo</span></td>
                  </tr>
                  <tr>
                    <td className="py-3">Mentoria de Produtividade</td>
                    <td className="py-3">Paulo Ribeiro</td>
                    <td className="py-3">€ 249,00</td>
                    <td className="py-3"><span className="bg-red-100 text-red-800 rounded-full px-2 py-1 text-xs">Reembolsado</span></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <CardFooter>
              <button className="text-primary text-sm hover:underline">Ver todas as vendas →</button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comissões Pendentes</CardTitle>
              <CardDescription>Pagamentos a serem realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <p className="font-medium">Afiliados</p>
                  <p className="text-2xl font-bold mt-2">€ 3.872,15</p>
                  <p className="text-xs text-muted-foreground mt-1">32 afiliados com pagamento pendente</p>
                </div>
                
                <div className="border rounded-lg p-3">
                  <p className="font-medium">Produtores</p>
                  <p className="text-2xl font-bold mt-2">€ 8.145,60</p>
                  <p className="text-xs text-muted-foreground mt-1">18 produtores com pagamento pendente</p>
                </div>
                
                <div className="border rounded-lg p-3 bg-muted">
                  <p className="font-medium">Lucro da plataforma</p>
                  <p className="text-2xl font-bold mt-2">€ 2.831,95</p>
                  <p className="text-xs text-muted-foreground mt-1">Após todas as comissões</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Wallet className="h-4 w-4" />
                Processar Pagamentos
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
