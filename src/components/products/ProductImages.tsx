
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImagesProps {
  images: string[];
  title: string;
}

export function ProductImages({ images, title }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
        <img 
          src={images[selectedImage]} 
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-auto py-1">
          {images.map((image, index) => (
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
                alt={`${title} - Imagem ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
