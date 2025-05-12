
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { BarChart3, Package, Link as LinkIcon, Wallet, TrendingUp, Plus, Users, LineChart, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BarChart, LineChart as CustomLineChart } from "@/components/charts/CustomCharts";
import { AddProductDialog } from "@/components/admin/products/AddProductDialog";
import { ProductFormValues } from "@/components/admin/products/AddProductForm";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  
  // New state for Affiliate Dialog
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-primary/5">
              <CardTitle className="text-sm font-medium text-primary">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">€ {totalSales.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+12% since last month</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-secondary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-secondary/5">
              <CardTitle className="text-sm font-medium text-secondary">Active Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-secondary">
                  {activeProducts}
                </div>
                <Package className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">+3 in the last 30 days</p>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-green-500/5">
              <CardTitle className="text-sm font-medium text-green-600">Pending Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  € {pendingCommissions.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </div>
                <Wallet className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">Payment in 15 days</p>
            </CardFooter>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-md">
                <CardHeader className="bg-primary/5">
                  <CardTitle>Monthly Sales</CardTitle>
                  <CardDescription>Last 7 months performance</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <CustomLineChart 
                    data={monthlySalesData}
                    labels={monthlySalesLabels}
                    title="Sales"
                  />
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader className="bg-secondary/5">
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Sales by product</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <BarChart
                    data={productSalesData}
                    labels={productSalesLabels}
                    title="Products"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <Card className="shadow-md">
              <CardHeader className="bg-primary/5 flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-primary">My Products</CardTitle>
                  <CardDescription>Manage your digital products</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ProductsTable
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onAddProduct={handleNewProduct}
                />
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="text-primary text-sm hover:text-primary/80 transition-colors flex items-center"
                  onClick={handleViewAllProducts}
                >
                  See all products <span className="ml-1">→</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="affiliates">
            <Card className="shadow-md">
              <CardHeader className="bg-secondary/5">
                <CardTitle className="text-secondary">Affiliates</CardTitle>
                <CardDescription>Affiliate performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsTable
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onAddAffiliate={handleNewAffiliate}
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
                  onClick={handleManageAffiliates}
                >
                  <Users className="h-4 w-4" />
                  Manage Affiliates
                </Button>
              </CardFooter>
            </Card>
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
      <Dialog open={affiliateDialogOpen} onOpenChange={setAffiliateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Afiliado</DialogTitle>
            <DialogDescription>
              Envie um convite para um novo afiliado se juntar ao seu programa.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddAffiliate}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email do Afiliado</Label>
                <Input
                  id="email"
                  type="email" 
                  placeholder="email@example.com"
                  value={newAffiliateEmail}
                  onChange={(e) => setNewAffiliateEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setAffiliateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isAddingAffiliate || !newAffiliateEmail}
              >
                {isAddingAffiliate ? 'Enviando...' : 'Enviar Convite'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
