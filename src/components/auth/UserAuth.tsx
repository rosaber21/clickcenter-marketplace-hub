
import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserLoginForm, LoginFormValues } from "./UserLoginForm";
import { UserRegisterForm, RegisterFormValues } from "./UserRegisterForm";
import { AdminLoginForm, AdminLoginFormValues } from "./AdminLoginForm";

interface UserAuthProps {
  onLoginSubmit: (data: LoginFormValues) => void;
  onRegisterSubmit: (data: RegisterFormValues) => void;
  onAdminLoginSubmit?: (data: AdminLoginFormValues) => void;
  isLoading?: boolean;
}

export const UserAuth = ({ 
  onLoginSubmit, 
  onRegisterSubmit, 
  onAdminLoginSubmit, 
  isLoading = false 
}: UserAuthProps) => {
  const [activeTab, setActiveTab] = React.useState<string>("login");

  return (
    <Card className="border-2 max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
        <CardTitle className="text-2xl">Bem-vindo ao ClickCenter</CardTitle>
        <CardDescription>
          Entre na sua conta ou crie uma nova
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          {/* Tab de Login */}
          <TabsContent value="login">
            <UserLoginForm onSubmit={onLoginSubmit} isLoading={isLoading} />
          </TabsContent>

          {/* Tab de Registro */}
          <TabsContent value="register">
            <UserRegisterForm onSubmit={onRegisterSubmit} isLoading={isLoading} />
          </TabsContent>
          
          {/* Tab de Admin */}
          <TabsContent value="admin">
            {onAdminLoginSubmit && (
              <AdminLoginForm onSubmit={onAdminLoginSubmit} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-b-lg">
        <p className="text-xs text-muted-foreground text-center">
          Ao continuar, você concorda com os{" "}
          <Link to="/termos" className="underline text-primary">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link to="/privacidade" className="underline text-primary">
            Política de Privacidade
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
};
