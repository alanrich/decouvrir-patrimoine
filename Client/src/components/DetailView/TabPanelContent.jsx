import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Field from "./Field";

const TabPanelContent = ({ fields, isModal, fontSize }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "none",
        }}
      >
        {fields.map((field, index) => (
          <Grid item xs={12} key={index}>
            {field.value && (
              <Field
                {...field}
                isModal={isModal}
                fontSize={fontSize}
                isWikiContent={field.isWikiContent}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

TabPanelContent.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.any,
      type: PropTypes.string,
      isWikiContent: PropTypes.bool,
    })
  ).isRequired,
  isModal: PropTypes.bool,
  fontSize: PropTypes.string,
};

TabPanelContent.defaultProps = {
  isModal: false,
  fontSize: "1rem",
};

export default TabPanelContent;
