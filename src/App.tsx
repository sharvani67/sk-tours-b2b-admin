import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";

import DealsPage from "./pages/DealsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CategoryTable from "./pages/Categories/CategoryTable";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";
import UserForm from "./pages/Users/UserForm";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
  path="/dashboard"
  element={
    localStorage.getItem("admin") ? (
      <Index />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/categories" element={<CategoryTable/>} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/user-form" element={<UserForm/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
