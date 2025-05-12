
import React, { useState } from "react";
import { CheckCircle2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentItem {
  id: number;
  name: string;
  type: string;
  method: string;
  amount: string;
  requestDate: string;
  status: string;
}

interface PaymentsTableProps {
  payments: PaymentItem[];
  onApprovePayment: (paymentId: number) => void;
}

const ITEMS_PER_PAGE = 5;

export function PaymentsTable({ payments, onApprovePayment }: PaymentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Filter payments based on selected status
  const filteredPayments = statusFilter === "all" 
    ? payments 
    : payments.filter(payment => payment.status === statusFilter);
  
  // Calculate pagination values
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);
  
  // Reset to first page when filter changes
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page and neighbors, and last page
      if (currentPage <= 2) {
        // Near beginning
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        // Near end
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push("ellipsis");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <CardContent>
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Processado">Processado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium">Destinatário</th>
            <th className="text-left py-2 font-medium">Tipo</th>
            <th className="text-left py-2 font-medium">Método</th>
            <th className="text-left py-2 font-medium">Valor</th>
            <th className="text-left py-2 font-medium">Data de Solicitação</th>
            <th className="text-left py-2 font-medium">Status</th>
            <th className="text-left py-2 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentPayments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="py-3">{payment.name}</td>
              <td className="py-3">{payment.type}</td>
              <td className="py-3">{payment.method}</td>
              <td className="py-3">{payment.amount}</td>
              <td className="py-3">{payment.requestDate}</td>
              <td className="py-3">
                <span className={`rounded-full px-2 py-1 text-xs ${
                  payment.status === "Pendente" 
                    ? "bg-amber-100 text-amber-800" 
                    : "bg-green-100 text-green-800"
                }`}>
                  {payment.status}
                </span>
              </td>
              <td className="py-3">
                {payment.status === "Pendente" ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onApprovePayment(payment.id)}
                  >
                    Aprovar
                  </Button>
                ) : (
                  <span className="flex items-center text-green-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Aprovado
                  </span>
                )}
              </td>
            </tr>
          ))}
          
          {currentPayments.length === 0 && (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                {filteredPayments.length === 0 ? 
                  "Não há pagamentos correspondentes aos filtros aplicados." : 
                  "Não há pagamentos pendentes no momento."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {filteredPayments.length > ITEMS_PER_PAGE && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  href="#"
                />
              </PaginationItem>
              
              {getPageNumbers().map((page, index) => (
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(Number(page))}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </CardContent>
  );
}
