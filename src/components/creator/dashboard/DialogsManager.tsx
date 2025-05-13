
import React from "react";
import { AffiliateDialog } from "@/components/creator/dashboard/AffiliateDialog";
import { ProductDialogHandler } from "@/components/creator/dashboard/ProductDialogHandler";

interface DialogsManagerProps {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  affiliateDialogOpen: boolean;
  setAffiliateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAffiliateEmail: string;
  setNewAffiliateEmail: React.Dispatch<React.SetStateAction<string>>;
  handleAddAffiliate: () => void;
  isAddingAffiliate: boolean;
}

export const DialogsManager: React.FC<DialogsManagerProps> = ({
  products,
  setProducts,
  affiliateDialogOpen,
  setAffiliateDialogOpen,
  newAffiliateEmail,
  setNewAffiliateEmail,
  handleAddAffiliate,
  isAddingAffiliate
}) => {
  return (
    <>
      {/* Product Dialog */}
      <ProductDialogHandler products={products} setProducts={setProducts} />
      
      {/* Add Affiliate Dialog */}
      <AffiliateDialog 
        open={affiliateDialogOpen}
        onOpenChange={setAffiliateDialogOpen}
        newAffiliateEmail={newAffiliateEmail}
        onEmailChange={(e) => setNewAffiliateEmail(e.target.value)}
        onSubmit={handleAddAffiliate}
        isAddingAffiliate={isAddingAffiliate}
      />
    </>
  );
};
