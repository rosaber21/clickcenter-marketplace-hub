
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, User } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  const usersData = [
    { id: 1, name: "João Silva", email: "joao@example.com", role: "customer", status: "active", dateJoined: "10/01/2025" },
    { id: 2, name: "Maria Souza", email: "maria@example.com", role: "affiliate", status: "active", dateJoined: "15/01/2025" },
    { id: 3, name: "Pedro Santos", email: "pedro@example.com", role: "creator", status: "active", dateJoined: "22/02/2025" },
    { id: 4, name: "Ana Oliveira", email: "ana@example.com", role: "customer", status: "inactive", dateJoined: "05/03/2025" },
    { id: 5, name: "Lucas Costa", email: "lucas@example.com", role: "admin", status: "active", dateJoined: "01/12/2024" },
    { id: 6, name: "Carla Mendes", email: "carla@example.com", role: "affiliate", status: "active", dateJoined: "18/03/2025" },
    { id: 7, name: "Roberto Alves", email: "roberto@example.com", role: "customer", status: "active", dateJoined: "25/03/2025" },
    { id: 8, name: "Juliana Lima", email: "juliana@example.com", role: "creator", status: "inactive", dateJoined: "02/04/2025" },
  ];
  
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "creator":
        return <Badge className="bg-blue-500">Criador</Badge>;
      case "affiliate":
        return <Badge variant="outline" className="border-green-500 text-green-500">Afiliado</Badge>;
      case "customer":
        return <Badge variant="outline" className="border-gray-500 text-gray-500">Cliente</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="border-green-500 text-green-500">Ativo</Badge>;
      case "inactive":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Inativo</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Usuários</h1>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Adicionar Usuário</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Gerenciar Usuários
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome ou email..." 
                  className="pl-9 w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos tipos</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="creator">Criador</SelectItem>
                  <SelectItem value="affiliate">Afiliado</SelectItem>
                  <SelectItem value="customer">Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.dateJoined}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Ações
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar Usuário</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-amber-500">Alterar Tipo</DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-amber-500">Desativar</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-500">Ativar</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
