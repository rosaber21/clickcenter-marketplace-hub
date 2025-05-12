
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import AffiliateCategories from "./pages/AffiliateCategories";

// Admin pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import AdminUsers from "./pages/Admin/Users";
import AdminSales from "./pages/Admin/Sales";
import AdminAffiliates from "./pages/Admin/Affiliates";
import AdminPayments from "./pages/Admin/Payments";
import AdminSettings from "./pages/Admin/Settings";

// Creator pages
import CreatorDashboard from "./pages/Creator/Dashboard";

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/afiliados" element={<AffiliateCategories />} />
          <Route path="/afiliados/categoria/:id" element={<ProductDetails />} />
          <Route path="/afiliados/como-funciona" element={<AffiliateCategories />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/produtos" element={<AdminProducts />} />
          <Route path="/admin/usuarios" element={<AdminUsers />} />
          <Route path="/admin/vendas" element={<AdminSales />} />
          <Route path="/admin/afiliados" element={<AdminAffiliates />} />
          <Route path="/admin/pagamentos" element={<AdminPayments />} />
          <Route path="/admin/configuracoes" element={<AdminSettings />} />
          
          {/* Creator Routes */}
          <Route path="/criador" element={<CreatorDashboard />} />
          
          {/* Outras rotas serão adicionadas conforme desenvolvemos a aplicação */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
