import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" }, // primary blue
    secondary: { main: "#f50057" },
    background: {
      default: "#f4f6f8",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
    grey: {
      300: "#ddd",
      400: "#e0e0e0",
      500: "#808080",
    },
    black: {
      300: "#1A1A1A",
      400: "#333333",
      500: "#000000",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: 500, letterSpacing: "0.02em" },
    h6: { fontWeight: "bold" },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.8125rem" },
    subtitle1: { fontSize: "0.8rem", fontWeight: "bold" },
    fancyText: {
      fontWeight: "bold",
      color: "#FFFFFF",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    },
  },
  shape: {
    borderRadius: 3, // default border radius
    borderRadiusSmall: 2,
    borderRadiusMedium: 8, // general use
    borderRadiusLarge: 16,
    borderRadiusRounded: 50,
  },
  shadows: [
    "none",
    "0px 2px 10px rgba(0, 0, 0, 0.1)",
    "0px 2px 4px rgba(0, 0, 0, 0.15)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
    "0px 4px 16px rgba(0, 0, 0, 0.2)",
  ],
});

export default theme;
