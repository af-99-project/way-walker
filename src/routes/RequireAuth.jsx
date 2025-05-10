// RequireAuth.jsx
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  console.log("🔍 AuthContext 객체:", AuthContext);
  const value = useContext(AuthContext);
  console.log("🔐 useContext 결과:", value); // value = { isLoggedIn, setIsLoggedIn }

  console.log("🔍 useContext 결과:", value);

  const { isLoggedIn } = value || {}; // 에러 방지용

  return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default RequireAuth;
