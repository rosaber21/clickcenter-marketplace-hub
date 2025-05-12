
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { BarChart3, Package, Link as LinkIcon, Wallet, TrendingUp, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorDashboard() {
  const [totalSales, setTotalSales] = useState(7829.45);
  const [activeProducts, setActiveProducts] = useState(12);
  const [pendingCommissions, setPendingCommissions] = useState(1245.50);
  
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2 text-primary">Painel do Criador</h1>
        <p className="text-muted-foreground mb-6">Gerencie seus produtos e acompanhe suas vendas</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
              <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
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
              <p className="text-xs text-muted-foreground">+3 nos últimos 30 dias</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-green-500/5">
              <CardTitle className="text-sm font-medium text-green-600">Comissões Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  € {pendingCommissions.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </div>
                <Wallet className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">Pagamento em 15 dias</p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary/5 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-primary">Meus Produtos</CardTitle>
                <CardDescription>Gerenciar seus produtos digitais</CardDescription>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                <span>Novo Produto</span>
              </Button>
            </CardHeader>
            <CardContent>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-primary/80">Produto</th>
                    <th className="text-left py-2 font-medium text-primary/80">Categoria</th>
                    <th className="text-left py-2 font-medium text-primary/80">Preço</th>
                    <th className="text-left py-2 font-medium text-primary/80">Vendas</th>
                    <th className="text-left py-2 font-medium text-primary/80">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">Curso de Marketing Digital</td>
                    <td className="py-3">Marketing</td>
                    <td className="py-3">€ 149,90</td>
                    <td className="py-3">32</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">E-book Gestão Financeira</td>
                    <td className="py-3">Finanças</td>
                    <td className="py-3">€ 29,90</td>
                    <td className="py-3">68</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">Consultoria de Negócios</td>
                    <td className="py-3">Consultoria</td>
                    <td className="py-3">€ 399,00</td>
                    <td className="py-3">7</td>
                    <td className="py-3"><span className="bg-amber-100 text-amber-800 rounded-full px-2 py-1 text-xs">Revisão</span></td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3">Pacote de Templates Premium</td>
                    <td className="py-3">Design</td>
                    <td className="py-3">€ 89,90</td>
                    <td className="py-3">41</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-primary text-sm hover:text-primary/80 transition-colors flex items-center">
                Ver todos os produtos <span className="ml-1">→</span>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-secondary/5">
              <CardTitle className="text-secondary">Afiliados</CardTitle>
              <CardDescription>Desempenho de afiliados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-primary">Total de afiliados</p>
                  <p className="text-2xl font-bold mt-2">27</p>
                  <p className="text-xs text-muted-foreground mt-1">+5 novos este mês</p>
                </div>
                
                <div className="border rounded-lg p-3 hover:border-secondary/30 hover:bg-secondary/5 transition-colors">
                  <p className="font-medium text-secondary">Vendas por afiliados</p>
                  <p className="text-2xl font-bold mt-2">€ 3.465,80</p>
                  <p className="text-xs text-muted-foreground mt-1">44% das suas vendas totais</p>
                </div>
                
                <div className="border rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
                  <p className="font-medium">Comissões pagas</p>
                  <p className="text-2xl font-bold mt-2 text-primary">€ 692,90</p>
                  <p className="text-xs text-muted-foreground mt-1">20% das vendas por afiliados</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                Gerenciar Afiliados
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
