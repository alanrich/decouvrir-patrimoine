import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const TabPanel = ({ children, value, index }) => {
  return value === index ? <Box sx={{ padding: 1 }}>{children}</Box> : null;
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default TabPanel;
