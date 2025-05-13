
import React from "react";
import { useNavigate } from "react-router-dom";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";

// Import custom hooks
import { useDashboardTabs } from "@/components/creator/dashboard/useDashboardTabs";
import { useDashboardData } from "@/components/creator/dashboard/useDashboardData";
import { useToastNotifications } from "@/components/creator/dashboard/useToastNotifications";
import { useAffiliateDialogHandler } from "@/components/creator/dashboard/AffiliateDialogHandler";
import { useVideoMemberEdit } from "@/components/creator/dashboard/useVideoMemberEdit";

// Import the dashboard components
import { StatsCards } from "@/components/creator/dashboard/StatsCards";
import { DashboardHeader } from "@/components/creator/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/creator/dashboard/DashboardTabs";
import { DialogsManager } from "@/components/creator/dashboard/DialogsManager";

export default function CreatorDashboard() {
  const navigate = useNavigate();
  
  // Use custom hooks
  const { activeTab, setActiveTab, activeCourse, setActiveCourse, courses } = useDashboardTabs();
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
    handleManageAffiliates: toastHandleManageAffiliates, 
    handleEditProduct, 
    handleDeleteProduct 
  } = useToastNotifications();

  // Get affiliate dialog handler from the hook
  const { 
    handleNewAffiliate, 
    affiliateDialogOpen, 
    setAffiliateDialogOpen, 
    newAffiliateEmail, 
    setNewAffiliateEmail, 
    handleAddAffiliate, 
    isAddingAffiliate 
  } = useAffiliateDialogHandler();
  
  // Get video and member area editing handlers
  const {
    handleEditVideos,
    handleManageMembers
  } = useVideoMemberEdit();
  
  // Enhanced handler for managing affiliates with proper navigation
  const handleManageAffiliates = () => {
    // Call the toast notification
    toastHandleManageAffiliates();
    // Navigate to the affiliates management page
    navigate("/criador/gerenciar-afiliados");
  };

  const handleChangeCourse = (courseId: string) => {
    setActiveCourse(courseId);
  };
  
  const handleViewPreview = () => {
    navigate("/criador/curso-preview");
  };

  // Collect all handlers to pass to DashboardTabs
  const handlers = {
    handleEditProduct,
    handleDeleteProduct,
    handleViewAllProducts,
    handleEditVideos,
    handleManageMembers,
    handleNewAffiliate,
    handleManageAffiliates
  };

  return (
    <CreatorLayout>
      <div className="container py-6">
        <DashboardHeader
          title="Painel do Produtor"
          subtitle="Gerencie seus produtos e acompanhe suas vendas"
          activeCourse={activeCourse}
          handleChangeCourse={handleChangeCourse}
          handleViewPreview={handleViewPreview}
          courses={courses}
        />
        
        <StatsCards 
          totalSales={totalSales} 
          activeProducts={activeProducts} 
          pendingCommissions={pendingCommissions} 
        />

        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          products={products}
          monthlySalesData={monthlySalesData}
          monthlySalesLabels={monthlySalesLabels}
          productSalesData={productSalesData}
          productSalesLabels={productSalesLabels}
          handlers={handlers}
        />
      </div>
      
      <DialogsManager
        products={products}
        setProducts={setProducts}
        affiliateDialogOpen={affiliateDialogOpen}
        setAffiliateDialogOpen={setAffiliateDialogOpen}
        newAffiliateEmail={newAffiliateEmail}
        setNewAffiliateEmail={setNewAffiliateEmail}
        handleAddAffiliate={handleAddAffiliate}
        isAddingAffiliate={isAddingAffiliate}
      />
    </CreatorLayout>
  );
}
