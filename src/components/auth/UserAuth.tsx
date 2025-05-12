
import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserLoginForm, LoginFormValues } from "./UserLoginForm";
import { UserRegisterForm, RegisterFormValues } from "./UserRegisterForm";

interface UserAuthProps {
  onLoginSubmit: (data: LoginFormValues) => void;
  onRegisterSubmit: (data: RegisterFormValues) => void;
}

export const UserAuth = ({ onLoginSubmit, onRegisterSubmit }: UserAuthProps) => {
  const [activeTab, setActiveTab] = React.useState<string>("login");

  return (
    <Card className="border-2 max-w-2xl mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Bem-vindo ao ClickCenter</CardTitle>
        <CardDescription>
          Entre na sua conta ou crie uma nova
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          {/* Tab de Login */}
          <TabsContent value="login">
            <UserLoginForm onSubmit={onLoginSubmit} />
          </TabsContent>

          {/* Tab de Registro */}
          <TabsContent value="register">
            <UserRegisterForm onSubmit={onRegisterSubmit} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-xs text-muted-foreground text-center">
          Ao continuar, você concorda com os{" "}
          <Link to="/termos" className="underline">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link to="/privacidade" className="underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
};
