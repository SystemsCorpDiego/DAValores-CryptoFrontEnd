import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    bg_primary: { main: string; btn_nav: string };
    bg_secondary: { main: string };
    bg_btn_nav: { main: string };
    color_btn_nav: { main: string };
    color_primary: { btn_nav: string };
  }
  interface PaletteOptions {
    bg_primary?: { main: string; btn_nav?: string };
    bg_secondary?: { main: string };
    bg_btn_nav?: { main: string };
    color_btn_nav?: { main: string };
    color_primary?: { btn_nav?: string };
  }
}

export const generalTheme = createTheme({
  palette: {
    bg_primary: {
      main: "#17365D",
      btn_nav: "#fff",
    },
    bg_secondary: {
      main: "#223F65",
    },
    bg_btn_nav: {
      main: "#8B8B8B",
    },
    color_btn_nav: {
      main: "#fff",
    },
    color_primary: {
      btn_nav: "#17365D",
    },
    error: {
      main: red.A400,
    },
  },
});
