
import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(4, { message: "Assunto é obrigatório" }),
  message: z.string().min(10, { message: "Mensagem muito curta" })
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      toast({
        title: "Mensagem enviada",
        description: "Agradecemos seu contato. Responderemos em breve.",
      });
      
      // Reset form
      reset();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um problema. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Entre em Contato</h1>
        <p className="mt-2 text-muted-foreground">
          Estamos aqui para ajudar. Envie-nos uma mensagem e responderemos o mais breve possível.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Contact information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
            <p className="text-muted-foreground mb-6">
              Tire suas dúvidas sobre produtos, afiliação ou qualquer outro assunto.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">contato@clickcenter.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Telefone</p>
                <p className="text-sm text-muted-foreground">(11) 9999-9999</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Endereço</p>
                <p className="text-sm text-muted-foreground">
                  Av. Paulista, 1000 - São Paulo, SP
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Horário de Atendimento</h3>
            <p className="text-sm text-muted-foreground mb-2">Segunda à Sexta: 9h às 18h</p>
            <p className="text-sm text-muted-foreground">Sábados: 9h às 13h</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Envie uma Mensagem</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nome Completo
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Seu nome"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="seu.email@exemplo.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="subject" className="text-sm font-medium">
                Assunto
              </label>
              <input
                {...register("subject")}
                type="text"
                id="subject"
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Sobre o que você deseja falar?"
              />
              {errors.subject && (
                <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Digite sua mensagem aqui..."
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
