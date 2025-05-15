
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Affiliate } from "@/types";
import { ManageAffiliatesHeader } from "@/components/creator/manage-affiliates/ManageAffiliatesHeader";
import { InviteAffiliateForm } from "@/components/creator/manage-affiliates/InviteAffiliateForm";
import { AffiliatesListingTable } from "@/components/creator/manage-affiliates/AffiliatesListingTable";

export default function ManageAffiliates() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newAffiliateEmail, setNewAffiliateEmail] = useState("");

  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    { 
      id: "1", 
      name: "João Silva", 
      email: "joao.silva@example.com", 
      status: "active", 
      sales: 24, 
      commission: 1200.00,
      lastActivity: "Hoje",
      productCount: 5,
      avatarUrl: "/placeholder.svg"
    },
    { 
      id: "2", 
      name: "Maria Oliveira", 
      email: "maria.oliveira@example.com", 
      status: "active", 
      sales: 18, 
      commission: 850.00,
      lastActivity: "Ontem",
      productCount: 3,
      avatarUrl: "/placeholder.svg"
    },
    { 
      id: "3", 
      name: "Carlos Santos", 
      email: "carlos.santos@example.com", 
      status: "pending", 
      sales: 0, 
      commission: 0.00,
      lastActivity: "Nunca",
      productCount: 0,
      avatarUrl: "/placeholder.svg"
    },
    { 
      id: "4", 
      name: "Ana Ferreira", 
      email: "ana.ferreira@example.com", 
      status: "inactive", 
      sales: 5, 
      commission: 250.00,
      lastActivity: "2 semanas atrás",
      productCount: 1,
      avatarUrl: "/placeholder.svg"
    }
  ]);

  const filteredAffiliates = affiliates.filter(
    affiliate =>
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      id: String(affiliates.length + 1 + Date.now()),
      name: newAffiliateEmail.split('@')[0],
      email: newAffiliateEmail,
      status: "pending",
      sales: 0,
      commission: 0.00,
      lastActivity: "Nunca",
      productCount: 0,
      avatarUrl: "/placeholder.svg"
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

  const handleDeleteAffiliate = (affiliateId: string) => {
    setAffiliates(affiliates.filter(affiliate => affiliate.id !== affiliateId));
    toast({
      title: "Afiliado removido",
      description: "O afiliado foi removido com sucesso.",
      variant: "success",
    });
  };

  const handleToggleStatus = (affiliateId: string) => {
    setAffiliates(affiliates.map(affiliate => {
      if (affiliate.id === affiliateId) {
        const newStatus = affiliate.status === "active" ? "inactive" : "active";
        toast({
          title: newStatus === "active" ? "Afiliado ativado" : "Afiliado desativado",
          description: `O status do afiliado foi alterado com sucesso.`,
          variant: "success",
        });
        return { ...affiliate, status: newStatus as Affiliate['status'] };
      }
      return affiliate;
    }));
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
          <ManageAffiliatesHeader 
            onToggleInviteForm={() => setShowInviteForm(!showInviteForm)}
          />
          <CardContent className="pt-6">
            {showInviteForm && (
              <InviteAffiliateForm
                newAffiliateEmail={newAffiliateEmail}
                onNewAffiliateEmailChange={setNewAffiliateEmail}
                onInviteAffiliate={handleInviteAffiliate}
                onCancelInvite={() => setShowInviteForm(false)}
              />
            )}

            <div className="mb-4">
              <Input
                placeholder="Buscar afiliados por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md"
              />
            </div>

            <AffiliatesListingTable
              affiliates={filteredAffiliates}
              onToggleStatus={handleToggleStatus}
              onDeleteAffiliate={handleDeleteAffiliate}
              searchTerm={searchTerm}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
