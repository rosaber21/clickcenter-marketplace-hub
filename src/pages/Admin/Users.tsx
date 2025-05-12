
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilterIcon, PlusCircle, MoreHorizontal, UserCog, Trash2, MailCheck, ShieldCheck, ShieldX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: "active" | "blocked";
  createdAt: string;
  purchases: number;
  revenue: number;
}

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: "user-1",
      name: "João Silva",
      email: "joao.silva@exemplo.com",
      role: "aluno",
      avatar: "",
      status: "active",
      createdAt: "2025-04-15T10:30:00Z",
      purchases: 3,
      revenue: 0
    },
    {
      id: "user-2",
      name: "Maria Oliveira",
      email: "maria.oliveira@exemplo.com",
      role: "aluno",
      avatar: "",
      status: "active",
      createdAt: "2025-04-20T14:45:00Z",
      purchases: 5,
      revenue: 0
    },
    {
      id: "user-3",
      name: "Carlos Ferreira",
      email: "carlos.ferreira@exemplo.com",
      role: "criador",
      avatar: "",
      status: "active",
      createdAt: "2025-03-10T09:15:00Z",
      purchases: 1,
      revenue: 1850.50
    },
    {
      id: "user-4",
      name: "Ana Ribeiro",
      email: "ana.ribeiro@exemplo.com",
      role: "afiliado",
      avatar: "",
      status: "active",
      createdAt: "2025-03-25T16:20:00Z",
      purchases: 2,
      revenue: 328.75
    },
    {
      id: "user-5",
      name: "Paulo Santos",
      email: "paulo.santos@exemplo.com",
      role: "admin",
      avatar: "",
      status: "active",
      createdAt: "2025-02-05T11:00:00Z",
      purchases: 0,
      revenue: 0
    },
    {
      id: "user-6",
      name: "Sofia Costa",
      email: "sofia.costa@exemplo.com",
      role: "afiliado",
      avatar: "",
      status: "blocked",
      createdAt: "2025-04-05T08:10:00Z",
      purchases: 1,
      revenue: 75.40
    }
  ]);
  
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<UserRole>("aluno");
  
  const studentsCount = users.filter(u => u.role === "aluno").length;
  const creatorsCount = users.filter(u => u.role === "criador").length;
  const affiliatesCount = users.filter(u => u.role === "afiliado").length;
  const adminCount = users.filter(u => u.role === "admin").length;
  const activeUsers = users.filter(u => u.status === "active");
  const blockedUsers = users.filter(u => u.status === "blocked");
  
  const openEditUserDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsEditUserDialogOpen(true);
  };
  
  const saveUserChanges = () => {
    if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, role: newRole } : u
      ));
      
      toast({
        title: "Usuário atualizado",
        description: `A função de ${selectedUser.name} foi alterada para ${getRoleName(newRole)}.`,
        variant: "default"
      });
      
      setIsEditUserDialogOpen(false);
      setSelectedUser(null);
    }
  };
  
  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u
    ));
    
    const user = users.find(u => u.id === id);
    const newStatus = user?.status === "active" ? "blocked" : "active";
    
    toast({
      title: newStatus === "active" ? "Usuário desbloqueado" : "Usuário bloqueado",
      description: `${user?.name} foi ${newStatus === "active" ? "desbloqueado" : "bloqueado"} com sucesso.`,
      variant: newStatus === "active" ? "success" : "destructive"
    });
  };
  
  const sendVerificationEmail = (id: string) => {
    const user = users.find(u => u.id === id);
    
    toast({
      title: "Email enviado",
      description: `Um email de verificação foi enviado para ${user?.email}.`,
      variant: "default"
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };
  
  const getRoleName = (role: UserRole) => {
    switch(role) {
      case "admin": return "Administrador";
      case "criador": return "Produtor";
      case "afiliado": return "Afiliado";
      case "aluno": return "Cliente";
      default: return role;
    }
  };
  
  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case "admin":
        return <Badge className="bg-primary">Administrador</Badge>;
      case "criador":
        return <Badge className="bg-purple-600">Produtor</Badge>;
      case "afiliado":
        return <Badge className="bg-green-600">Afiliado</Badge>;
      case "aluno":
        return <Badge variant="outline">Cliente</Badge>;
    }
  };
  
  const getAvatarFallback = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };
  
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar usuários..." className="pl-9 min-w-[250px]" />
            </div>
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Usuário
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentsCount}</div>
              <p className="text-xs text-muted-foreground">+{studentsCount > 10 ? studentsCount - 10 : 0} nos últimos 30 dias</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Produtores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{creatorsCount}</div>
              <p className="text-xs text-muted-foreground">+{creatorsCount > 2 ? creatorsCount - 2 : 0} nos últimos 30 dias</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Afiliados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliatesCount}</div>
              <p className="text-xs text-muted-foreground">+{affiliatesCount > 1 ? affiliatesCount - 1 : 0} nos últimos 30 dias</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminCount}</div>
              <p className="text-xs text-muted-foreground">Contas com acesso privilegiado</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>Gerencie todos os usuários da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-6">
                <TabsTrigger value="active">Ativos ({activeUsers.length})</TabsTrigger>
                <TabsTrigger value="blocked">Bloqueados ({blockedUsers.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Usuário</th>
                        <th className="text-left py-2 font-medium">Função</th>
                        <th className="text-left py-2 font-medium">Cadastro</th>
                        <th className="text-left py-2 font-medium">Compras</th>
                        <th className="text-left py-2 font-medium">Ganhos</th>
                        <th className="text-left py-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeUsers.map(user => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">{getRoleBadge(user.role)}</td>
                          <td className="py-3">{formatDate(user.createdAt)}</td>
                          <td className="py-3">{user.purchases}</td>
                          <td className="py-3">
                            {user.revenue > 0 ? `€ ${user.revenue.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` : "-"}
                          </td>
                          <td className="py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditUserDialog(user)}>
                                  <UserCog className="h-4 w-4 mr-2" />
                                  <span>Alterar Função</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                                  <ShieldX className="h-4 w-4 mr-2" />
                                  <span>Bloquear</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => sendVerificationEmail(user.id)}>
                                  <MailCheck className="h-4 w-4 mr-2" />
                                  <span>Enviar Verificação</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="blocked">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Usuário</th>
                        <th className="text-left py-2 font-medium">Função</th>
                        <th className="text-left py-2 font-medium">Cadastro</th>
                        <th className="text-left py-2 font-medium">Compras</th>
                        <th className="text-left py-2 font-medium">Ganhos</th>
                        <th className="text-left py-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blockedUsers.map(user => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">{getRoleBadge(user.role)}</td>
                          <td className="py-3">{formatDate(user.createdAt)}</td>
                          <td className="py-3">{user.purchases}</td>
                          <td className="py-3">
                            {user.revenue > 0 ? `€ ${user.revenue.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` : "-"}
                          </td>
                          <td className="py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  <span>Desbloquear</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  <span>Excluir</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
      </div>
      
      {/* Dialog for Editing User */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Função de Usuário</DialogTitle>
            <DialogDescription>
              Atualize o nível de acesso para este usuário.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{getAvatarFallback(selectedUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-role">Função Atual</Label>
                  <Input id="current-role" value={getRoleName(selectedUser.role)} disabled className="bg-muted" />
                </div>
                
                <div>
                  <Label htmlFor="new-role">Nova Função</Label>
                  <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
                    <SelectTrigger id="new-role">
                      <SelectValue placeholder="Selecione uma função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluno">Cliente</SelectItem>
                      <SelectItem value="afiliado">Afiliado</SelectItem>
                      <SelectItem value="criador">Produtor</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveUserChanges}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
