import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CurrencyBitcoin, Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
//import { clearSession, getSession } from "../services/authService";
import LocalStorageService from "@/funciones/LocalStorageService";

export const DRAWER_WIDTH = 260;

const navItems = [
  { label: "Crypto Widget", path: "/ripioWidget", icon: <CurrencyBitcoin /> },
];

const SidebarContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = LocalStorageService.getSession();

  const handleLogout = () => {
    LocalStorageService.clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "bg_primary.main",
        color: "#fff",
      }}
    >
      {/* Header / Brand */}
      <Box sx={{ px: 3, py: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
          DA Valores
        </Typography>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Activos digitales
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

      {/* User info */}
      <Box
        sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 1.5 }}
      >
        <Avatar
          sx={{
            bgcolor: "rgba(255,255,255,0.2)",
            width: 36,
            height: 36,
            fontSize: 14,
          }}
        >
          {session?.username?.charAt(0).toUpperCase() ?? "U"}
        </Avatar>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}
        >
          {session?.username ?? "Usuario"}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

      {/* Navigation */}
      <List sx={{ flex: 1, pt: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                bgcolor: active ? "rgba(255,255,255,0.15)" : "transparent",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      color: "#fff",
                      fontWeight: active ? 600 : 400,
                      fontSize: 14,
                    },
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Logout */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />
      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mx: 1,
            borderRadius: 2,
            my: 1,
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)", minWidth: 40 }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Cerrar sesión"
            slotProps={{
              primary: { sx: { color: "rgba(255,255,255,0.7)", fontSize: 14 } },
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: "permanent" | "temporary";
}

export const Sidebar = ({ open, onClose, variant }: SidebarProps) => {
  return (
    <Drawer
      variant={variant}
      open={variant === "permanent" ? true : open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
};
