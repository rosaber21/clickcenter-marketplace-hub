
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText, BarChart } from "lucide-react";

export const ReportsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Relatório de Vendas
            </CardTitle>
            <CardDescription>
              Dados detalhados de todas as transações por período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                Excel (.xlsx)
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                CSV
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatório de Alunos
            </CardTitle>
            <CardDescription>
              Progresso e engajamento dos alunos em seus cursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                Excel (.xlsx)
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Relatório de Performance
            </CardTitle>
            <CardDescription>
              Métricas de desempenho da sua plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                Excel (.xlsx)
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Personalizados</CardTitle>
          <CardDescription>
            Crie relatórios personalizados com as métricas que você precisa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>Vendas</option>
                  <option>Engajamento</option>
                  <option>Alunos</option>
                  <option>Conversão</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Período</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Este mês</option>
                  <option>Último mês</option>
                  <option>Personalizado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Formato</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>Excel (.xlsx)</option>
                  <option>CSV</option>
                  <option>PDF</option>
                </select>
              </div>
            </div>
            
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Gerar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
