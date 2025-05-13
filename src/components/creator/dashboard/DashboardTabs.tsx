
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/creator/dashboard/OverviewTab";
import { ProductsTab } from "@/components/creator/dashboard/ProductsTab";
import { AffiliatesTab } from "@/components/creator/dashboard/AffiliatesTab";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  products: any[];
  monthlySalesData: number[];
  monthlySalesLabels: string[];
  productSalesData: number[];
  productSalesLabels: string[];
  handlers: {
    handleEditProduct: (product: any) => void;
    handleDeleteProduct: (product: any) => void;
    handleViewAllProducts: () => void;
    handleEditVideos: () => void;
    handleManageMembers: () => void;
    handleNewAffiliate: () => void;
    handleManageAffiliates: () => void;
  };
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  products,
  monthlySalesData,
  monthlySalesLabels,
  productSalesData,
  productSalesLabels,
  handlers
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Conteúdo</TabsTrigger>
        <TabsTrigger value="products">Configurações</TabsTrigger>
        <TabsTrigger value="affiliates">Personalização</TabsTrigger>
        <TabsTrigger value="users">Usuários</TabsTrigger>
        <TabsTrigger value="comments">Comentários</TabsTrigger>
        <TabsTrigger value="communities">Comunidades</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab 
          monthlySalesData={monthlySalesData}
          monthlySalesLabels={monthlySalesLabels}
          productSalesData={productSalesData}
          productSalesLabels={productSalesLabels}
        />
      </TabsContent>
      
      <TabsContent value="products">
        <ProductsTab 
          products={products}
          onEdit={handlers.handleEditProduct}
          onDelete={handlers.handleDeleteProduct}
          onAddProduct={() => document.dispatchEvent(new CustomEvent('openProductDialog'))}
          onViewAllProducts={handlers.handleViewAllProducts}
          onEditVideos={handlers.handleEditVideos}
          onManageMembers={handlers.handleManageMembers}
        />
      </TabsContent>
      
      <TabsContent value="affiliates">
        <AffiliatesTab
          products={products}
          onEdit={handlers.handleEditProduct}
          onDelete={handlers.handleDeleteProduct}
          onAddAffiliate={handlers.handleNewAffiliate}
          onManageAffiliates={handlers.handleManageAffiliates}
        />
      </TabsContent>
      
      <TabsContent value="users">
        <div className="text-center p-8 text-muted-foreground">
          Gerenciamento de usuários será exibido aqui
        </div>
      </TabsContent>
      
      <TabsContent value="comments">
        <div className="text-center p-8 text-muted-foreground">
          Comentários serão exibidos aqui
        </div>
      </TabsContent>
      
      <TabsContent value="communities">
        <div className="text-center p-8 text-muted-foreground">
          Comunidades serão exibidas aqui
        </div>
      </TabsContent>
    </Tabs>
  );
};
