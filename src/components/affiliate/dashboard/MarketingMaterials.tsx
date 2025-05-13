
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketingMaterialsProps {
  onDownloadMaterial: (materialId: number) => void;
  onViewAllMaterials: () => void;
}

export const MarketingMaterials = ({
  onDownloadMaterial,
  onViewAllMaterials
}: MarketingMaterialsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Materiais de Marketing</CardTitle>
        <CardDescription>
          Banners e imagens para promoção de produtos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-md p-4 hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                <LinkIcon className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h4 className="font-medium mb-1">Banner de Promoção #{i}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Banner para redes sociais e campanhas online
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full gap-1"
                onClick={() => onDownloadMaterial(i)}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={onViewAllMaterials}
          className="gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          Ver Todos os Materiais
        </Button>
      </CardFooter>
    </Card>
  );
};
