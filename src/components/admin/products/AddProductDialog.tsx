
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { AddProductForm, ProductFormValues } from "./AddProductForm";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const AddProductDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isSubmitting 
}: AddProductDialogProps) => {
  
  const handleCancel = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo produto.
          </DialogDescription>
        </DialogHeader>
        
        <AddProductForm 
          onSubmit={onSubmit} 
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
