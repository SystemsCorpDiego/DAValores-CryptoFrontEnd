import { useState, type ReactNode } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Sidebar, DRAWER_WIDTH } from "../components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {isDesktop ? (
        <Sidebar variant="permanent" open onClose={() => {}} />
      ) : (
        <Sidebar
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          width: isDesktop ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
        }}
      >
        {!isDesktop && (
          <AppBar position="static" elevation={0} sx={{ bgcolor: "bg_primary.main" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 2 }}
                aria-label="Abrir menú"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                DA Valores
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box
          component="main"
          sx={{ flex: 1, overflow: "auto", bgcolor: "#f5f7fa" }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
