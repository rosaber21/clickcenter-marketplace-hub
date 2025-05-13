
import React, { useState } from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  UserRound,
  Mail,
  Calendar,
  BarChart3,
  Shield,
  UserPlus,
  Download
} from "lucide-react";

// Mock data for members
const memberData = [
  { id: 1, nome: "João Silva", email: "joao@example.com", dataInscricao: "10/05/2023", ultimoAcesso: "12/05/2024", status: "Ativo" },
  { id: 2, nome: "Maria Souza", email: "maria@example.com", dataInscricao: "15/06/2023", ultimoAcesso: "11/05/2024", status: "Ativo" },
  { id: 3, nome: "Pedro Santos", email: "pedro@example.com", dataInscricao: "20/07/2023", ultimoAcesso: "09/05/2024", status: "Inativo" },
  { id: 4, nome: "Ana Oliveira", email: "ana@example.com", dataInscricao: "25/08/2023", ultimoAcesso: "10/05/2024", status: "Ativo" },
  { id: 5, nome: "Carlos Pereira", email: "carlos@example.com", dataInscricao: "30/09/2023", ultimoAcesso: "08/05/2024", status: "Suspenso" }
];

// Column definitions for the member table
const memberColumns = [
  { key: "nome" as const, label: "Nome" },
  { key: "email" as const, label: "Email" },
  { key: "dataInscricao" as const, label: "Data de Inscrição" },
  { key: "ultimoAcesso" as const, label: "Último Acesso" },
  { key: "status" as const, label: "Status" }
];

const Members: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados dos membros estão sendo exportados",
    });
  };
  
  const handleAddMember = () => {
    toast({
      title: "Adicionar membro",
      description: "O formulário para adicionar um novo membro será aberto",
    });
  };
  
  const handleManageRoles = () => {
    toast({
      title: "Gerenciar funções",
      description: "Configurações de funções e permissões de membros",
    });
  };
  
  return (
    <CreatorLayout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Membros</h1>
              <p className="text-muted-foreground">
                Gerencie todos os membros da sua comunidade.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={handleAddMember} className="gap-2">
                <UserPlus className="h-4 w-4" />
                Adicionar Membro
              </Button>
              <Button variant="outline" onClick={handleExportData} className="gap-2">
                <Download className="h-4 w-4" />
                Exportar Dados
              </Button>
            </div>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
                <UserRound className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">+2% desde o último mês</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Novos Membros</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+4% desde o último mês</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">Média de aberturas de emails</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs and Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Membros</CardTitle>
                  <CardDescription>
                    Visualize e gerencie todos os seus membros.
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={handleManageRoles} className="gap-2">
                  <Shield className="h-4 w-4" />
                  Gerenciar Funções
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="active">Ativos</TabsTrigger>
                  <TabsTrigger value="inactive">Inativos</TabsTrigger>
                  <TabsTrigger value="suspended">Suspensos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="w-full">
                  <DataTable 
                    data={memberData} 
                    columns={memberColumns}
                    caption="Lista de todos os membros"
                  />
                </TabsContent>
                
                <TabsContent value="active" className="w-full">
                  <DataTable 
                    data={memberData.filter(m => m.status === "Ativo")} 
                    columns={memberColumns}
                    caption="Membros ativos"
                  />
                </TabsContent>
                
                <TabsContent value="inactive" className="w-full">
                  <DataTable 
                    data={memberData.filter(m => m.status === "Inativo")} 
                    columns={memberColumns}
                    caption="Membros inativos"
                  />
                </TabsContent>
                
                <TabsContent value="suspended" className="w-full">
                  <DataTable 
                    data={memberData.filter(m => m.status === "Suspenso")} 
                    columns={memberColumns}
                    caption="Membros suspensos"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </CreatorLayout>
  );
};

export default Members;
