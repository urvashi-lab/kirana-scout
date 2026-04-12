import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import UploadPage from "./pages/UploadPage";
import AnalysisResults from "./pages/AnalysisResults";
import ShopDetail from "./pages/ShopDetail";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/results/:id" element={<AnalysisResults />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/admin/sku" element={<AdminPage />} />
            <Route path="/admin/config" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
