
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminAffiliates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [processingRequests, setProcessingRequests] = useState(false);
  const { toast } = useToast();
  
  // Sample affiliate requests data
  const [affiliateRequests, setAffiliateRequests] = useState([
    {
      id: 1,
      name: "Mariana Santos",
      email: "mariana@exemplo.com",
      website: "marketingdigital.com",
      status: "Pendente",
      requestDate: "08/05/2025"
    },
    {
      id: 2,
      name: "João Oliveira",
      email: "joao@exemplo.com",
      website: "blogdevendas.pt",
      status: "Pendente",
      requestDate: "10/05/2025"
    }
  ]);

  const handleApproveRequests = () => {
    setIsDialogOpen(true);
  };

  const confirmApproveAllRequests = () => {
    setProcessingRequests(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Update status to "Aprovado"
      const updatedRequests = affiliateRequests.map(request => ({
        ...request,
        status: "Aprovado"
      }));
      
      setAffiliateRequests(updatedRequests);
      setProcessingRequests(false);
      setIsDialogOpen(false);
      
      // Show success notification
      toast({
        title: "Solicitações aprovadas",
        description: "Todas as solicitações pendentes foram aprovadas com sucesso.",
        className: "bg-green-50 border-green-200",
      });
    }, 1500);
  };

  const handleApproveIndividualRequest = (requestId) => {
    // Process individual request
    const updatedRequests = affiliateRequests.map(request => 
      request.id === requestId ? { ...request, status: "Aprovado" } : request
    );
    
    setAffiliateRequests(updatedRequests);
    
    // Show success notification
    toast({
      title: "Solicitação aprovada",
      description: "A solicitação foi aprovada com sucesso.",
      className: "bg-green-50 border-green-200",
    });
  };

  // Count pending requests
  const pendingRequestsCount = affiliateRequests.filter(req => req.status === "Pendente").length;

  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Programa de Afiliados</h1>
          <Button onClick={handleApproveRequests}>
            {pendingRequestsCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full mr-2">
                {pendingRequestsCount}
              </span>
            )}
            Aprovar Solicitações
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Lista de Afiliados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Nome</th>
                  <th className="text-left py-2 font-medium">Email</th>
                  <th className="text-left py-2 font-medium">Vendas</th>
                  <th className="text-left py-2 font-medium">Comissão Total</th>
                  <th className="text-left py-2 font-medium">Taxa</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Pedro Costa</td>
                  <td className="py-3">pedro@exemplo.com</td>
                  <td className="py-3">28</td>
                  <td className="py-3">€ 1.245,60</td>
                  <td className="py-3">15%</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Detalhes</Button>
                    <Button variant="outline" size="sm">Pagamentos</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Sofia Mendes</td>
                  <td className="py-3">sofia@exemplo.com</td>
                  <td className="py-3">42</td>
                  <td className="py-3">€ 2.180,00</td>
                  <td className="py-3">20%</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">Ativo</span>
                  </td>
                  <td className="py-3 flex space-x-2">
                    <Button variant="outline" size="sm">Detalhes</Button>
                    <Button variant="outline" size="sm">Pagamentos</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar solicitações de afiliados</DialogTitle>
            <DialogDescription>
              Revise e aprove as solicitações pendentes para o programa de afiliados.
            </DialogDescription>
          </DialogHeader>
          
          {affiliateRequests.filter(r => r.status === "Pendente").length === 0 ? (
            <div className="flex items-center justify-center p-4 text-amber-600 bg-amber-50 rounded-md">
              <span>Não há solicitações pendentes para aprovar.</span>
            </div>
          ) : (
            <div className="py-2 space-y-4 max-h-[400px] overflow-y-auto">
              {affiliateRequests
                .filter(r => r.status === "Pendente")
                .map(request => (
                  <div key={request.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{request.name}</h4>
                        <p className="text-sm text-muted-foreground">{request.email}</p>
                        <p className="text-sm">Site: {request.website}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Solicitado em: {request.requestDate}
                        </p>
                      </div>
                      {request.status === "Pendente" ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveIndividualRequest(request.id)}
                        >
                          Aprovar
                        </Button>
                      ) : (
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Aprovado
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={processingRequests}>
              Cancelar
            </Button>
            <Button 
              onClick={confirmApproveAllRequests}
              disabled={processingRequests || affiliateRequests.filter(r => r.status === "Pendente").length === 0}
            >
              {processingRequests ? "Processando..." : "Aprovar Todas"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
