
import React, { useRef } from "react";
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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogFooter
} from "@/components/ui/dialog";
import { Upload, Image as ImageIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const productSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  price: z.string().refine(val => !isNaN(parseFloat(val)), {
    message: "Por favor, insira um preço válido",
  }),
  category: z.string().min(1, "Por favor, selecione uma categoria"),
  creator: z.string().min(3, "O nome do criador é obrigatório"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductFormProps {
  onSubmit: (values: ProductFormValues) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
  onImageChange?: (file: File | null) => void;
  productImage?: File | null;
}

export const AddProductForm = ({ 
  onSubmit, 
  isSubmitting, 
  onCancel, 
  onImageChange,
  productImage 
}: AddProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      creator: "",
    },
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (onImageChange) {
      onImageChange(file);
    }
  };
  
  const imagePreview = productImage ? URL.createObjectURL(productImage) : null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload Section */}
        <div className="mb-6">
          <FormLabel className="block mb-2">Imagem do Produto</FormLabel>
          <div 
            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleImageClick}
          >
            {imagePreview ? (
              <div className="mx-auto w-full max-w-[200px]">
                <AspectRatio ratio={1 / 1} className="bg-muted">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-md object-cover h-full w-full"
                  />
                </AspectRatio>
                <p className="mt-2 text-sm text-gray-500">{productImage?.name}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Clique para fazer upload da imagem</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG ou GIF até 5MB</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">€</span>
                  <Input 
                    type="text" 
                    placeholder="0.00" 
                    className="pl-8"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="financas">Finanças</SelectItem>
                  <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
                  <SelectItem value="gestao">Gestão</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="curso">Curso</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="creator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Criador</FormLabel>
              <FormControl>
                <Input placeholder="Nome do criador" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adicionando..." : "Adicionar Produto"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
