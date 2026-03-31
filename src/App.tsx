import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { AdminHeader } from "@/components/AdminHeader";
import ProfileManagement from "./pages/ProfileManagement";
import Reports from "./pages/Reports";
import RequestManagement from "./pages/RequestManagement";
import AdminProfileManagement from "./pages/admin/AdminProfileManagement";
import AdminReports from "./pages/admin/AdminReports";
import AdminTicketManagement from "./pages/admin/AdminTicketManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Customer routes */}
            <Route path="/" element={<CustomerLayout><ProfileManagement /></CustomerLayout>} />
            <Route path="/bao-cao" element={<CustomerLayout><Reports /></CustomerLayout>} />
            <Route path="/tiep-nhan-yeu-cau" element={<CustomerLayout><RequestManagement /></CustomerLayout>} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout><AdminProfileManagement /></AdminLayout>} />
            <Route path="/admin/bao-cao" element={<AdminLayout><AdminReports /></AdminLayout>} />
            <Route path="/admin/quan-ly-ticket" element={<AdminLayout><AdminTicketManagement /></AdminLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
