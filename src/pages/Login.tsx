
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { UserAuth } from "@/components/auth/UserAuth";
import { LoginFormValues } from "@/components/auth/UserLoginForm";
import { RegisterFormValues } from "@/components/auth/UserRegisterForm";

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
      </div>
    </MainLayout>
  );
};

export default Login;
