
import React from "react";
import { CategoryCard, CategoryData } from "./CategoryCard";
import { HowItWorks } from "./HowItWorks";

interface CategoriesSectionProps {
  categories: CategoryData[];
  onViewProducts: (categoryId: number) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  categories, 
  onViewProducts 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            onViewProducts={onViewProducts} 
          />
        ))}
      </div>
      
      <HowItWorks />
    </div>
  );
};

