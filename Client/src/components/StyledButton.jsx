import React, { memo } from "react";
import { Box, Button, useTheme } from "@mui/material";

const StyledButton = memo(({ text, handleAction }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: "4px 12px", // Smaller padding to avoid too much extra space
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.shape.borderRadiusMedium,
        width: "fit-content", // Box should only be as wide as its content
        margin: "8px auto", // Add space around the box and center it horizontally
      }}
    >
      <Button
        onClick={handleAction}
        size="small"
        sx={{
          ...theme.typography.fancyText,
          justifyContent: "center",
          width: "fit-content",
          outline: "none", // Removes the default focus outline
          boxShadow: "none", // Removes box-shadow to avoid blurriness
          "&:focus": {
            outline: "none", // Ensures no focus outline on click
            boxShadow: "none", // Disables focus-related shadow
          },
        }}
      >
        {text}
      </Button>
    </Box>
  );
});

export default StyledButton;
