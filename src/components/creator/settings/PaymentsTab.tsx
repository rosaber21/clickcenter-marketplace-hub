
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, CreditCard, Plus, Shield } from "lucide-react";

export const PaymentsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Métodos de Pagamento</h3>
        <p className="text-sm text-gray-500">
          Gerencie seus métodos de pagamento e informações de faturamento
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard size={18} />
              <span>Cartões de Crédito</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expira em 06/2025</p>
                </div>
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Plus size={16} className="mr-2" />
              Adicionar Cartão
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building size={18} />
              <span>Dados de Faturamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="font-medium">Nome da Empresa</p>
              <p className="text-sm text-gray-500">CNPJ: 12.345.678/0001-90</p>
            </div>
            <div>
              <p className="font-medium">Endereço</p>
              <p className="text-sm text-gray-500">
                Av. Paulista, 1000 - São Paulo, SP
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Atualizar Dados
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={18} />
            <span>Segurança de Pagamentos</span>
          </CardTitle>
          <CardDescription>
            Configure opções avançadas de segurança para suas transações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Verificação em duas etapas</p>
              <p className="text-sm text-gray-500">
                Adiciona uma camada extra de segurança para transações acima de
                R$1.000
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações de transação</p>
              <p className="text-sm text-gray-500">
                Receba alertas para cada transação realizada
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
