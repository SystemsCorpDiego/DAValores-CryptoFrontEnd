import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../services/authService";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const session = getSession();

  if (session?.logged) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
