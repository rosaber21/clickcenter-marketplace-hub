
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useAffiliateActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleViewAffiliate = (affiliate: string) => {
    toast({
      title: "Visualizando afiliado",
      description: `Detalhes do afiliado ${affiliate}`,
      variant: "success",
    });
    navigate(`/criador/afiliados/${affiliate.toLowerCase().replace(/\s+/g, '-')}`);
  };
  
  const handleViewAllAffiliates = () => {
    toast({
      title: "Todos os afiliados",
      description: "Visualizando lista completa de afiliados",
      variant: "success",
    });
    navigate("/criador/afiliados");
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "Gerando relatório",
      description: "O relatório de desempenho de afiliados está sendo gerado",
      variant: "success",
    });
    
    // Simulate report download
    setTimeout(() => {
      toast({
        title: "Relatório pronto",
        description: "O relatório foi gerado com sucesso",
        variant: "success",
      });
    }, 2000);
  };
  
  const handleManageAffiliates = () => {
    toast({
      title: "Gerenciando afiliados",
      description: "Redirecionando para a página de gerenciamento de afiliados",
      variant: "success",
    });
    navigate("/criador/gerenciar-afiliados");
  };
  
  return {
    handleViewAffiliate,
    handleViewAllAffiliates,
    handleGenerateReport,
    handleManageAffiliates
  };
};
