import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CulturalMenu = ({
  anchorElCultural,
  openCultural,
  handleCulturalMenuOpen,
  handleCulturalMenuClose,
  handleCulturalSelection,
}) => {
  const theme = useTheme();

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleCulturalMenuOpen}
        sx={{
          backgroundColor: theme.palette.background.paper,
          textTransform: "none",
          fontSize: theme.typography.body1.fontSize,
          minWidth: "200px",
          height: "40px",
          borderRadius: theme.shape.borderRadiusMedium,
        }}
      >
        Sélectionner un Lieu Culturel
      </Button>
      <Menu
        anchorEl={anchorElCultural}
        open={openCultural}
        onClose={handleCulturalMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            borderRadius: theme.shape.borderRadiusSmall,
            boxShadow: theme.shadows[2],
          },
        }}
        sx={{
          mt: 1,
        }}
      >
        <MenuItem onClick={() => handleCulturalSelection("museums")}>
          Musées
        </MenuItem>
        <MenuItem onClick={() => handleCulturalSelection("jardins")}>
          Jardins
        </MenuItem>
        <MenuItem onClick={() => handleCulturalSelection("chateaux")}>
          Châteaux
        </MenuItem>
        <MenuItem onClick={() => handleCulturalSelection("cathedrals")}>
          Cathédrals
        </MenuItem>
        <MenuItem onClick={() => handleCulturalSelection("operaHouses")}>
          Salles d'Opéra
        </MenuItem>
        <MenuItem
          onClick={() => handleCulturalSelection("maisonsDesIllustres")}
        >
          Maisons des Illustres
        </MenuItem>
        {/* Add more options as needed */}
      </Menu>
    </>
  );
};

export default CulturalMenu;
