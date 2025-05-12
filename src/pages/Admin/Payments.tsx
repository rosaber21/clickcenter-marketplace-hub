
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayments } from "@/hooks/use-payments";
import { PaymentsTable } from "@/components/admin/payments/PaymentsTable";
import { ProcessPaymentsDialog } from "@/components/admin/payments/ProcessPaymentsDialog";
import { PaymentMethodDialog } from "@/components/admin/payments/PaymentMethodDialog";

export default function AdminPayments() {
  const {
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
  } = usePayments();

  return (
    <>
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
          <PaymentsTable 
            payments={pendingPayments} 
            onApprovePayment={handleApprovePayment} 
          />
        </Card>
      </div>
      
      <ProcessPaymentsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        pendingPayments={pendingPayments}
        processingPayments={processingPayments}
        onConfirm={confirmProcessPayments}
      />
      
      {selectedPayment && (
        <PaymentMethodDialog
          open={paymentMethodDialog}
          onOpenChange={setPaymentMethodDialog}
          selectedPayment={selectedPayment}
          onSubmit={handlePaymentMethodSubmit}
        />
      )}
    </>
  );
}
