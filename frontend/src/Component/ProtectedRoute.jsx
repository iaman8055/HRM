import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const ProtectedRoute = () => {
  console.log("inside protected route");
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const isExpired = tokenExpiry ? new Date().getTime() > tokenExpiry : true;

 
  console.log("token", token);
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  const isProtected =
    pathname === "/candidates" ||
    pathname === "/employees" ||
    pathname === "/attendance" ||
    pathname === "/leaves";

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
     if (isExpired) {
    // Remove expired token
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");

    navigate("/login", { replace: true });
  }
    if (isProtected && !token) {
      navigate("/login", { replace: true });
    }
    if (isAuthRoute && token) {
      navigate("/candidates", { replace: true });
    }
  }, [token, isProtected, isAuthRoute, navigate, isExpired]);

  return <Outlet />;
};

export default ProtectedRoute;
