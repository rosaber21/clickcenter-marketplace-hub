
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroBanner } from "@/components/home/HeroBanner";
import { SearchAndFilters } from "@/components/home/SearchAndFilters";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { useProducts } from "@/hooks/use-products";

const Index = () => {
  const navigate = useNavigate();
  const { 
    searchTerm, 
    setSearchTerm, 
    activeFilter, 
    setActiveFilter,
    filteredProducts,
    handleAddToCart,
    animate
  } = useProducts();

  const handleViewAllProducts = () => {
    // Scroll to products section
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroBanner onViewAllProducts={handleViewAllProducts} />
      
      <SearchAndFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        animate={animate}
      />
      
      <FeaturedProducts 
        filteredProducts={filteredProducts}
        animate={animate}
        onAddToCart={handleAddToCart}
      />
      
      <BenefitsSection animate={animate} />
    </>
  );
};

export default Index;
