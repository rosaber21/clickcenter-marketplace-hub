
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const handleSendSupport = () => {
    if (!supportMessage.trim()) return;
    
    setIsSending(true);
    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      setSupportMessage("");
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsOpen(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Suporte</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-4">
        <p className="text-sm text-muted-foreground mb-4">
          Precisa de ajuda? Nossa equipe está pronta para te ajudar.
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" /> Falar com Suporte
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Suporte ao Aluno</DialogTitle>
              <DialogDescription>
                Descreva sua dúvida ou problema e nossa equipe responderá em breve.
              </DialogDescription>
            </DialogHeader>
            
            {showSuccessMessage ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 my-4 flex">
                <div className="flex-1">
                  Sua mensagem foi enviada! Retornaremos em breve.
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-5 w-5 rounded-full p-0 text-green-700"
                  onClick={() => setShowSuccessMessage(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <>
                <Textarea
                  placeholder="Detalhe sua dúvida ou problema aqui..."
                  className="min-h-32"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSendSupport}
                    disabled={!supportMessage.trim() || isSending}
                  >
                    {isSending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Enviar
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="pt-0 justify-center">
        <p className="text-xs text-muted-foreground">
          Tempo médio de resposta: 30 minutos
        </p>
      </CardFooter>
    </Card>
  );
}
