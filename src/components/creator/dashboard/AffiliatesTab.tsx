
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { Users } from "lucide-react";

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
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-secondary/5">
        <CardTitle className="text-secondary">Affiliates</CardTitle>
        <CardDescription>Affiliate performance</CardDescription>
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
            <p className="font-medium text-primary">Total affiliates</p>
            <p className="text-2xl font-bold mt-2">27</p>
            <p className="text-xs text-muted-foreground mt-1">+5 new this month</p>
          </div>
          
          <div className="border rounded-lg p-3 hover:border-secondary/30 hover:bg-secondary/5 transition-colors">
            <p className="font-medium text-secondary">Sales by affiliates</p>
            <p className="text-2xl font-bold mt-2">€ 3.465,80</p>
            <p className="text-xs text-muted-foreground mt-1">44% of your total sales</p>
          </div>
          
          <div className="border rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
            <p className="font-medium">Commissions paid</p>
            <p className="text-2xl font-bold mt-2 text-primary">€ 692,90</p>
            <p className="text-xs text-muted-foreground mt-1">20% of affiliate sales</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">Top Performing Affiliates</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-primary/80">Affiliate</th>
                <th className="text-left py-2 font-medium text-primary/80">Sales</th>
                <th className="text-left py-2 font-medium text-primary/80">Commission</th>
                <th className="text-left py-2 font-medium text-primary/80">Products</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3">João Silva</td>
                <td className="py-3">€ 1240,00</td>
                <td className="py-3">€ 248,00</td>
                <td className="py-3">5</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3">Maria Oliveira</td>
                <td className="py-3">€ 950,50</td>
                <td className="py-3">€ 190,10</td>
                <td className="py-3">3</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3">Carlos Mendes</td>
                <td className="py-3">€ 780,30</td>
                <td className="py-3">€ 156,06</td>
                <td className="py-3">2</td>
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
          Manage Affiliates
        </Button>
      </CardFooter>
    </Card>
  );
};
