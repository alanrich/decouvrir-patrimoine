import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTheme } from "@mui/material/styles";

const SortMenu = ({
  anchorElSort,
  openSort,
  handleSortMenuOpen,
  handleSortMenuClose,
  sortOptions,
  localSortBy,
  setLocalSortBy,
  localSortOrder,
  setLocalSortOrder,
  handleApplySort,
}) => {
  const theme = useTheme();

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleSortMenuOpen}
        startIcon={<SortIcon />}
        sx={{
          backgroundColor: theme.palette.background.paper,
          textTransform: "none",
          fontSize: theme.typography.body1.fontSize,
          minWidth: "80px",
          height: "40px",
          borderRadius: theme.shape.borderRadiusMedium,
        }}
      >
        Tier
      </Button>
      <Menu
        anchorEl={anchorElSort}
        open={openSort}
        onClose={handleSortMenuClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
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
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === localSortBy}
            onClick={() => setLocalSortBy(option.value)}
            sx={{ fontSize: theme.typography.body2.fontSize }}
          >
            {option.label}
          </MenuItem>
        ))}
        <Divider />
        <Box sx={{ padding: "0.5rem 1.5rem" }}>
          <Typography
            variant="body2"
            sx={{ marginBottom: "0.5rem", fontSize: "0.8125rem" }}
          >
            Ordre de tri
          </Typography>
          <ToggleButtonGroup
            value={localSortOrder}
            exclusive
            onChange={(event, newOrder) => {
              if (newOrder !== null) {
                setLocalSortOrder(newOrder);
              }
            }}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                fontSize: "0.75rem",
                padding: "0.25rem 0.5rem",
              },
            }}
          >
            <ToggleButton value="asc">
              <ArrowUpwardIcon fontSize="small" sx={{ marginRight: "4px" }} />
              croissant
            </ToggleButton>
            <ToggleButton value="desc">
              <ArrowDownwardIcon fontSize="small" sx={{ marginRight: "4px" }} />
              décroissant
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Divider />
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "4px 12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.shape.borderRadiusMedium,
            width: "fit-content",
            margin: "8px auto",
          }}
        >
          <MenuItem
            onClick={handleApplySort}
            sx={{
              ...theme.typography.fancyText,
              justifyContent: "center",
              width: "fit-content",
            }}
          >
            Appliquer
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default SortMenu;
