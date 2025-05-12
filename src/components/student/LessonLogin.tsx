
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const lessonLoginSchema = z.object({
  lessonCode: z.string().min(4, "Código da aula deve ter pelo menos 4 caracteres"),
  studentId: z.string().min(3, "ID do aluno deve ter pelo menos 3 caracteres"),
});

type LessonLoginValues = z.infer<typeof lessonLoginSchema>;

interface LessonLoginProps {
  onLoginSuccess?: (data: LessonLoginValues) => void;
}

export function LessonLogin({ onLoginSuccess }: LessonLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LessonLoginValues>({
    resolver: zodResolver(lessonLoginSchema),
    defaultValues: {
      lessonCode: "",
      studentId: "",
    },
  });

  const onSubmit = (data: LessonLoginValues) => {
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo à aula ${data.lessonCode}`,
        variant: "success",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login da Aula</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="lessonCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código da Aula</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o código da aula" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID do Aluno</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu ID de aluno" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <span>Entrando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn size={18} />
                <span>Entrar na Aula</span>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
