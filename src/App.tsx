import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileManagement from "./pages/ProfileManagement";
import Reports from "./pages/Reports";
import RequestManagement from "./pages/RequestManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <aside className="hidden lg:block">
                <div className="sticky top-6">
                  <ProfileSidebar />
                </div>
              </aside>
              <main>
                <Routes>
                  <Route path="/" element={<ProfileManagement />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/requests" element={<RequestManagement />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
