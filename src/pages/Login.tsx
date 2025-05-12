
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { UserAuth } from "@/components/auth/UserAuth";
import { AdminAuth } from "@/components/auth/AdminAuth";
import { LoginFormValues } from "@/components/auth/UserLoginForm";
import { RegisterFormValues } from "@/components/auth/UserRegisterForm";
import { AdminLoginFormValues } from "@/components/auth/AdminLoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onLoginSubmit = (data: LoginFormValues) => {
    // Simulação de login bem-sucedido
    console.log("Login data:", data);
    navigate("/");
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // Simulação de registro bem-sucedido
    console.log("Register data:", data);
    navigate("/");
  };

  const onAdminLoginSubmit = (data: AdminLoginFormValues) => {
    // Verificação com as credenciais de admin
    if (data.email === "rb9356670@gmail.com" && data.password === "123455") {
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao painel administrativo.",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Falha no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 py-10">
        {/* Seção do usuário */}
        <div className="container mx-auto px-4">
          <UserAuth 
            onLoginSubmit={onLoginSubmit} 
            onRegisterSubmit={onRegisterSubmit} 
          />
        </div>
        
        {/* Seção do Admin - Separada */}
        <div className="container mx-auto px-4 mt-8">
          <AdminAuth onSubmit={onAdminLoginSubmit} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
