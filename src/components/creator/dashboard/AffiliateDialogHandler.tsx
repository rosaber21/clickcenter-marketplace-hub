
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const AffiliateDialogHandler = () => {
  const { toast } = useToast();
  const [affiliateDialogOpen, setAffiliateDialogOpen] = useState(false);
  const [newAffiliateEmail, setNewAffiliateEmail] = useState("");
  const [isAddingAffiliate, setIsAddingAffiliate] = useState(false);

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

  return {
    handleNewAffiliate,
    affiliateDialogOpen,
    setAffiliateDialogOpen,
    newAffiliateEmail,
    setNewAffiliateEmail,
    handleAddAffiliate,
    isAddingAffiliate
  };
};
