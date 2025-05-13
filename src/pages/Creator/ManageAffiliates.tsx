
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, ArrowLeft, UserPlus, Mail, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Affiliate {
  id: number;
  name: string;
  email: string;
  status: "active" | "pending" | "inactive";
  sales: number;
  commission: string;
  lastActive: string;
}

export default function ManageAffiliates() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newAffiliateEmail, setNewAffiliateEmail] = useState("");
  
  // Sample affiliate data
  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    { 
      id: 1, 
      name: "João Silva", 
      email: "joao.silva@example.com", 
      status: "active", 
      sales: 24, 
      commission: "R$ 1.200,00",
      lastActive: "Hoje"
    },
    { 
      id: 2, 
      name: "Maria Oliveira", 
      email: "maria.oliveira@example.com", 
      status: "active", 
      sales: 18, 
      commission: "R$ 850,00",
      lastActive: "Ontem"
    },
    { 
      id: 3, 
      name: "Carlos Santos", 
      email: "carlos.santos@example.com", 
      status: "pending", 
      sales: 0, 
      commission: "R$ 0,00",
      lastActive: "Nunca"
    },
    { 
      id: 4, 
      name: "Ana Ferreira", 
      email: "ana.ferreira@example.com", 
      status: "inactive", 
      sales: 5, 
      commission: "R$ 250,00",
      lastActive: "2 semanas atrás"
    }
  ]);
  
  // Filter affiliates based on search term
  const filteredAffiliates = affiliates.filter(
    affiliate => 
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle sending an invitation to a new affiliate
  const handleInviteAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAffiliateEmail.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    
    const newAffiliate: Affiliate = {
      id: affiliates.length + 1,
      name: newAffiliateEmail.split('@')[0], // Temporary name from email
      email: newAffiliateEmail,
      status: "pending",
      sales: 0,
      commission: "R$ 0,00",
      lastActive: "Nunca"
    };
    
    setAffiliates([...affiliates, newAffiliate]);
    setNewAffiliateEmail("");
    setShowInviteForm(false);
    
    toast({
      title: "Convite enviado com sucesso!",
      description: `Um convite foi enviado para ${newAffiliateEmail}`,
      variant: "success",
    });
  };
  
  // Handle deleting an affiliate
  const handleDeleteAffiliate = (affiliateId: number) => {
    setAffiliates(affiliates.filter(affiliate => affiliate.id !== affiliateId));
    
    toast({
      title: "Afiliado removido",
      description: "O afiliado foi removido com sucesso.",
      variant: "success",
    });
  };
  
  // Handle changing affiliate status
  const handleToggleStatus = (affiliateId: number) => {
    setAffiliates(affiliates.map(affiliate => {
      if (affiliate.id === affiliateId) {
        const newStatus = affiliate.status === "active" ? "inactive" : "active";
        
        toast({
          title: newStatus === "active" ? "Afiliado ativado" : "Afiliado desativado",
          description: `O status do afiliado foi alterado com sucesso.`,
          variant: "success",
        });
        
        return { ...affiliate, status: newStatus };
      }
      return affiliate;
    }));
  };
  
  // Helper to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inativo</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/criador")} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Dashboard
        </Button>
        
        <Card className="shadow-md">
          <CardHeader className="bg-secondary/5">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <CardTitle className="text-secondary">Gerenciar Afiliados</CardTitle>
                <CardDescription>Gerencie seus afiliados e convites</CardDescription>
              </div>
              <Button onClick={() => setShowInviteForm(!showInviteForm)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Convidar Afiliado
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Invite form */}
            {showInviteForm && (
              <Card className="mb-6 bg-muted/20">
                <CardHeader>
                  <CardTitle className="text-lg">Convidar Novo Afiliado</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInviteAffiliate} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email do afiliado
                      </label>
                      <Input
                        id="email"
                        type="email" 
                        placeholder="email@example.com"
                        value={newAffiliateEmail}
                        onChange={(e) => setNewAffiliateEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit">
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar Convite
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowInviteForm(false)}
                    >
                      Cancelar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Search and filter */}
            <div className="mb-4">
              <Input
                placeholder="Buscar afiliados por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md"
              />
            </div>
            
            {/* Affiliates table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vendas</TableHead>
                  <TableHead>Comissões</TableHead>
                  <TableHead>Última atividade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAffiliates.length > 0 ? (
                  filteredAffiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell className="font-medium">{affiliate.name}</TableCell>
                      <TableCell>{affiliate.email}</TableCell>
                      <TableCell>{renderStatusBadge(affiliate.status)}</TableCell>
                      <TableCell>{affiliate.sales}</TableCell>
                      <TableCell>{affiliate.commission}</TableCell>
                      <TableCell>{affiliate.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {affiliate.status !== "pending" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleStatus(affiliate.id)}
                              className={affiliate.status === "active" ? "text-red-500" : "text-green-500"}
                            >
                              {affiliate.status === "active" ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteAffiliate(affiliate.id)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "Nenhum afiliado encontrado com esses termos." : "Você ainda não possui nenhum afiliado."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
