
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Bank } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const PaymentsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Formas de Pagamento</CardTitle>
          <CardDescription>
            Configure como você deseja receber seus pagamentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="bank" className="space-y-4">
            <div className="flex items-center space-x-2 border rounded-md p-4">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="flex items-center cursor-pointer">
                <Bank className="h-5 w-5 mr-2" />
                <span>Transferência Bancária</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-4">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center cursor-pointer">
                <CreditCard className="h-5 w-5 mr-2" />
                <span>Cartão de Crédito</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados Bancários</CardTitle>
          <CardDescription>
            Informe os dados para recebimento de valores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Nome do Banco</Label>
              <Input id="bank-name" placeholder="Digite o nome do banco" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-type">Tipo de Conta</Label>
              <Select defaultValue="checking">
                <SelectTrigger id="account-type">
                  <SelectValue placeholder="Selecione o tipo de conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Conta Corrente</SelectItem>
                  <SelectItem value="savings">Conta Poupança</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agency">Agência</Label>
              <Input id="agency" placeholder="0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">Conta</Label>
              <Input id="account" placeholder="00000-0" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="holder-name">Nome do Titular</Label>
            <Input id="holder-name" placeholder="Digite o nome completo do titular" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF/CNPJ</Label>
            <Input id="cpf" placeholder="Digite o CPF ou CNPJ" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>
            Visualize seus pagamentos recebidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Vendas - Maio 2025</h4>
                <p className="text-sm text-muted-foreground">Transferido em 15/06/2025</p>
              </div>
              <div className="font-medium">R$ 3.450,00</div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Vendas - Abril 2025</h4>
                <p className="text-sm text-muted-foreground">Transferido em 15/05/2025</p>
              </div>
              <div className="font-medium">R$ 2.780,00</div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Vendas - Março 2025</h4>
                <p className="text-sm text-muted-foreground">Transferido em 15/04/2025</p>
              </div>
              <div className="font-medium">R$ 3.120,00</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Ver Todos os Pagamentos</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
