import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { generalTheme } from "./generalTheme";

interface AppThemeProps {
  children: ReactNode;
}

export const AppTheme = ({ children }: AppThemeProps) => {
  return (
    <ThemeProvider theme={generalTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
