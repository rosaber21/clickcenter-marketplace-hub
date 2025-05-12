
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
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
      
      // Redirect based on role
      if (data.role === "criador") {
        navigate("/criador");
      } else if (data.role === "afiliado") {
        navigate("/afiliado");
      } else {
        navigate("/");
      }
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="max-w-lg w-full space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold mt-6">Bem-vindo ao ClickCenter</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Entre na sua conta ou crie uma nova para acessar nossa plataforma
                </p>
              </div>
              
              <div className="mt-8 border-2 rounded-md p-6 bg-white shadow-md">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium">Login Rápido</h2>
                  <p className="text-sm text-gray-500">Para demonstração, use os emails abaixo:</p>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => onLoginSubmit({email: "admin@example.com", password: "123455"})}
                    className="w-full py-2 px-4 border border-purple-500 rounded-md text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Entrar como Administrador
                  </button>
                  
                  <button 
                    onClick={() => onLoginSubmit({email: "criador@example.com", password: "123455"})}
                    className="w-full py-2 px-4 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Entrar como Criador
                  </button>
                  
                  <button 
                    onClick={() => onLoginSubmit({email: "afiliado@example.com", password: "123455"})}
                    className="w-full py-2 px-4 border border-green-500 rounded-md text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Entrar como Afiliado
                  </button>
                  
                  <button 
                    onClick={() => onLoginSubmit({email: "cliente@example.com", password: "123455"})}
                    className="w-full py-2 px-4 border border-gray-500 rounded-md text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Entrar como Cliente
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Não precisa preencher campos, apenas clique nos botões acima.
                  </p>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Ao continuar, você concorda com os <a href="/termos" className="text-primary hover:underline">Termos de Serviço</a> e <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
