
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { Product, User as UserType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Dados de exemplo para simular produtos e usuários
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Curso de Marketing Digital",
    description: "Aprenda técnicas avançadas de marketing digital para expandir seu negócio online. Este curso abrange desde o básico até estratégias avançadas de SEO, mídias sociais, marketing de conteúdo e tráfego pago. Ideal para iniciantes e profissionais que desejam atualizar seus conhecimentos.",
    price: 297.00,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085", "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a"],
    createdById: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Planilha de Gestão Financeira",
    description: "Organize suas finanças pessoais e empresariais com essa planilha completa. Controle de despesas, orçamento mensal, planejamento financeiro e relatórios automáticos. Perfeito para quem busca organização financeira.",
    price: 49.90,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f"],
    createdById: "user2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MOCK_USERS: UserType[] = [
  {
    id: "user1",
    name: "João Silva",
    email: "joao@example.com",
    role: "criador",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user2",
    name: "Maria Souza",
    email: "maria@example.com",
    role: "criador",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    createdAt: new Date().toISOString(),
  },
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = React.useState<number>(0);
  
  // Simula busca do produto pelo ID
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  // Simula busca do criador
  const creator = product ? MOCK_USERS.find(u => u.id === product.createdById) : undefined;
  
  // Se o produto não for encontrado, mostra uma mensagem
  if (!product) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-8">O produto que você está procurando não existe ou foi removido.</p>
          <Button onClick={() => navigate("/")}>Voltar para a Página Inicial</Button>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Produto adicionado ao carrinho",
      description: `${product.title} foi adicionado ao seu carrinho.`,
    });
    // Aqui adicionaria ao contexto do carrinho
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirecionar para página de checkout
    // navigate("/checkout");
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galeria de imagens */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-auto py-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-20 w-20 cursor-pointer rounded-md overflow-hidden border-2",
                    selectedImage === index ? "border-primary" : "border-muted"
                  )}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} - Imagem ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Informações do produto */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                {product.type === "digital" ? "Produto Digital" : "Produto Físico"}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </span>
            </div>
          </div>
          
          {creator && (
            <div className="flex items-center gap-2 py-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
                {creator.avatar ? (
                  <img 
                    src={creator.avatar} 
                    alt={creator.name} 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{creator.name}</p>
                <p className="text-xs text-muted-foreground">Criador</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Descrição</h2>
            <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
          </div>
          
          <div className="pt-4 space-y-3">
            <Button 
              onClick={handleAddToCart} 
              variant="outline" 
              className="w-full gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Adicionar ao Carrinho
            </Button>
            <Button 
              onClick={handleBuyNow} 
              className="w-full"
            >
              Comprar Agora
            </Button>
          </div>
          
          {product.type === "digital" && (
            <div className="rounded-md bg-accent/50 p-4">
              <h3 className="font-medium mb-1">Informações sobre entrega:</h3>
              <p className="text-sm text-muted-foreground">
                Este é um produto digital. O acesso será disponibilizado imediatamente após a confirmação do pagamento através de seu e-mail de cadastro.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
