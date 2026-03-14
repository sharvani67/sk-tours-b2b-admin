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
import AdminBookings from "./pages/AdminBookings";
import AdminProperties from "./pages/AdminProperties";
import AdminBookingDetails from "./pages/AdminBookingDetails";
import AdminPropertyDetails from "./pages/AdminPropertyDetails";
import UserForm from "./pages/Users/UserForm";
import CategoryTable from "./pages/Categories/CategoryTable";
import UserDetails from "./pages/UserDetails";
import UsersPage from "./pages/UsersPage";
import AdminAddProperty from "./pages/Properties/AddProperty";


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
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/admin/booking/:bookingNumber" element={<AdminBookingDetails />} />
         <Route path="/properties" element={<AdminProperties />} />
         <Route
            path="/admin/properties/:id"
            element={<AdminPropertyDetails />}
          />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/categories" element={<CategoryTable/>} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/user-form" element={<UserForm/>} />
          <Route path="/user-form/:id" element={<UserForm/>} />
          <Route path="/add-property/:supplierId" element={<AdminAddProperty/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
