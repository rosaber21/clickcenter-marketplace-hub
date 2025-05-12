
import React from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentItem {
  id: number;
  name: string;
  amount: string;
  status: string;
}

interface ProcessPaymentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingPayments: PaymentItem[];
  processingPayments: boolean;
  onConfirm: () => void;
}

export function ProcessPaymentsDialog({
  open,
  onOpenChange,
  pendingPayments,
  processingPayments,
  onConfirm
}: ProcessPaymentsDialogProps) {
  const pendingCount = pendingPayments.filter(p => p.status === "Pendente").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Processar pagamentos pendentes</DialogTitle>
          <DialogDescription>
            Esta ação irá processar todos os pagamentos pendentes. Deseja continuar?
          </DialogDescription>
        </DialogHeader>
        
        {pendingCount === 0 ? (
          <div className="flex items-center justify-center p-4 text-amber-600 bg-amber-50 rounded-md">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Não há pagamentos pendentes para processar.</span>
          </div>
        ) : (
          <div className="py-4">
            <p><strong>{pendingCount}</strong> pagamentos pendentes serão processados.</p>
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={processingPayments}>
            Cancelar
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={processingPayments || pendingCount === 0}
          >
            {processingPayments ? "Processando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
