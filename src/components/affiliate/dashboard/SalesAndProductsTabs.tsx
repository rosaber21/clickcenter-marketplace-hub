
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AffiliateSale, TopProduct } from "@/hooks/use-affiliate-dashboard";

interface SalesAndProductsTabsProps {
  recentSales: AffiliateSale[];
  topProducts: TopProduct[];
  onSaleDetails: (saleId: number) => void;
  onGenerateLink: (productId: number, productName: string) => void;
  onViewProductDetails: (productId: number) => void;
}

export const SalesAndProductsTabs = ({
  recentSales,
  topProducts,
  onSaleDetails,
  onGenerateLink,
  onViewProductDetails
}: SalesAndProductsTabsProps) => {
  return (
    <Tabs defaultValue="sales" className="mb-8">
      <TabsList>
        <TabsTrigger value="sales">Vendas Recentes</TabsTrigger>
        <TabsTrigger value="products">Top Produtos</TabsTrigger>
      </TabsList>
      <TabsContent value="sales" className="p-4 border rounded-md mt-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Produto</th>
                <th className="text-left py-3 px-4">Data</th>
                <th className="text-left py-3 px-4">Comissão</th>
                <th className="text-right py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{sale.product}</td>
                  <td className="py-3 px-4">{sale.date}</td>
                  <td className="py-3 px-4 font-medium text-primary">{sale.commission}</td>
                  <td className="py-3 px-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onSaleDetails(sale.id)}
                      className="gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
      <TabsContent value="products" className="p-4 border rounded-md mt-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Produto</th>
                <th className="text-center py-3 px-4">Comissão</th>
                <th className="text-center py-3 px-4">Vendas</th>
                <th className="text-right py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4 text-center">{product.commission}</td>
                  <td className="py-3 px-4 text-center">{product.sales}</td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewProductDetails(product.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onGenerateLink(product.id, product.name)}
                      className="gap-1"
                    >
                      <LinkIcon className="h-4 w-4" /> Gerar Link
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  );
};
