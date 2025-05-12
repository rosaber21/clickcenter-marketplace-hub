
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface CategoryData {
  id: number;
  name: string;
  description: string;
  productCount: number;
  icon: string;
  commission: string;
}

interface CategoryCardProps {
  category: CategoryData;
  onViewProducts: (categoryId: number) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onViewProducts }) => {
  return (
    <div className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:scale-[1.02]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="text-3xl mb-2">{category.icon}</div>
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
              {category.commission}
            </Badge>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {category.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {category.productCount} produtos disponíveis para afiliação
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
            onClick={() => onViewProducts(category.id)}
          >
            Ver Produtos
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

