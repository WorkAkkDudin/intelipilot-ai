import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToolDataProvider } from "./contexts/ToolDataContext";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";
import Audience from "./pages/Audience";
import Custdev from "./pages/Custdev";
import Market from "./pages/Market";
import Offer from "./pages/Offer";
import Funnel from "./pages/Funnel";
import Decomposition from "./pages/Decomposition";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToolDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Projects />} />
            <Route path="/audience" element={<Audience />} />
            <Route path="/custdev" element={<Custdev />} />
            <Route path="/market" element={<Market />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/funnel" element={<Funnel />} />
            <Route path="/decomposition" element={<Decomposition />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ToolDataProvider>
  </QueryClientProvider>
);

export default App;
