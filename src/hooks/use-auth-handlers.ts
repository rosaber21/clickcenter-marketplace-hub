
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoginFormValues } from "@/components/auth/UserLoginForm";
import { RegisterFormValues } from "@/components/auth/UserRegisterForm";
import { AdminLoginFormValues } from "@/components/auth/AdminLoginForm";

export function useAuthHandlers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onLoginSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulação de login bem-sucedido
    console.log("Login data:", data);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate based on account type
      if (data.accountType === "criador") {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo ao painel de criador.",
          variant: "success",
        });
        navigate("/criador");
      } else if (data.accountType === "afiliado") {
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
      
      if (data.email === "rb9356670@gmail.com" && data.password === "123456") {
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

  return {
    isLoading,
    onLoginSubmit,
    onRegisterSubmit,
    onAdminLoginSubmit
  };
}
