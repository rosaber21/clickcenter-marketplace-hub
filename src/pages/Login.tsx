
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { LoginFormValues } from "@/components/auth/UserLoginForm";
import { RegisterFormValues } from "@/components/auth/UserRegisterForm";
import { UserAuth } from "@/components/auth/UserAuth";
import { AdminLoginFormValues } from "@/components/auth/AdminLoginForm";

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
      } else if (data.email.includes("afiliado")) {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo ao painel de afiliado.",
          variant: "success",
        });
        navigate("/afiliado");
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
      
      // Default redirect for new users
      navigate("/");
    }, 1500);
  };

  const onAdminLoginSubmit = (data: AdminLoginFormValues) => {
    setIsLoading(true);
    
    // Admin credentials check
    console.log("Admin login attempt:", data);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (data.email === "rb9356670@gmail.com" && data.password === "123455") {
        toast({
          title: "Login administrativo bem-sucedido!",
          description: "Bem-vindo ao painel administrativo.",
          variant: "success",
        });
        navigate("/admin");
      } else {
        toast({
          title: "Falha no login administrativo",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <UserAuth 
                onLoginSubmit={onLoginSubmit}
                onRegisterSubmit={onRegisterSubmit}
                onAdminLoginSubmit={onAdminLoginSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
