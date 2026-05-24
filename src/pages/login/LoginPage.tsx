import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login, saveSession } from "../../services/authService";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token, tokenRefresco } = await login({ username, password });
      saveSession(token, tokenRefresco, username);
      navigate("/", { replace: true });
    } catch {
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Panel izquierdo — branding */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "bg_primary.main",
          gap: 3,
          px: 6,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}
        >
          DA Valores
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "rgba(255,255,255,0.75)", textAlign: "center" }}
        >
          Plataforma de gestión de activos digitales
        </Typography>
      </Box>

      {/* Panel derecho — formulario */}
      <Box
        sx={{
          flex: { xs: 1, md: "0 0 440px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 4, sm: 8 },
          bgcolor: "#fff",
        }}
      >
        {/* Título visible solo en mobile */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "bg_primary.main",
            mb: 1,
            display: { md: "none" },
          }}
        >
          DA Valores
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Iniciar sesión
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
          Ingresá tus credenciales para continuar
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            autoComplete="username"
            autoFocus
            sx={{ mb: 2.5 }}
          />

          <TextField
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            autoComplete="current-password"
            sx={{ mb: 3 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading || !username || !password}
            sx={{
              bgcolor: "bg_primary.main",
              "&:hover": { bgcolor: "bg_secondary.main" },
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Ingresar"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
