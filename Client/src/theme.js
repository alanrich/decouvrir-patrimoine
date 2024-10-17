import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2B517A " }, //  marine blue = #2B517A     navy = #001f3d       medium-navy = #002952    light-navy = #003366
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
      100: "#8da9bf",
      200: "#7e96aa",
      300: "#6e8494",
      400: "#5e717f",
      500: "#4f5e6a",
      600: "#3f4b55",
      700: "#2f3840",
    },
    black: {
      300: "#1A1A1A",
      400: "#333333",
      500: "#000000",
    },
    bordeaux: {
      100: "#4a001a",
      200: "#3e0016",
      300: "#310012",
    },
    marine: {
      100: "#023562",
      200: "#012647",
      300: "#01223f",
      400: "#011e37",
      500: "#001527",
    },
    blue: {
      100: "#0059b3",
      200: "#0066CC",
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
