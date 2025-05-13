
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { useAuthHandlers } from "@/hooks/use-auth-handlers";

const Login = () => {
  const { isLoading, onLoginSubmit, onRegisterSubmit, onAdminLoginSubmit } = useAuthHandlers();

  return (
    <MainLayout>
      <AuthContainer 
        onLoginSubmit={onLoginSubmit}
        onRegisterSubmit={onRegisterSubmit}
        onAdminLoginSubmit={onAdminLoginSubmit}
        isLoading={isLoading}
      />
    </MainLayout>
  );
};

export default Login;
