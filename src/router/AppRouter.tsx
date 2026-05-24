import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "../pages/login/LoginPage";
import { RipioWidget } from "../pages/ripio-widget/RipioWidget";
import { DashboardLayout } from "../layouts/DashboardLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/ripioWidget"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <RipioWidget />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      {/* Ruta raíz: redirige según sesión */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Navigate to="/ripioWidget" replace />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
