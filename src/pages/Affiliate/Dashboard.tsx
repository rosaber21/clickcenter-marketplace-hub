
import React from "react";
import { useAffiliateDashboard } from "@/hooks/use-affiliate-dashboard";
import { DashboardHeader } from "@/components/affiliate/dashboard/DashboardHeader";
import { StatsCards } from "@/components/affiliate/dashboard/StatsCards";
import { MyAffiliateProducts } from "@/components/affiliate/dashboard/MyAffiliateProducts";
import { SalesAndProductsTabs } from "@/components/affiliate/dashboard/SalesAndProductsTabs";
import { MarketingMaterials } from "@/components/affiliate/dashboard/MarketingMaterials";

const AffiliateDashboard = () => {
  const {
    stats,
    recentSales,
    topProducts,
    affiliateProducts,
    handleViewProducts,
    handleEditProduct,
    handleDeleteProduct,
    handleAddAffiliate,
    handleSaleDetails,
    handleGenerateLink,
    handleDownloadMaterial,
    handleViewAllMaterials,
    handleViewProductDetails
  } = useAffiliateDashboard();

  return (
    <div className="p-6">
      <DashboardHeader onViewProducts={handleViewProducts} />
      
      <StatsCards stats={stats} />
      
      <MyAffiliateProducts 
        products={affiliateProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onAddAffiliate={handleAddAffiliate}
        onViewProducts={handleViewProducts}
      />

      <SalesAndProductsTabs 
        recentSales={recentSales}
        topProducts={topProducts}
        onSaleDetails={handleSaleDetails}
        onGenerateLink={handleGenerateLink}
        onViewProductDetails={handleViewProductDetails}
      />

      <MarketingMaterials 
        onDownloadMaterial={handleDownloadMaterial}
        onViewAllMaterials={handleViewAllMaterials}
      />
    </div>
  );
};

export default AffiliateDashboard;
