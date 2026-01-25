import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "@/context/AuthProvider";

const RequireAuth = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // 또는 로딩 UI

  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default RequireAuth;
