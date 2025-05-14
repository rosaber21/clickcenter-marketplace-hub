
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react"; // User icon removido pois não estava sendo usado aqui

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    name: "Administrador ClickCenter",
    email: "admin@clickcenter.com",
    username: "admin_clickcenter",
    avatarUrl: "", // Deixe em branco ou use um placeholder se não houver imagem
    initials: "AD",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(adminData.avatarUrl || "https://github.com/shadcn.png");

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("Arquivo selecionado:", file);
      // Gerar URL de pré-visualização
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Aqui, futuramente, adicionaremos a lógica para fazer upload para o Supabase
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Perfil do Administrador</h1>
        <p className="text-muted-foreground">
          Veja e gerencie suas informações pessoais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>
                Esta imagem aparecerá no seu perfil.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage src={previewUrl || "https://github.com/shadcn.png"} alt="Foto de perfil do Admin" />
                <AvatarFallback>{adminData.initials}</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
                style={{ display: 'none' }}
              />
              <div className="space-y-2 text-center">
                <Button type="button" variant="outline" onClick={handleAvatarClick}>
                  <Upload className="mr-2 h-4 w-4" /> Fazer upload
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, GIF ou PNG. Tamanho máximo de 2MB.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Seus dados de administrador.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue={adminData.name} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input id="username" defaultValue={adminData.username} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={adminData.email} readOnly />
              </div>
              {/* Poderíamos adicionar mais campos aqui, como telefone, etc. */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
