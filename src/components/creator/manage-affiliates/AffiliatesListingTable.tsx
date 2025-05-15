
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { Affiliate } from "@/types";
import { Badge } from "@/components/ui/badge";

interface AffiliatesListingTableProps {
  affiliates: Affiliate[];
  onToggleStatus: (affiliateId: string) => void;
  onDeleteAffiliate: (affiliateId: string) => void;
  searchTerm: string;
}

export const AffiliatesListingTable: React.FC<AffiliatesListingTableProps> = ({
  affiliates,
  onToggleStatus,
  onDeleteAffiliate,
  searchTerm,
}) => {
  const renderStatusBadge = (status: Affiliate['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inativo</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspenso</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Vendas</TableHead>
          <TableHead>Comissões</TableHead>
          <TableHead>Última atividade</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {affiliates.length > 0 ? (
          affiliates.map((affiliate) => (
            <TableRow key={affiliate.id}>
              <TableCell className="font-medium">{affiliate.name}</TableCell>
              <TableCell>{affiliate.email}</TableCell>
              <TableCell>{renderStatusBadge(affiliate.status)}</TableCell>
              <TableCell>{affiliate.sales}</TableCell>
              <TableCell>
                {affiliate.commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableCell>
              <TableCell>{affiliate.lastActivity}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {affiliate.status !== "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus(affiliate.id)}
                      className={affiliate.status === "active" ? "text-red-500" : "text-green-500"}
                    >
                      {affiliate.status === "active" ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteAffiliate(affiliate.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              {searchTerm ? "Nenhum afiliado encontrado com esses termos." : "Você ainda não possui nenhum afiliado."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
