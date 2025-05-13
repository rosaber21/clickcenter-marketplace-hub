
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { AdminAuth } from "@/components/auth/AdminAuth";
import { AdminLoginFormValues } from "@/components/auth/AdminLoginForm";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onAdminLoginSubmit = (data: AdminLoginFormValues) => {
    // Admin credentials check
    if (data.email === "rb9356670@gmail.com" && data.password === "123456") {
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
      <div className="flex justify-center items-center min-h-[calc(100vh-180px)]">
        <div className="container max-w-md px-4">
          <AdminAuth onSubmit={onAdminLoginSubmit} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLogin;
