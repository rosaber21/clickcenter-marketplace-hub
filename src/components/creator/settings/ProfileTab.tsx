
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const ProfileTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
          <CardDescription>
            Esta imagem aparecerá na sua página de perfil e em comentários
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-start">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="Foto de perfil" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button type="button" variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Fazer upload
            </Button>
            <p className="text-sm text-muted-foreground">
              JPG, GIF ou PNG. Tamanho máximo de 2MB.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize seus dados pessoais e informações públicas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="João Paulo Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input id="username" defaultValue="joaosilva" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="joao.silva@exemplo.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea 
              id="bio" 
              placeholder="Escreva uma breve descrição sobre você"
              className="min-h-[120px]"
              defaultValue="Produtor de conteúdo digital e empreendedor, especializado em desenvolvimento pessoal e marketing digital."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
