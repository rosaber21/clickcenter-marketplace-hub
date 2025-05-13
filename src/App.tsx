
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { MainLayout } from "./components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import pages
import Index from "@/pages/Index";
import ProductDetails from "@/pages/ProductDetails";
import AffiliateCategories from "@/pages/AffiliateCategories";
import CreatorDashboard from "@/pages/Creator/Dashboard";
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminProducts from "@/pages/Admin/Products";
import AdminPayments from "@/pages/Admin/Payments";
import AdminAffiliates from "@/pages/Admin/Affiliates";
import AdminUsers from "@/pages/Admin/Users";
import AdminSales from "@/pages/Admin/Sales";
import AdminSettings from "@/pages/Admin/Settings";
import AdminLogin from "@/pages/AdminLogin";
import AffiliateLayout from "@/pages/Affiliate/AffiliateLayout";
import AffiliateDashboard from "@/pages/Affiliate/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <Routes>
              {/* Páginas principais */}
              <Route path="/" element={<MainLayout><Index /></MainLayout>} />
              <Route path="/produto/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
              <Route path="/afiliados" element={<MainLayout><AffiliateCategories /></MainLayout>} />
              <Route path="/categorias" element={<MainLayout><AffiliateCategories /></MainLayout>} />
              <Route path="/login" element={<MainLayout><Login /></MainLayout>} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/produtos" element={<AdminProducts />} />
              <Route path="/admin/pagamentos" element={<AdminPayments />} />
              <Route path="/admin/afiliados" element={<AdminAffiliates />} />
              <Route path="/admin/usuarios" element={<AdminUsers />} />
              <Route path="/admin/vendas" element={<AdminSales />} />
              <Route path="/admin/configuracoes" element={<AdminSettings />} />

              {/* Creator routes */}
              <Route path="/criador" element={<CreatorDashboard />} />

              {/* Affiliate routes with AffiliateLayout */}
              <Route path="/afiliado" element={<AffiliateLayout />}>
                <Route index element={<AffiliateDashboard />} />
                <Route path="produtos" element={<AffiliateDashboard />} />
                <Route path="conversoes" element={<AffiliateDashboard />} />
                <Route path="pagamentos" element={<AffiliateDashboard />} />
                <Route path="configuracoes" element={<AffiliateDashboard />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
