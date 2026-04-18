import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CaseProvider } from "@/contexts/CaseContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ShopOwnerLayout } from "@/components/ShopOwnerLayout";
import DashboardOverview from "./pages/DashboardOverview";
import UploadPage from "./pages/UploadPage";
import AnalysisResults from "./pages/AnalysisResults";
import ShopDetail from "./pages/ShopDetail";
import AdminPage from "./pages/AdminPage";
import ShopOwnerLogin from "./pages/ShopOwnerLogin";
import LoanOfficerLogin from "./pages/LoanOfficerLogin";
import ShopOwnerUpload from "./pages/ShopOwnerUpload";
import ShopOwnerStatus from "./pages/ShopOwnerStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login/shop-owner" element={<ShopOwnerLogin />} />
        <Route path="/login/loan-officer" element={<LoanOfficerLogin />} />
        {/* Redirect any unknown path to shop owner login as fallback */}
        <Route path="*" element={<Navigate to="/login/shop-owner" replace />} />
      </Routes>
    );
  }

  if (role === "shop_owner") {
    return (
      <ShopOwnerLayout>
        <Routes>
          <Route path="/owner/upload" element={<ShopOwnerUpload />} />
          <Route path="/owner/status" element={<ShopOwnerStatus />} />
          <Route path="*" element={<Navigate to="/owner/status" replace />} />
        </Routes>
      </ShopOwnerLayout>
    );
  }

  // Loan Officer — existing dashboard unchanged
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/results/:id" element={<AnalysisResults />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/admin/sku" element={<AdminPage />} />
        <Route path="/admin/config" element={<AdminPage />} />
        {/* Redirect login routes to dashboard if already authenticated */}
        <Route path="/login/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CaseProvider>
            <AppRoutes />
          </CaseProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;