import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import localStorageService from "@/funciones/LocalStorageService";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const session = localStorageService.getSession();

  if (session?.logged) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
