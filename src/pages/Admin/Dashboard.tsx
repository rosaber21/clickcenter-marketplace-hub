
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
        <h1 className="text-3xl font-bold mb-6 text-primary">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-primary/5">
              <CardTitle className="text-sm font-medium text-primary">Vendas Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">€ {totalSales.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+18% desde o mês passado</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-secondary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-secondary/5">
              <CardTitle className="text-sm font-medium text-secondary">Produtos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-secondary">
                  {activeProducts}
                </div>
                <Package className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+12 nos últimos 30 dias</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-green-500/5">
              <CardTitle className="text-sm font-medium text-green-600">Afiliados Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  {activeAffiliates}
                </div>
                <LinkIcon className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+24 nos últimos 30 dias</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-amber-500/5">
              <CardTitle className="text-sm font-medium text-amber-600">Produtores Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-amber-600">
                  {activeCreators}
                </div>
                <Users className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+8 nos últimos 30 dias</p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-primary">Vendas recentes</CardTitle>
              <CardDescription>Últimas transações realizadas na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-primary/80">Produto</th>
                    <th className="text-left py-2 font-medium text-primary/80">Cliente</th>
                    <th className="text-left py-2 font-medium text-primary/80">Valor</th>
                    <th className="text-left py-2 font-medium text-primary/80">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">Curso de Marketing Digital</td>
                    <td className="py-3">João Silva</td>
                    <td className="py-3">€ 149,90</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Completo</span></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">E-book Gestão Financeira</td>
                    <td className="py-3">Maria Oliveira</td>
                    <td className="py-3">€ 29,90</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Completo</span></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">Consultoria de Negócios</td>
                    <td className="py-3">Carlos Mendes</td>
                    <td className="py-3">€ 399,00</td>
                    <td className="py-3"><span className="bg-amber-100 text-amber-800 rounded-full px-2 py-1 text-xs">Pendente</span></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">Pacote de Templates Premium</td>
                    <td className="py-3">Ana Costa</td>
                    <td className="py-3">€ 89,90</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Completo</span></td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="py-3">Mentoria de Produtividade</td>
                    <td className="py-3">Paulo Ribeiro</td>
                    <td className="py-3">€ 249,00</td>
                    <td className="py-3"><span className="bg-red-100 text-red-800 rounded-full px-2 py-1 text-xs">Reembolsado</span></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <CardFooter>
              <button className="text-primary text-sm hover:underline hover:text-primary/80 transition-colors flex items-center">Ver todas as vendas <span className="ml-1">→</span></button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-secondary/5">
              <CardTitle className="text-secondary">Comissões Pendentes</CardTitle>
              <CardDescription>Pagamentos a serem realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-primary">Afiliados</p>
                  <p className="text-2xl font-bold mt-2">€ 3.872,15</p>
                  <p className="text-xs text-muted-foreground mt-1">32 afiliados com pagamento pendente</p>
                </div>
                
                <div className="border rounded-lg p-3 hover:border-secondary/30 hover:bg-secondary/5 transition-colors">
                  <p className="font-medium text-secondary">Produtores</p>
                  <p className="text-2xl font-bold mt-2">€ 8.145,60</p>
                  <p className="text-xs text-muted-foreground mt-1">18 produtores com pagamento pendente</p>
                </div>
                
                <div className="border rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
                  <p className="font-medium">Lucro da plataforma</p>
                  <p className="text-2xl font-bold mt-2 text-primary">€ 2.831,95</p>
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
