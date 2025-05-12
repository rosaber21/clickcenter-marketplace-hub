
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export default function AdminSales() {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | "excel">("csv");
  const [dateRange, setDateRange] = useState<"all" | "month" | "week">("all");

  const handleExportReport = () => {
    setShowExportDialog(true);
  };

  const startExport = () => {
    setIsExporting(true);
    
    // Simulate API call to generate and download report
    setTimeout(() => {
      setIsExporting(false);
      setShowExportDialog(false);
      
      const fileName = `vendas-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      
      toast.success("Relatório exportado com sucesso!", {
        description: `O arquivo ${fileName} foi gerado.`
      });
      
      // In a real implementation, we would trigger a file download here
      // For demonstration purposes, we're just showing a toast notification
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Histórico de Vendas</h1>
          <Button onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Transações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#ORD-2546</TableCell>
                  <TableCell>Curso de Marketing Digital</TableCell>
                  <TableCell>João Silva</TableCell>
                  <TableCell>12/05/2025</TableCell>
                  <TableCell>€ 149,90</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Pago</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Detalhes</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#ORD-2545</TableCell>
                  <TableCell>E-book Gestão Financeira</TableCell>
                  <TableCell>Maria Oliveira</TableCell>
                  <TableCell>11/05/2025</TableCell>
                  <TableCell>€ 29,90</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Pago</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Detalhes</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Relatório de Vendas</DialogTitle>
            <DialogDescription>
              Escolha o formato e o período do relatório que deseja exportar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Formato</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="format" 
                    value="csv" 
                    checked={exportFormat === "csv"} 
                    onChange={() => setExportFormat("csv")}
                    className="radio"
                  />
                  <span>CSV</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="format" 
                    value="pdf" 
                    checked={exportFormat === "pdf"} 
                    onChange={() => setExportFormat("pdf")}
                    className="radio"
                  />
                  <span>PDF</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="format" 
                    value="excel" 
                    checked={exportFormat === "excel"} 
                    onChange={() => setExportFormat("excel")}
                    className="radio"
                  />
                  <span>Excel</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Período</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="period" 
                    value="all" 
                    checked={dateRange === "all"} 
                    onChange={() => setDateRange("all")}
                    className="radio"
                  />
                  <span>Todas as vendas</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="period" 
                    value="month" 
                    checked={dateRange === "month"} 
                    onChange={() => setDateRange("month")}
                    className="radio"
                  />
                  <span>Último mês</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="period" 
                    value="week" 
                    checked={dateRange === "week"} 
                    onChange={() => setDateRange("week")}
                    className="radio"
                  />
                  <span>Última semana</span>
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={startExport} disabled={isExporting}>
              {isExporting ? (
                <>Exportando...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
