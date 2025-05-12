
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AddProductDialog } from "@/components/admin/products/AddProductDialog";
import { ProductFormValues } from "@/components/admin/products/AddProductForm";

// Import the new components
import { StatsCards } from "@/components/creator/dashboard/StatsCards";
import { OverviewTab } from "@/components/creator/dashboard/OverviewTab";
import { ProductsTab } from "@/components/creator/dashboard/ProductsTab";
import { AffiliatesTab } from "@/components/creator/dashboard/AffiliatesTab";
import { AffiliateDialog } from "@/components/creator/dashboard/AffiliateDialog";

export default function CreatorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [totalSales, setTotalSales] = useState(7829.45);
  const [activeProducts, setActiveProducts] = useState(12);
  const [pendingCommissions, setPendingCommissions] = useState(1245.50);
  
  // State for Product Dialog
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for Affiliate Dialog
  const [affiliateDialogOpen, setAffiliateDialogOpen] = useState(false);
  const [newAffiliateEmail, setNewAffiliateEmail] = useState("");
  const [isAddingAffiliate, setIsAddingAffiliate] = useState(false);
  
  const [products, setProducts] = useState([
    {
      name: "Digital Marketing Course",
      creator: "You",
      category: "Marketing",
      price: "€ 149,90",
      status: "Ativo" as const
    },
    {
      name: "Financial Management E-book",
      creator: "You",
      category: "Finance",
      price: "€ 29,90",
      status: "Ativo" as const
    },
    {
      name: "Business Consulting",
      creator: "You",
      category: "Consulting",
      price: "€ 399,00",
      status: "Pendente" as const
    }
  ]);
  
  // Mock data for charts
  const monthlySalesData = [5430, 4290, 6540, 7829, 8210, 7450, 7829];
  const monthlySalesLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  
  const productSalesData = [32, 68, 7, 41, 25];
  const productSalesLabels = ["Marketing Digital", "E-book Finance", "Business Consulting", "Templates", "Course XYZ"];

  // Action handlers
  const handleNewProduct = () => {
    setProductDialogOpen(true);
  };

  const handleAddProduct = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add the new product
    const newProduct = {
      name: values.name,
      creator: "You",
      category: values.category,
      price: `€ ${values.price}`,
      status: "Pendente" as const
    };
    
    setProducts([...products, newProduct]);
    
    toast({
      title: "Produto adicionado com sucesso!",
      description: "Seu novo produto está aguardando aprovação.",
      variant: "success",
    });
    
    setIsSubmitting(false);
    setProductDialogOpen(false);
  };
  
  // New affiliate handlers
  const handleNewAffiliate = () => {
    setAffiliateDialogOpen(true);
  };
  
  const handleAddAffiliate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAffiliateEmail.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAddingAffiliate(true);
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Convite enviado com sucesso!",
      description: `Um convite foi enviado para ${newAffiliateEmail}`,
      variant: "success",
    });
    
    setIsAddingAffiliate(false);
    setAffiliateDialogOpen(false);
    setNewAffiliateEmail("");
  };

  const handleViewAllProducts = () => {
    toast({
      title: "All Products",
      description: "Redirecting to products page",
      variant: "default",
    });
    navigate("/meus-produtos");
  };

  const handleManageAffiliates = () => {
    toast({
      title: "Manage Affiliates",
      description: "Redirecting to affiliates management page",
      variant: "default", 
    });
    navigate("/gerenciar-afiliados");
  };

  const handleEditProduct = (product: any) => {
    toast({
      title: "Edit Product",
      description: "Editing product details",
      variant: "default",
    });
  };

  const handleDeleteProduct = (product: any) => {
    toast({
      title: "Delete Product",
      description: "Are you sure you want to delete this product?",
      variant: "destructive",
    });
  };

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
              onAddProduct={handleNewProduct}
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
      <AddProductDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        onSubmit={handleAddProduct}
        isSubmitting={isSubmitting}
      />
      
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
