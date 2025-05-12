
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { UserAuth } from "@/components/auth/UserAuth";
import { LoginFormValues } from "@/components/auth/UserLoginForm";
import { RegisterFormValues } from "@/components/auth/UserRegisterForm";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onLoginSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulação de login bem-sucedido
    console.log("Login data:", data);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Check login role and navigate accordingly
      if (data.email.includes("admin")) {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo administrador.",
          variant: "success",
        });
        navigate("/admin");
      } else if (data.email.includes("criador")) {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo ao painel de criador.",
          variant: "success",
        });
        navigate("/criador");
      } else {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo de volta ao ClickCenter.",
          variant: "success",
        });
        navigate("/");
      }
    }, 1500);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    setIsLoading(true);
    
    // Simulação de registro bem-sucedido
    console.log("Register data:", data);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Registro bem-sucedido!",
        description: "Sua conta foi criada com sucesso.",
        variant: "success",
      });
      
      // Redirect based on role
      if (data.role === "criador") {
        navigate("/criador");
      } else if (data.role === "afiliado") {
        navigate("/afiliados");
      } else {
        navigate("/");
      }
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 py-10">
        <div className="container mx-auto px-4">
          <UserAuth 
            onLoginSubmit={onLoginSubmit} 
            onRegisterSubmit={onRegisterSubmit} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
