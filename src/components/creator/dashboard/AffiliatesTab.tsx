
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { Users, Eye, Link as LinkIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  creator: string;
  category: string;
  price: string;
  status: "Ativo" | "Pendente";
}

interface AffiliatesTabProps {
  products: Product[];
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAddAffiliate: () => void;
  onManageAffiliates: () => void;
}

export const AffiliatesTab = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate,
  onManageAffiliates
}: AffiliatesTabProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleViewAffiliate = (affiliate: string) => {
    toast({
      title: "Visualizando afiliado",
      description: `Detalhes do afiliado ${affiliate}`,
      variant: "success",
    });
    navigate(`/criador/afiliados/${affiliate.toLowerCase().replace(/\s+/g, '-')}`);
  };
  
  const handleViewAllAffiliates = () => {
    toast({
      title: "Todos os afiliados",
      description: "Visualizando lista completa de afiliados",
      variant: "success",
    });
    navigate("/criador/afiliados");
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "Gerando relatório",
      description: "O relatório de desempenho de afiliados está sendo gerado",
      variant: "success",
    });
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-secondary/5">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <CardTitle className="text-secondary">Afiliados</CardTitle>
            <CardDescription>Desempenho dos afiliados</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGenerateReport}
              className="gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              Relatório
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleViewAllAffiliates}
            >
              Ver Todos
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ProductsTable
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddAffiliate={onAddAffiliate}
          showAffiliateButton={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="border rounded-lg p-3 hover:border-primary/30 hover:bg-primary/5 transition-colors">
            <p className="font-medium text-primary">Total de afiliados</p>
            <p className="text-2xl font-bold mt-2">27</p>
            <p className="text-xs text-muted-foreground mt-1">+5 novos este mês</p>
          </div>
          
          <div className="border rounded-lg p-3 hover:border-secondary/30 hover:bg-secondary/5 transition-colors">
            <p className="font-medium text-secondary">Vendas por afiliados</p>
            <p className="text-2xl font-bold mt-2">€ 3.465,80</p>
            <p className="text-xs text-muted-foreground mt-1">44% das suas vendas totais</p>
          </div>
          
          <div className="border rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
            <p className="font-medium">Comissões pagas</p>
            <p className="text-2xl font-bold mt-2 text-primary">€ 692,90</p>
            <p className="text-xs text-muted-foreground mt-1">20% das vendas de afiliados</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">Afiliados com Melhor Desempenho</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-primary/80">Afiliado</th>
                <th className="text-left py-2 font-medium text-primary/80">Vendas</th>
                <th className="text-left py-2 font-medium text-primary/80">Comissão</th>
                <th className="text-left py-2 font-medium text-primary/80">Produtos</th>
                <th className="text-right py-2 font-medium text-primary/80">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3">João Silva</td>
                <td className="py-3">€ 1240,00</td>
                <td className="py-3">€ 248,00</td>
                <td className="py-3">5</td>
                <td className="py-3 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewAffiliate("João Silva")}
                    className="gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Detalhes
                  </Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3">Maria Oliveira</td>
                <td className="py-3">€ 950,50</td>
                <td className="py-3">€ 190,10</td>
                <td className="py-3">3</td>
                <td className="py-3 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewAffiliate("Maria Oliveira")}
                    className="gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Detalhes
                  </Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3">Carlos Mendes</td>
                <td className="py-3">€ 780,30</td>
                <td className="py-3">€ 156,06</td>
                <td className="py-3">2</td>
                <td className="py-3 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewAffiliate("Carlos Mendes")}
                    className="gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Detalhes
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full flex items-center justify-center gap-2"
          onClick={onManageAffiliates}
        >
          <Users className="h-4 w-4" />
          Gerenciar Afiliados
        </Button>
      </CardFooter>
    </Card>
  );
};
