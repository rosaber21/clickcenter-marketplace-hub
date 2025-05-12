
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

interface PaymentItem {
  id: number;
  name: string;
  type: string;
  method: string;
  amount: string;
  requestDate: string;
  status: string;
}

interface PaymentsTableProps {
  payments: PaymentItem[];
  onApprovePayment: (paymentId: number) => void;
}

export function PaymentsTable({ payments, onApprovePayment }: PaymentsTableProps) {
  return (
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
          {payments.map((payment) => (
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
                    onClick={() => onApprovePayment(payment.id)}
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
          
          {payments.length === 0 && (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                Não há pagamentos pendentes no momento.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </CardContent>
  );
}
