
import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPayment: any;
  onSubmit: (values: { paymentMethod: string }) => void;
}

export function PaymentMethodDialog({ 
  open, 
  onOpenChange, 
  selectedPayment, 
  onSubmit 
}: PaymentMethodDialogProps) {
  const form = useForm({
    defaultValues: {
      paymentMethod: "bank_transfer"
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione o Método de Pagamento</DialogTitle>
          <DialogDescription>
            Escolha o método de pagamento para processar o pagamento de {selectedPayment?.name}.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex-grow cursor-pointer">
                          <div className="font-medium">Transferência Bancária</div>
                          <p className="text-sm text-gray-500">Transferência direta para conta bancária</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                        <RadioGroupItem value="digital_account" id="digital_account" />
                        <Label htmlFor="digital_account" className="flex-grow cursor-pointer">
                          <div className="font-medium">Conta Digital</div>
                          <p className="text-sm text-gray-500">Pix, MBWay ou transferências instantâneas</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                        <RadioGroupItem value="other_bank" id="other_bank" />
                        <Label htmlFor="other_bank" className="flex-grow cursor-pointer">
                          <div className="font-medium">Outro Banco</div>
                          <p className="text-sm text-gray-500">Transferência para outro banco</p>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-grow cursor-pointer">
                          <div className="font-medium">PayPal</div>
                          <p className="text-sm text-gray-500">Pagamento via PayPal</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50 cursor-pointer border-blue-200">
                        <RadioGroupItem value="international_transfer" id="international_transfer" />
                        <Label htmlFor="international_transfer" className="flex-grow cursor-pointer">
                          <div className="font-medium">Transferência Internacional</div>
                          <p className="text-sm text-gray-500">SWIFT/BIC para contas internacionais</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50 cursor-pointer border-blue-200">
                        <RadioGroupItem value="wise" id="wise" />
                        <Label htmlFor="wise" className="flex-grow cursor-pointer">
                          <div className="font-medium">Wise (Transferwise)</div>
                          <p className="text-sm text-gray-500">Transferência internacional com taxas reduzidas</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Confirmar Pagamento
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
