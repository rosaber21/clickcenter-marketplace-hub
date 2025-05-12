
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
import { AdminLayout } from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import AdminUsers from "./pages/Admin/Users";
import AdminSales from "./pages/Admin/Sales";
import AdminAffiliates from "./pages/Admin/Affiliates";
import AdminPayments from "./pages/Admin/Payments";
import AdminSettings from "./pages/Admin/Settings";

// Creator pages
import CreatorDashboard from "./pages/Creator/Dashboard";

// Affiliate pages
import AffiliateDashboard from "./pages/Affiliate/Dashboard";
import AffiliateLayout from "./pages/Affiliate/AffiliateLayout";

// Student pages
import { StudentLayout } from "./pages/Student/StudentLayout";
import StudentDashboard from "./pages/Student/Dashboard";
import CoursePage from "./pages/Student/CoursePage";
import StudentSandbox from "./pages/Student/Sandbox";

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
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="usuarios" element={<AdminUsers />} />
            <Route path="vendas" element={<AdminSales />} />
            <Route path="afiliados" element={<AdminAffiliates />} />
            <Route path="pagamentos" element={<AdminPayments />} />
            <Route path="configuracoes" element={<AdminSettings />} />
          </Route>
          
          {/* Creator Routes */}
          <Route path="/criador" element={<CreatorDashboard />} />
          
          {/* Affiliate Routes */}
          <Route path="/afiliado" element={<AffiliateLayout />}>
            <Route index element={<AffiliateDashboard />} />
            {/* Add more affiliate routes here as needed */}
          </Route>
          
          {/* Student Routes */}
          <Route path="/aluno" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="sandbox" element={<StudentSandbox />} />
            <Route path="curso/:courseId" element={<CoursePage />} />
            <Route path="curso/:courseId/aula/:lessonId" element={<CoursePage />} />
            <Route path="cursos" element={<StudentDashboard />} />
            <Route path="favoritos" element={<StudentDashboard />} />
            <Route path="agenda" element={<StudentDashboard />} />
            <Route path="mensagens" element={<StudentDashboard />} />
            <Route path="certificados" element={<StudentDashboard />} />
            <Route path="notas" element={<StudentDashboard />} />
          </Route>
          
          {/* Other routes will be added as the application develops */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
