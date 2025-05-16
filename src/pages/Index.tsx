
import React, { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroBanner } from "@/components/home/HeroBanner";
import { SearchAndFilters } from "@/components/home/SearchAndFilters";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { useProducts } from "@/hooks/use-products"; // Certifique-se de que o caminho está correto
import { Skeleton } from "@/components/ui/skeleton"; // Para o loading state
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Para erros
import { Terminal } from "lucide-react"; // Ícone para o alerta de erro

export default function Index() {
  const { 
    products, // Alterado de filteredProducts para products
    searchTerm, 
    setSearchTerm, 
    activeFilter, 
    setActiveFilter, 
    handleAddToCart, 
    animate, 
    setAnimate,
    isLoadingProducts,
    errorLoadingProducts 
  } = useProducts();

  useEffect(() => {
    if (!isLoadingProducts) {
      setAnimate(true);
    }
  }, [isLoadingProducts, setAnimate]);

  return (
    <MainLayout>
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          activeFilter={activeFilter}
          onActiveFilterChange={setActiveFilter}
        />
        
        {isLoadingProducts && (
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {errorLoadingProducts && (
          <Alert variant="destructive" className="mb-12">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Erro ao carregar produtos</AlertTitle>
            <AlertDescription>
              Não foi possível buscar os produtos no momento. Por favor, tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        )}

        {!isLoadingProducts && !errorLoadingProducts && (
          <FeaturedProducts
            filteredProducts={products} // Passando 'products' aqui
            animate={animate}
            onAddToCart={handleAddToCart}
          />
        )}
        
        <BenefitsSection />
      </div>
    </MainLayout>
  );
}
