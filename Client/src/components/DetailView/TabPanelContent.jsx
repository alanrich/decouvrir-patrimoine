import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Paper, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const FieldTitle = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "#e0f7fa",
  color: theme.palette.text.primary,
  padding: "6px 12px",
  borderRadius: "20px",
  marginBottom: "8px",
  fontWeight: "bold",
  fontSize: ".8rem",
}));

const Field = ({ title, value, type }) => {
  if (type === "link" && value) {
    return (
      <Grid item xs={12} sm={6}>
        <FieldTitle variant="subtitle1">{title}:</FieldTitle>
        <Link href={`http://${value}`} target="_blank" rel="noopener">
          {value}
        </Link>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6}>
      <FieldTitle variant="subtitle1">{title}:</FieldTitle>
      <Typography variant="body1" sx={{ marginLeft: 1, fontSize: ".8rem" }}>
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
};

Field.defaultProps = {
  type: "text",
};

const TabPanelContent = ({ fields }) => {
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
          <Field key={field.title} {...field} />
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
};

export default TabPanelContent;
