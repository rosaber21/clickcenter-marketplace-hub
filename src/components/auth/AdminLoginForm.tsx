
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn, ShieldAlert } from "lucide-react";

// Admin login schema validation
const adminLoginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

interface AdminLoginFormProps {
  onSubmit: (data: AdminLoginFormValues) => void;
}

export const AdminLoginForm = ({ onSubmit }: AdminLoginFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-secondary/10 p-3 rounded-md mb-4 border border-secondary/20">
          <p className="text-sm text-center text-secondary flex items-center justify-center gap-2">
            <ShieldAlert size={16} />
            <span>Área restrita para administradores</span>
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email Admin</FormLabel>
              <FormControl>
                <Input 
                  placeholder="admin@exemplo.com" 
                  {...field} 
                  className="bg-slate-50 focus:bg-white" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Senha Admin</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="********" 
                    {...field} 
                    className="bg-slate-50 focus:bg-white pr-10" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary/80 transition-all duration-200 font-medium py-2 mt-2"
        >
          <div className="flex items-center gap-2">
            <LogIn size={18} />
            <span>Acessar Painel Administrativo</span>
          </div>
        </Button>
      </form>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Utilize as credenciais fornecidas pelo administrador do sistema</p>
        <p className="mt-1">Email: rb9356670@gmail.com / Senha: 123455</p>
      </div>
    </Form>
  );
};
