
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileZip, FileImage } from "lucide-react";

interface Material {
  id: string;
  title: string;
  type: string;
  url: string;
}

interface SupplementaryMaterialsProps {
  materials: Material[];
}

export function SupplementaryMaterials({ materials }: SupplementaryMaterialsProps) {
  if (materials.length === 0) {
    return null;
  }
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "zip":
        return <FileZip className="h-4 w-4" />;
      case "jpg":
      case "png":
        return <FileImage className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Materiais Complementares</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {materials.map((material) => (
            <div 
              key={material.id}
              className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(material.type)}
                <span className="text-sm">{material.title}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <a 
                  href={material.url} 
                  download 
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
