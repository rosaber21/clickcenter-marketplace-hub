
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
import AffiliateProducts from "@/pages/Affiliate/Products";
import Contact from "@/pages/Contact";
import CreatorDashboard from "@/pages/Creator/Dashboard";
import CreatorProducts from "@/pages/Creator/Products";
import Communities from "@/pages/Creator/Communities";
import Moderation from "@/pages/Creator/Moderation";
import Members from "@/pages/Creator/Members";
import Sales from "@/pages/Creator/Sales";
import Combos from "@/pages/Creator/Combos";
import Personalization from "@/pages/Creator/Personalization";
import Gamification from "@/pages/Creator/Gamification";
import Analytics from "@/pages/Creator/Analytics";
import Settings from "@/pages/Creator/Settings";
import ManageAffiliates from "@/pages/Creator/ManageAffiliates";
import ManageCourses from "@/pages/Creator/ManageCourses";
import CoursePreview from "@/pages/Creator/CoursePreview";
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
import { AdminLayout } from "@/pages/Admin/AdminLayout";
import AdminProfile from "@/pages/Admin/AdminProfile";
import StudentDashboard from "@/pages/Student/Dashboard";
import CoursePage from "@/pages/Student/CoursePage";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<MainLayout><Index /></MainLayout>} />
              <Route path="/produto/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
              <Route path="/afiliados" element={<MainLayout><AffiliateCategories /></MainLayout>} />
              <Route path="/afiliados/produtos" element={<MainLayout><AffiliateProducts /></MainLayout>} />
              <Route path="/categorias" element={<MainLayout><AffiliateCategories /></MainLayout>} />
              <Route path="/contato" element={<MainLayout><Contact /></MainLayout>} />
              <Route path="/login" element={<MainLayout><Login /></MainLayout>} />

              {/* Student Routes */}
              <Route path="/aluno" element={<MainLayout><StudentDashboard /></MainLayout>} />
              <Route path="/aluno/curso/:courseId" element={<CoursePage />} />
              <Route path="/aluno/curso/:courseId/aula/:lessonId" element={<CoursePage />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="perfil" element={<AdminProfile />} />
                <Route path="produtos" element={<AdminProducts />} />
                <Route path="pagamentos" element={<AdminPayments />} />
                <Route path="afiliados" element={<AdminAffiliates />} />
                <Route path="usuarios" element={<AdminUsers />} />
                <Route path="vendas" element={<AdminSales />} />
                <Route path="configuracoes" element={<AdminSettings />} />
              </Route>

              {/* Creator routes */}
              <Route path="/criador" element={<CreatorDashboard />} />
              <Route path="/criador/produtos" element={<CreatorProducts />} />
              <Route path="/criador/comunidades" element={<Communities />} />
              <Route path="/criador/moderacao" element={<Moderation />} />
              <Route path="/criador/membros" element={<Members />} />
              <Route path="/criador/vendas" element={<Sales />} />
              <Route path="/criador/combos" element={<Combos />} />
              <Route path="/criador/personalizacao" element={<Personalization />} />
              <Route path="/criador/gamificacao" element={<Gamification />} />
              <Route path="/criador/analytics" element={<Analytics />} />
              <Route path="/criador/configuracoes" element={<Settings />} />
              <Route path="/criador/gerenciar-afiliados" element={<ManageAffiliates />} />
              <Route path="/criador/gerenciar-cursos" element={<ManageCourses />} />
              <Route path="/criador/curso-preview" element={<CoursePreview />} />

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
