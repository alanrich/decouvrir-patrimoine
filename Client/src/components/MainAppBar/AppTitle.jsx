import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AppTitle = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(2),
        height: "4rem",
        position: "absolute",
        top: 0,
        left: 0,
        gap: theme.spacing(1),
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={theme.typography.fancyText}
      >
        Découvrir Patrimoine
      </Typography>
    </Box>
  );
};

export default AppTitle;
