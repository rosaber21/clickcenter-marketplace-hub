
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Save } from "lucide-react"; // Adicionado Save icon

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    name: "Administrador ClickCenter",
    email: "admin@clickcenter.com",
    username: "admin_clickcenter",
    avatarUrl: "",
    initials: "AD",
  });
  const [isSaving, setIsSaving] = useState(false);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        // Futuramente, aqui também atualizaria adminData.avatarUrl após o upload bem-sucedido
      };
      reader.readAsDataURL(file);
      // Aqui, futuramente, adicionaremos a lógica para fazer upload para o Supabase
      // e então atualizar setAdminData com a nova avatarUrl.
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAdminData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Salvando dados:", adminData);
    // Aqui, futuramente, adicionaremos a lógica para salvar os dados no backend (Supabase)
    // Por exemplo:
    // const { data, error } = await supabase.from('admin_profiles').update({ ... }).eq('id', adminProfileId);
    // if (error) console.error("Erro ao salvar:", error);
    // else console.log("Dados salvos:", data);
    
    // Simular uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    console.log("Dados do perfil salvos (simulado):", adminData);
    // Se houver um arquivo selecionado para o avatar, faria o upload aqui também
    if (selectedFile) {
      console.log("Fazendo upload do avatar (simulado):", selectedFile.name);
      // Lógica de upload do avatar aqui...
      // Após o upload, atualize adminData.avatarUrl com a URL retornada pelo Supabase Storage
    }
    setIsSaving(false);
    // Idealmente, mostrar um toast de sucesso/erro aqui.
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
                Seus dados de administrador. Modifique e salve abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" value={adminData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input id="username" value={adminData.username} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={adminData.email} onChange={handleInputChange} />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
