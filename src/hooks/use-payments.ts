
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: number;
  name: string;
  type: string;
  method: string;
  amount: string;
  requestDate: string;
  status: string;
}

export function usePayments() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [processingPayments, setProcessingPayments] = useState(false);
  const [paymentMethodDialog, setPaymentMethodDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([
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

  const handleApprovePayment = (paymentId: number) => {
    const payment = pendingPayments.find(p => p.id === paymentId);
    if (payment) {
      setSelectedPayment(payment);
      setPaymentMethodDialog(true);
    }
  };
  
  const handlePaymentMethodSubmit = (values: { paymentMethod: string }) => {
    if (!selectedPayment) return;
    
    // Get payment method display name
    let methodDisplay = "";
    switch (values.paymentMethod) {
      case "bank_transfer":
        methodDisplay = "Transferência Bancária";
        break;
      case "digital_account":
        methodDisplay = "Conta Digital";
        break;
      case "other_bank":
        methodDisplay = "Outro Banco";
        break;
      case "paypal":
        methodDisplay = "PayPal";
        break;
      default:
        methodDisplay = "Transferência Bancária";
    }
    
    // Process individual payment
    const updatedPayments = pendingPayments.map(payment => 
      payment.id === selectedPayment.id ? { 
        ...payment, 
        status: "Processado",
        method: methodDisplay
      } : payment
    );
    
    setPendingPayments(updatedPayments);
    setPaymentMethodDialog(false);
    
    // Show success notification
    toast({
      title: "Pagamento aprovado",
      description: `O pagamento foi aprovado com sucesso via ${methodDisplay}.`,
      className: "bg-green-50 border-green-200",
    });
  };

  return {
    pendingPayments,
    isDialogOpen,
    setIsDialogOpen,
    processingPayments,
    paymentMethodDialog,
    setPaymentMethodDialog,
    selectedPayment,
    handleProcessPayments,
    confirmProcessPayments,
    handleApprovePayment,
    handlePaymentMethodSubmit
  };
}
