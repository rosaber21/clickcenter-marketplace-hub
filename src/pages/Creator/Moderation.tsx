
import React, { useState } from 'react';
import { CreatorLayout } from '@/components/creator/layout/CreatorLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";

const Moderation = () => {
  const [activeTab, setActiveTab] = useState("comments");
  
  // Mock data for comments
  const comments = [
    { id: 1, author: "Carlos Silva", content: "Excelente curso!", date: "2025-05-10", status: "approved" },
    { id: 2, author: "Ana Maria", content: "Preciso de ajuda com o módulo 3", date: "2025-05-09", status: "pending" },
    { id: 3, author: "João Pereira", content: "Estou tendo problemas para acessar o material", date: "2025-05-08", status: "pending" },
    { id: 4, author: "Fernanda Costa", content: "Ótimo conteúdo!", date: "2025-05-07", status: "approved" }
  ];
  
  // Mock data for users
  const users = [
    { id: 1, name: "Carlos Silva", email: "carlos@example.com", warnings: 0, status: "active" },
    { id: 2, name: "Ana Maria", email: "ana@example.com", warnings: 1, status: "active" },
    { id: 3, name: "João Pereira", email: "joao@example.com", warnings: 2, status: "warning" },
    { id: 4, name: "Fernanda Costa", email: "fernanda@example.com", warnings: 0, status: "active" }
  ];
  
  return (
    <CreatorLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Moderação</h1>
            <p className="text-muted-foreground">
              Gerencie comentários e usuários na sua comunidade
            </p>
          </div>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Configurar regras
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de comentários</CardTitle>
              <CardDescription>Pendentes para revisão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <div className="text-xs text-muted-foreground">
                <span className="text-rose-500 font-medium">12</span> pendentes de revisão
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Alertas de moderação</CardTitle>
              <CardDescription>Últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-medium">-2</span> comparado a ontem
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Usuários com avisos</CardTitle>
              <CardDescription>Necessitam verificação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-medium">0</span> avisos críticos
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="comments">
              <MessageSquare className="h-4 w-4 mr-2" />
              Comentários
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="rules">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Regras
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comentários para moderação</CardTitle>
                <CardDescription>
                  Revise e aprove ou rejeite comentários de seus alunos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.date}</p>
                        </div>
                        {comment.status === "approved" ? (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Aprovado
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                            Pendente
                          </span>
                        )}
                      </div>
                      <p className="text-sm mb-2">{comment.content}</p>
                      {comment.status === "pending" && (
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">Rejeitar</Button>
                          <Button size="sm">Aprovar</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de usuários</CardTitle>
                <CardDescription>
                  Monitore a atividade e aplique ações de moderação quando necessário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        {user.status === "warning" ? (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                            Alerta
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Ativo
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {user.warnings} avisos
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Enviar aviso</Button>
                          <Button variant="destructive" size="sm">Suspender</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Regras de moderação</CardTitle>
                <CardDescription>
                  Configure as regras automáticas de moderação para sua comunidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Palavras bloqueadas</h3>
                      <p className="text-sm text-muted-foreground">
                        Bloquear comentários com palavras inapropriadas
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Aprovação manual</h3>
                      <p className="text-sm text-muted-foreground">
                        Todos os comentários requerem aprovação
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Sistema de avisos</h3>
                      <p className="text-sm text-muted-foreground">
                        Configurar ações após múltiplos avisos
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
};

export default Moderation;
