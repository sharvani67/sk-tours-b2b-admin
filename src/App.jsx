import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to users */}
        <Route path="/" element={<Navigate to="/users" />} />

        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/admin/properties/:id" element={<AdminPropertyDetails />} />
     
      </Routes>
    </BrowserRouter>
  );
}