import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Paper, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const FieldTitle = styled(Typography)(({ theme, isModal }) => ({
  display: "inline-block",
  backgroundColor: "#e0f7fa",
  color: theme.palette.text.primary,
  padding: "6px 12px",
  borderRadius: "20px",
  marginBottom: "8px",
  fontWeight: "bold",
  fontSize: isModal ? "1rem" : ".8rem",
}));

const Field = ({ title, value, type, isModal }) => {
  const isHistoire = title.toLowerCase() === "histoire";

  const titleVariant = isModal ? "h6" : "subtitle1";
  const valueFontSize = isModal ? (isHistoire ? ".8rem" : "1rem") : ".8rem";

  if (type === "link" && value) {
    return (
      <Grid item xs={12} sm={6}>
        <FieldTitle variant={titleVariant} isModal={isModal}>
          {title}:
        </FieldTitle>
        <Typography
          variant="body2"
          sx={{
            marginLeft: 1,
            fontSize: isModal ? ".75rem" : ".8rem",
            marginTop: isModal ? "4px" : "0px",
          }}
        >
          <Link href={`http://${value}`} target="_blank" rel="noopener">
            {value}
          </Link>
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6}>
      <FieldTitle variant={titleVariant} isModal={isModal}>
        {title}:
      </FieldTitle>
      <Typography
        variant="body1"
        sx={{
          marginLeft: 1,
          fontSize: valueFontSize,
        }}
      >
        {value || "N/A"}
      </Typography>
    </Grid>
  );
};

Field.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  type: PropTypes.string,
  isModal: PropTypes.bool,
};

Field.defaultProps = {
  type: "text",
  isModal: false,
};

const TabPanelContent = ({ fields, isModal }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
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
        }}
      >
        {fields.map((field) => (
          <Field key={field.title} {...field} isModal={isModal} />
        ))}
      </Grid>
    </Paper>
  );
};

TabPanelContent.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
      ]),
      type: PropTypes.string,
    })
  ).isRequired,
  isModal: PropTypes.bool,
};

TabPanelContent.defaultProps = {
  isModal: false,
};

export default TabPanelContent;
