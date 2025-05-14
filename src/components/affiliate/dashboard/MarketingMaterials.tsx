
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ExternalLink, LinkIcon } from "lucide-react"; // Changed Download to Eye
import { Button } from "@/components/ui/button";

interface MarketingMaterialItem {
  id: string;
  type: string;
  name: string;
  previewUrl: string; // Assuming ProductCard or similar might use this for an image
}

interface MarketingMaterialsProps {
  materials: MarketingMaterialItem[];
  onViewMaterial: (materialId: string) => void;
  onViewAllMaterials: () => void;
}

export const MarketingMaterials: React.FC<MarketingMaterialsProps> = ({
  materials,
  onViewMaterial,
  onViewAllMaterials
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Materiais de Marketing</CardTitle>
        <CardDescription>
          Recursos para promoção de produtos. Use os links e banners abaixo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {materials && materials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material) => (
              <div key={material.id} className="border rounded-md p-4 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                    {/* Placeholder for image/preview if previewUrl is used */}
                    {material.previewUrl && material.previewUrl !== "/placeholder.svg" ? (
                      <img src={material.previewUrl} alt={material.name} className="object-cover h-full w-full rounded-md" />
                    ) : (
                      <LinkIcon className="h-10 w-10 text-muted-foreground/50" />
                    )}
                  </div>
                  <h4 className="font-medium mb-1">{material.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tipo: {material.type}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full gap-1 mt-2" // Added mt-2 for spacing
                  onClick={() => onViewMaterial(material.id)}
                >
                  <Eye className="h-4 w-4" />
                  Ver Material
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Nenhum material de marketing disponível no momento.</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center pt-4"> {/* Added pt-4 for spacing */}
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
