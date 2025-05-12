
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Download, CreditCard, Share2, CheckCircle2, AlertTriangle, Wallet, BanknoteIcon, PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentRecord {
  id: string;
  recipient: string;
  role: "affiliate" | "creator";
  email: string;
  iban: string;
  amount: number;
  createdAt: string;
  status: "pending" | "processed" | "failed";
}

export default function AdminPayments() {
  const { toast } = useToast();
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: "pay-1",
      recipient: "João Silva",
      role: "affiliate",
      email: "joao.silva@exemplo.com",
      iban: "PT50000000000000000000000",
      amount: 349.50,
      createdAt: "2025-05-01T14:23:00Z",
      status: "pending"
    },
    {
      id: "pay-2",
      recipient: "Maria Almeida",
      role: "creator",
      email: "maria.almeida@exemplo.com",
      iban: "PT50111111111111111111111",
      amount: 875.20,
      createdAt: "2025-05-05T09:15:00Z",
      status: "pending"
    },
    {
      id: "pay-3",
      recipient: "Carlos Ferreira",
      role: "affiliate",
      email: "carlos.ferreira@exemplo.com",
      iban: "PT50222222222222222222222",
      amount: 128.35,
      createdAt: "2025-05-05T16:45:00Z",
      status: "pending"
    },
    {
      id: "pay-4",
      recipient: "Ana Ribeiro",
      role: "creator",
      email: "ana.ribeiro@exemplo.com",
      iban: "PT50333333333333333333333",
      amount: 1240.75,
      createdAt: "2025-05-10T11:30:00Z",
      status: "processed"
    },
    {
      id: "pay-5",
      recipient: "Paulo Santos",
      role: "affiliate",
      email: "paulo.santos@exemplo.com",
      iban: "PT50444444444444444444444",
      amount: 85.90,
      createdAt: "2025-05-12T14:10:00Z",
      status: "failed"
    }
  ]);
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("bank");
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [isProcessingDialogOpen, setIsProcessingDialogOpen] = useState(false);
  
  const pendingPayments = payments.filter(p => p.status === "pending");
  const processedPayments = payments.filter(p => p.status === "processed");
  const failedPayments = payments.filter(p => p.status === "failed");
  
  const processPayment = (id: string) => {
    const payment = payments.find(p => p.id === id);
    if (payment) {
      setSelectedPayment(payment);
      setIsProcessingDialogOpen(true);
    }
  };
  
  const confirmPaymentProcess = () => {
    if (selectedPayment) {
      setPayments(payments.map(p => 
        p.id === selectedPayment.id ? { ...p, status: "processed" } : p
      ));
      
      toast({
        title: "Pagamento processado",
        description: `Pagamento de €${selectedPayment.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} para ${selectedPayment.recipient} foi processado com sucesso.`,
        variant: "success"
      });
      
      setIsProcessingDialogOpen(false);
      setSelectedPayment(null);
    }
  };
  
  const processAllPayments = () => {
    setPayments(payments.map(p => 
      p.status === "pending" ? { ...p, status: "processed" } : p
    ));
    
    toast({
      title: "Pagamentos processados",
      description: `${pendingPayments.length} pagamentos foram processados com sucesso.`,
      variant: "success"
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };
  
  const getRoleLabel = (role: "affiliate" | "creator") => {
    switch(role) {
      case "affiliate":
        return <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Afiliado</span>;
      case "creator":
        return <span className="bg-purple-100 text-purple-800 rounded-full px-2 py-1 text-xs">Produtor</span>;
    }
  };
  
  const getStatusLabel = (status: "pending" | "processed" | "failed") => {
    switch(status) {
      case "pending":
        return <span className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 text-xs">Pendente</span>;
      case "processed":
        return <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Processado</span>;
      case "failed":
        return <span className="bg-red-100 text-red-800 rounded-full px-2 py-1 text-xs">Falhou</span>;
    }
  };
  
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Pagamentos</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar pagamentos..." className="pl-9" />
            </div>
            <Button variant="default" onClick={processAllPayments}>
              Processar Todos
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  € {pendingPayments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </div>
                <Wallet className="h-8 w-8 text-primary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{pendingPayments.length} pagamentos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Afiliados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  € {payments.filter(p => p.role === "affiliate" && p.status === "pending").reduce((sum, payment) => sum + payment.amount, 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </div>
                <Share2 className="h-8 w-8 text-green-500/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{payments.filter(p => p.role === "affiliate" && p.status === "pending").length} afiliados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Produtores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  € {payments.filter(p => p.role === "creator" && p.status === "pending").reduce((sum, payment) => sum + payment.amount, 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </div>
                <PiggyBank className="h-8 w-8 text-purple-500/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{payments.filter(p => p.role === "creator" && p.status === "pending").length} produtores</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pagamentos Processados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  € {processedPayments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pagamentos</CardTitle>
            <CardDescription>Gerencie os pagamentos para afiliados e produtores</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-6">
                <TabsTrigger value="pending">Pendentes ({pendingPayments.length})</TabsTrigger>
                <TabsTrigger value="processed">Processados ({processedPayments.length})</TabsTrigger>
                <TabsTrigger value="failed">Falhos ({failedPayments.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">ID</th>
                        <th className="text-left py-2 font-medium">Destinatário</th>
                        <th className="text-left py-2 font-medium">Tipo</th>
                        <th className="text-left py-2 font-medium">Valor</th>
                        <th className="text-left py-2 font-medium">Método</th>
                        <th className="text-left py-2 font-medium">Data</th>
                        <th className="text-left py-2 font-medium">Status</th>
                        <th className="text-left py-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingPayments.map(payment => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3">{payment.id}</td>
                          <td className="py-3">
                            <div>{payment.recipient}</div>
                            <div className="text-xs text-muted-foreground">{payment.email}</div>
                          </td>
                          <td className="py-3">{getRoleLabel(payment.role)}</td>
                          <td className="py-3 font-medium">€ {payment.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <BanknoteIcon className="h-4 w-4" />
                              <span className="text-xs">Transferência Bancária</span>
                            </div>
                          </td>
                          <td className="py-3">{formatDate(payment.createdAt)}</td>
                          <td className="py-3">{getStatusLabel(payment.status)}</td>
                          <td className="py-3">
                            <Button 
                              size="sm" 
                              variant="default" 
                              className="w-full"
                              onClick={() => processPayment(payment.id)}
                            >
                              Processar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="processed">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">ID</th>
                        <th className="text-left py-2 font-medium">Destinatário</th>
                        <th className="text-left py-2 font-medium">Tipo</th>
                        <th className="text-left py-2 font-medium">Valor</th>
                        <th className="text-left py-2 font-medium">Método</th>
                        <th className="text-left py-2 font-medium">Data</th>
                        <th className="text-left py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedPayments.map(payment => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3">{payment.id}</td>
                          <td className="py-3">
                            <div>{payment.recipient}</div>
                            <div className="text-xs text-muted-foreground">{payment.email}</div>
                          </td>
                          <td className="py-3">{getRoleLabel(payment.role)}</td>
                          <td className="py-3 font-medium">€ {payment.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <BanknoteIcon className="h-4 w-4" />
                              <span className="text-xs">Transferência Bancária</span>
                            </div>
                          </td>
                          <td className="py-3">{formatDate(payment.createdAt)}</td>
                          <td className="py-3">{getStatusLabel(payment.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="failed">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">ID</th>
                        <th className="text-left py-2 font-medium">Destinatário</th>
                        <th className="text-left py-2 font-medium">Tipo</th>
                        <th className="text-left py-2 font-medium">Valor</th>
                        <th className="text-left py-2 font-medium">Método</th>
                        <th className="text-left py-2 font-medium">Data</th>
                        <th className="text-left py-2 font-medium">Status</th>
                        <th className="text-left py-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {failedPayments.map(payment => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3">{payment.id}</td>
                          <td className="py-3">
                            <div>{payment.recipient}</div>
                            <div className="text-xs text-muted-foreground">{payment.email}</div>
                          </td>
                          <td className="py-3">{getRoleLabel(payment.role)}</td>
                          <td className="py-3 font-medium">€ {payment.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <BanknoteIcon className="h-4 w-4" />
                              <span className="text-xs">Transferência Bancária</span>
                            </div>
                          </td>
                          <td className="py-3">{formatDate(payment.createdAt)}</td>
                          <td className="py-3">{getStatusLabel(payment.status)}</td>
                          <td className="py-3">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => processPayment(payment.id)}
                            >
                              Tentar Novamente
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog for processing payment */}
      <Dialog open={isProcessingDialogOpen} onOpenChange={setIsProcessingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Processar Pagamento</DialogTitle>
            <DialogDescription>
              Confirme os detalhes do pagamento antes de prosseguir.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Destinatário</Label>
                  <p className="font-medium">{selectedPayment.recipient}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tipo</Label>
                  <p className="font-medium capitalize">{selectedPayment.role === "affiliate" ? "Afiliado" : "Produtor"}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="font-medium">{selectedPayment.email}</p>
              </div>
              
              <div>
                <Label className="text-xs text-muted-foreground">IBAN</Label>
                <p className="font-medium">{selectedPayment.iban}</p>
              </div>
              
              <div>
                <Label className="text-xs text-muted-foreground">Valor a transferir</Label>
                <p className="text-xl font-bold">€ {selectedPayment.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</p>
              </div>
              
              <div>
                <Label htmlFor="payment-method">Método de Pagamento</Label>
                <Select defaultValue={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Transferência Bancária</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="wise">Wise</SelectItem>
                    <SelectItem value="revolut">Revolut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProcessingDialogOpen(false)}>Cancelar</Button>
            <Button onClick={confirmPaymentProcess}>Confirmar Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
