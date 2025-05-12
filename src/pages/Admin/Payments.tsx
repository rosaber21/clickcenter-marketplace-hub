
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminPayments() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [processingPayments, setProcessingPayments] = useState(false);
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 1,
      name: "Pedro Costa",
      type: "Afiliado",
      method: "Transferência Bancária",
      amount: "€ 485,25",
      requestDate: "09/05/2025",
      status: "Pendente"
    },
    {
      id: 2,
      name: "Carlos Martins",
      type: "Produtor",
      method: "PayPal",
      amount: "€ 1.250,00",
      requestDate: "10/05/2025",
      status: "Pendente"
    }
  ]);
  
  const { toast } = useToast();

  const handleProcessPayments = () => {
    setIsDialogOpen(true);
  };

  const confirmProcessPayments = () => {
    setProcessingPayments(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Update status to "Processado"
      const updatedPayments = pendingPayments.map(payment => ({
        ...payment,
        status: "Processado"
      }));
      
      setPendingPayments(updatedPayments);
      setProcessingPayments(false);
      setIsDialogOpen(false);
      
      // Show success notification
      toast({
        title: "Pagamentos processados",
        description: "Todos os pagamentos pendentes foram processados com sucesso.",
        className: "bg-green-50 border-green-200",
      });
    }, 1500);
  };

  const handleApprovePayment = (paymentId) => {
    // Process individual payment
    const updatedPayments = pendingPayments.map(payment => 
      payment.id === paymentId ? { ...payment, status: "Processado" } : payment
    );
    
    setPendingPayments(updatedPayments);
    
    // Show success notification
    toast({
      title: "Pagamento aprovado",
      description: "O pagamento foi aprovado com sucesso.",
      className: "bg-green-50 border-green-200",
    });
  };

  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Pagamentos</h1>
          <Button onClick={handleProcessPayments}>Processar Pagamentos</Button>
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
                {pendingPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-3">{payment.name}</td>
                    <td className="py-3">{payment.type}</td>
                    <td className="py-3">{payment.method}</td>
                    <td className="py-3">{payment.amount}</td>
                    <td className="py-3">{payment.requestDate}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${
                        payment.status === "Pendente" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {payment.status === "Pendente" ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleApprovePayment(payment.id)}
                        >
                          Aprovar
                        </Button>
                      ) : (
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Aprovado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                
                {pendingPayments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-gray-500">
                      Não há pagamentos pendentes no momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Processar pagamentos pendentes</DialogTitle>
            <DialogDescription>
              Esta ação irá processar todos os pagamentos pendentes. Deseja continuar?
            </DialogDescription>
          </DialogHeader>
          
          {pendingPayments.filter(p => p.status === "Pendente").length === 0 ? (
            <div className="flex items-center justify-center p-4 text-amber-600 bg-amber-50 rounded-md">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Não há pagamentos pendentes para processar.</span>
            </div>
          ) : (
            <div className="py-4">
              <p><strong>{pendingPayments.filter(p => p.status === "Pendente").length}</strong> pagamentos pendentes serão processados.</p>
              <ul className="mt-2 space-y-1">
                {pendingPayments
                  .filter(p => p.status === "Pendente")
                  .map(payment => (
                    <li key={payment.id} className="flex justify-between">
                      <span>{payment.name}</span>
                      <span>{payment.amount}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={processingPayments}>
              Cancelar
            </Button>
            <Button 
              onClick={confirmProcessPayments}
              disabled={processingPayments || pendingPayments.filter(p => p.status === "Pendente").length === 0}
            >
              {processingPayments ? "Processando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
