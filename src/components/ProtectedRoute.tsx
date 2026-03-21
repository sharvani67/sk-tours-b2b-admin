import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const isAuth = localStorage.getItem("admin");

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}