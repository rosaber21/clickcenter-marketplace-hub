
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import AffiliateCategories from "./pages/AffiliateCategories";

// Admin pages
import AdminDashboard from "./pages/Admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/afiliados" element={<AffiliateCategories />} />
          <Route path="/afiliados/categoria/:id" element={<ProductDetails />} />
          <Route path="/afiliados/como-funciona" element={<AffiliateCategories />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/produtos" element={<AdminDashboard />} />
          
          {/* Outras rotas serão adicionadas conforme desenvolvemos a aplicação */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
