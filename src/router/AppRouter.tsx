import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "../pages/login/LoginPage";
import { RipioWidget } from "../pages/ripio-widget/RipioWidget";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/ripioWidget"
        element={
          <PrivateRoute>
            <RipioWidget />
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
