
import React from "react";
import { UserAuth } from "@/components/auth/UserAuth";
import { LoginFormValues } from "@/components/auth/UserLoginForm";
import { RegisterFormValues } from "@/components/auth/UserRegisterForm";
import { AdminLoginFormValues } from "@/components/auth/AdminLoginForm";

interface AuthContainerProps {
  onLoginSubmit: (data: LoginFormValues) => void;
  onRegisterSubmit: (data: RegisterFormValues) => void;
  onAdminLoginSubmit: (data: AdminLoginFormValues) => void;
  isLoading: boolean;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  onLoginSubmit,
  onRegisterSubmit,
  onAdminLoginSubmit,
  isLoading
}) => {
  return (
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
  );
};
