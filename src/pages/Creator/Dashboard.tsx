
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";

// Import custom hooks
import { useDashboardTabs } from "@/components/creator/dashboard/useDashboardTabs";
import { useDashboardData } from "@/components/creator/dashboard/useDashboardData";
import { useToastNotifications } from "@/components/creator/dashboard/useToastNotifications";
// Changed from component import to hook import
import { useAffiliateDialogHandler } from "@/components/creator/dashboard/AffiliateDialogHandler";
import { ProductDialogHandler } from "@/components/creator/dashboard/ProductDialogHandler";

// Import the dashboard components
import { StatsCards } from "@/components/creator/dashboard/StatsCards";
import { OverviewTab } from "@/components/creator/dashboard/OverviewTab";
import { ProductsTab } from "@/components/creator/dashboard/ProductsTab";
import { AffiliatesTab } from "@/components/creator/dashboard/AffiliatesTab";
import { AffiliateDialog } from "@/components/creator/dashboard/AffiliateDialog";

export default function CreatorDashboard() {
  // Use custom hooks
  const { activeTab, setActiveTab } = useDashboardTabs();
  const { 
    totalSales, 
    activeProducts, 
    pendingCommissions, 
    products, 
    setProducts,
    monthlySalesData,
    monthlySalesLabels,
    productSalesData,
    productSalesLabels
  } = useDashboardData();
  
  const { 
    handleViewAllProducts, 
    handleManageAffiliates, 
    handleEditProduct, 
    handleDeleteProduct 
  } = useToastNotifications();

  // Get affiliate dialog handler from the hook instead of component
  const { 
    handleNewAffiliate, 
    affiliateDialogOpen, 
    setAffiliateDialogOpen, 
    newAffiliateEmail, 
    setNewAffiliateEmail, 
    handleAddAffiliate, 
    isAddingAffiliate 
  } = useAffiliateDialogHandler();

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2 text-primary">Creator Dashboard</h1>
        <p className="text-muted-foreground mb-6">Manage your products and track your sales</p>
        
        <StatsCards 
          totalSales={totalSales} 
          activeProducts={activeProducts} 
          pendingCommissions={pendingCommissions} 
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
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
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAddProduct={() => document.dispatchEvent(new CustomEvent('openProductDialog'))}
              onViewAllProducts={handleViewAllProducts}
            />
          </TabsContent>
          
          <TabsContent value="affiliates">
            <AffiliatesTab
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAddAffiliate={handleNewAffiliate}
              onManageAffiliates={handleManageAffiliates}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Product Dialog */}
      <ProductDialogHandler products={products} setProducts={setProducts} />
      
      {/* Add Affiliate Dialog */}
      <AffiliateDialog 
        open={affiliateDialogOpen}
        onOpenChange={setAffiliateDialogOpen}
        newAffiliateEmail={newAffiliateEmail}
        onEmailChange={(e) => setNewAffiliateEmail(e.target.value)}
        onSubmit={handleAddAffiliate}
        isAddingAffiliate={isAddingAffiliate}
      />
    </MainLayout>
  );
}
