
import React from "react";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { useAuthHandlers } from "@/hooks/use-auth-handlers";

const Login = () => {
  const { isLoading, onLoginSubmit, onRegisterSubmit, onAdminLoginSubmit } = useAuthHandlers();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex justify-center items-center min-h-[calc(100vh-40px)] py-10">
        <AuthContainer 
          onLoginSubmit={onLoginSubmit}
          onRegisterSubmit={onRegisterSubmit}
          onAdminLoginSubmit={onAdminLoginSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Login;
