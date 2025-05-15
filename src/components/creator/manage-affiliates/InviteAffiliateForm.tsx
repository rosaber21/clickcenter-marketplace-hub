
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface InviteAffiliateFormProps {
  newAffiliateEmail: string;
  onNewAffiliateEmailChange: (value: string) => void;
  onInviteAffiliate: (e: React.FormEvent) => void;
  onCancelInvite: () => void;
}

export const InviteAffiliateForm: React.FC<InviteAffiliateFormProps> = ({
  newAffiliateEmail,
  onNewAffiliateEmailChange,
  onInviteAffiliate,
  onCancelInvite,
}) => {
  return (
    <Card className="mb-6 bg-muted/20">
      <CardHeader>
        <CardTitle className="text-lg">Convidar Novo Afiliado</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onInviteAffiliate} className="flex gap-2 items-end">
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email do afiliado
            </label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={newAffiliateEmail}
              onChange={(e) => onNewAffiliateEmailChange(e.target.value)}
              required
            />
          </div>
          <Button type="submit">
            <Mail className="mr-2 h-4 w-4" />
            Enviar Convite
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancelInvite}
          >
            Cancelar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
