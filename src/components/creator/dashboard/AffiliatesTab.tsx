
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search, Settings, Users, Edit, Trash2, Eye, LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // Assuming Badge component exists
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Assuming DropdownMenu components exist
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics";
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable";
import { AffiliateProductsSection } from "./affiliates/AffiliateProductsSection";

// Assuming Product and Affiliate types. These should ideally come from a central types file.
interface Product {
  id: string;
  name: string;
  price: number;
  // Add other relevant product properties
  category?: string;
  imageUrl?: string;
  status?: string;
  creator?: string;
}

interface Affiliate {
  id: string;
  name: string;
  email?: string;
  sales: number;
  conversionRate: number;
  earnings: number;
  status: 'active' | 'pending' | 'inactive';
  // products?: Product[]; // Or AffiliateProduct[] depending on TopAffiliatesTable
}

interface AffiliatesTabProps {
  products: Product[]; // Changed from any[] to Product[]
  onEdit: (product: Product) => void; // Assuming Product type for onEdit
  onDelete: (product: Product) => void; // Assuming Product type for onDelete
  onAddAffiliate: () => void;
  onManageAffiliates: () => void;
}

export const AffiliatesTab: React.FC<AffiliatesTabProps> = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate,
  onManageAffiliates,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - replace with actual data fetching and state management
  const performanceMetrics = {
    totalAffiliates: 120,
    activeAffiliates: 85,
    totalAffiliateSales: 15600.75,
    averageConversionRate: 8.5,
  };

  const topAffiliatesData: Affiliate[] = [
    { id: '1', name: 'Affiliate One', sales: 150, conversionRate: 12, earnings: 2500, status: 'active' },
    { id: '2', name: 'Affiliate Two', sales: 120, conversionRate: 10, earnings: 1800, status: 'active' },
    { id: '3', name: 'Affiliate Three', sales: 90, conversionRate: 7, earnings: 1200, status: 'pending' },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAffiliates = topAffiliatesData.filter((affiliate) =>
    affiliate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Gerenciar Afiliados</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe o desempenho e gerencie seus afiliados.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onManageAffiliates}>
            <Settings className="mr-2 h-4 w-4" /> Configurações de Afiliados
          </Button>
          <Button onClick={onAddAffiliate}>
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Afiliado
          </Button>
        </div>
      </div>

      <AffiliatePerformanceMetrics metrics={performanceMetrics} />

      <Card>
        <CardHeader>
          <CardTitle>Top Afiliados</CardTitle>
          <CardDescription>Lista dos seus afiliados com melhor desempenho.</CardDescription>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar afiliados..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TopAffiliatesTable 
            affiliates={filteredAffiliates} 
            onEditAffiliate={(affiliate) => console.log('Edit affiliate', affiliate.id)}
            onDeleteAffiliate={(affiliate) => console.log('Delete affiliate', affiliate.id)}
          />
        </CardContent>
      </Card>

      <AffiliateProductsSection
        products={products} // This now correctly passes Product[]
        onEditProduct={onEdit}
        onDeleteProduct={onDelete}
        onLinkProductToAffiliate={(productId, affiliateId) => console.log(`Link product ${productId} to affiliate ${affiliateId}`)}
      />
    </div>
  );
};
