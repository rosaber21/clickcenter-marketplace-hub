
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileEdit, Trash2, CheckCircle2, XCircle, ExternalLink, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "digital" | "physical" | "ebook";
  status: "approved" | "pending" | "rejected";
  affiliateCommission: number;
  creatorCommission: number;
  createdBy: string;
  createdAt: string;
}

export default function AdminProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Curso de Marketing Digital",
      description: "Aprenda estratégias avançadas de marketing para seu negócio",
      price: 149.9,
      type: "digital",
      status: "approved",
      affiliateCommission: 30,
      creatorCommission: 60,
      createdBy: "João Produtor",
      createdAt: "2025-05-01T14:23:00Z"
    },
    {
      id: "2",
      title: "E-book Gestão Financeira",
      description: "Domine suas finanças pessoais e empresariais",
      price: 29.9,
      type: "ebook",
      status: "approved",
      affiliateCommission: 40,
      creatorCommission: 50,
      createdBy: "Maria Souza",
      createdAt: "2025-05-05T09:15:00Z"
    },
    {
      id: "3",
      title: "Kit de Empreendedorismo",
      description: "Material físico com planners, guias e templates",
      price: 89.9,
      type: "physical",
      status: "pending",
      affiliateCommission: 20,
      creatorCommission: 60,
      createdBy: "Carlos Empreendedor",
      createdAt: "2025-05-10T16:30:00Z"
    }
  ]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState<"digital" | "physical" | "ebook">("digital");
  const [affiliateCommission, setAffiliateCommission] = useState("");
  const [creatorCommission, setCreatorCommission] = useState("");
  
  const handleCreateProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title,
      description,
      price: parseFloat(price),
      type: productType,
      status: "approved",
      affiliateCommission: parseFloat(affiliateCommission),
      creatorCommission: parseFloat(creatorCommission),
      createdBy: "Admin",
      createdAt: new Date().toISOString()
    };
    
    setProducts([...products, newProduct]);
    toast({
      title: "Produto criado",
      description: "O produto foi adicionado com sucesso.",
      variant: "success"
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setProductType("digital");
    setAffiliateCommission("");
    setCreatorCommission("");
  };
  
  const approveProduct = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, status: "approved" } : p
    ));
    toast({
      title: "Produto aprovado",
      description: "O produto foi aprovado com sucesso.",
      variant: "success"
    });
  };
  
  const rejectProduct = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, status: "rejected" } : p
    ));
    toast({
      title: "Produto rejeitado",
      description: "O produto foi rejeitado.",
      variant: "default"
    });
  };
  
  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído permanentemente.",
      variant: "destructive"
    });
  };
  
  // Filter products by status
  const approvedProducts = products.filter(p => p.status === "approved");
  const pendingProducts = products.filter(p => p.status === "pending");
  const rejectedProducts = products.filter(p => p.status === "rejected");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };
  
  const getProductTypeLabel = (type: "digital" | "physical" | "ebook") => {
    switch(type) {
      case "digital":
        return <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">Digital</span>;
      case "physical":
        return <span className="bg-orange-100 text-orange-800 rounded-full px-2 py-1 text-xs">Físico</span>;
      case "ebook":
        return <span className="bg-purple-100 text-purple-800 rounded-full px-2 py-1 text-xs">E-book</span>;
    }
  };
  
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Produto
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Lista de Produtos</CardTitle>
              <CardDescription>Gerencie todos os produtos disponíveis na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="approved">
                <TabsList className="mb-4">
                  <TabsTrigger value="approved">Aprovados ({approvedProducts.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pendentes ({pendingProducts.length})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejeitados ({rejectedProducts.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="approved">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Nome</th>
                          <th className="text-left py-2 font-medium">Tipo</th>
                          <th className="text-left py-2 font-medium">Preço</th>
                          <th className="text-left py-2 font-medium">Comissões</th>
                          <th className="text-left py-2 font-medium">Criador</th>
                          <th className="text-left py-2 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedProducts.map(product => (
                          <tr key={product.id} className="border-b">
                            <td className="py-3">
                              <div className="font-medium">{product.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">ID: {product.id}</div>
                            </td>
                            <td className="py-3">{getProductTypeLabel(product.type)}</td>
                            <td className="py-3">€ {product.price.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3">
                              <div className="text-xs">Afiliado: {product.affiliateCommission}%</div>
                              <div className="text-xs">Produtor: {product.creatorCommission}%</div>
                              <div className="text-xs">Plataforma: {100 - product.affiliateCommission - product.creatorCommission}%</div>
                            </td>
                            <td className="py-3">
                              <div>{product.createdBy}</div>
                              <div className="text-xs text-muted-foreground">{formatDate(product.createdAt)}</div>
                            </td>
                            <td className="py-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <FileEdit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 className="h-4 w-4" onClick={() => deleteProduct(product.id)} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="pending">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Nome</th>
                          <th className="text-left py-2 font-medium">Tipo</th>
                          <th className="text-left py-2 font-medium">Preço</th>
                          <th className="text-left py-2 font-medium">Comissões</th>
                          <th className="text-left py-2 font-medium">Criador</th>
                          <th className="text-left py-2 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingProducts.map(product => (
                          <tr key={product.id} className="border-b">
                            <td className="py-3">
                              <div className="font-medium">{product.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">ID: {product.id}</div>
                            </td>
                            <td className="py-3">{getProductTypeLabel(product.type)}</td>
                            <td className="py-3">€ {product.price.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3">
                              <div className="text-xs">Afiliado: {product.affiliateCommission}%</div>
                              <div className="text-xs">Produtor: {product.creatorCommission}%</div>
                              <div className="text-xs">Plataforma: {100 - product.affiliateCommission - product.creatorCommission}%</div>
                            </td>
                            <td className="py-3">
                              <div>{product.createdBy}</div>
                              <div className="text-xs text-muted-foreground">{formatDate(product.createdAt)}</div>
                            </td>
                            <td className="py-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => approveProduct(product.id)}>
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => rejectProduct(product.id)}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="rejected">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Nome</th>
                          <th className="text-left py-2 font-medium">Tipo</th>
                          <th className="text-left py-2 font-medium">Preço</th>
                          <th className="text-left py-2 font-medium">Comissões</th>
                          <th className="text-left py-2 font-medium">Criador</th>
                          <th className="text-left py-2 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rejectedProducts.map(product => (
                          <tr key={product.id} className="border-b">
                            <td className="py-3">
                              <div className="font-medium">{product.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">ID: {product.id}</div>
                            </td>
                            <td className="py-3">{getProductTypeLabel(product.type)}</td>
                            <td className="py-3">€ {product.price.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3">
                              <div className="text-xs">Afiliado: {product.affiliateCommission}%</div>
                              <div className="text-xs">Produtor: {product.creatorCommission}%</div>
                              <div className="text-xs">Plataforma: {100 - product.affiliateCommission - product.creatorCommission}%</div>
                            </td>
                            <td className="py-3">
                              <div>{product.createdBy}</div>
                              <div className="text-xs text-muted-foreground">{formatDate(product.createdAt)}</div>
                            </td>
                            <td className="py-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => approveProduct(product.id)}>
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 className="h-4 w-4" onClick={() => deleteProduct(product.id)} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Produto</CardTitle>
              <CardDescription>Criar um novo produto na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="title">Nome do produto</Label>
                  <Input 
                    id="title" 
                    placeholder="Ex: Curso de Marketing Digital" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input 
                    id="description" 
                    placeholder="Breve descrição do produto" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Preço (€)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="99.90" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Tipo de produto</Label>
                  <Select 
                    value={productType} 
                    onValueChange={(value) => setProductType(value as "digital" | "physical" | "ebook")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="physical">Físico</SelectItem>
                      <SelectItem value="ebook">E-book</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="affiliateCommission">Comissão do Afiliado (%)</Label>
                  <Input 
                    id="affiliateCommission" 
                    type="number" 
                    placeholder="30" 
                    value={affiliateCommission}
                    onChange={(e) => setAffiliateCommission(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="creatorCommission">Comissão do Produtor (%)</Label>
                  <Input 
                    id="creatorCommission" 
                    type="number" 
                    placeholder="60" 
                    value={creatorCommission}
                    onChange={(e) => setCreatorCommission(e.target.value)}
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="button" 
                    className="w-full" 
                    onClick={handleCreateProduct}
                    disabled={!title || !description || !price || !affiliateCommission || !creatorCommission}
                  >
                    Adicionar Produto
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
