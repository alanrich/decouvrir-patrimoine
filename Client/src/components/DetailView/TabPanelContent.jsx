import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Divider, Box, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";
import DOMPurify from "dompurify";

const FieldTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isModal" && shouldForwardProp(prop),
})(({ theme, isModal }) => ({
  display: "inline-block",
  backgroundColor: theme.palette.grey[400],
  color: "white",
  padding: "6px 12px",
  borderRadius: theme.shape.borderRadiusLarge,
  marginBottom: theme.spacing(1),
  fontSize: isModal
    ? theme.typography.subtitle1.fontSize
    : theme.typography.subtitle2.fontSize,
}));

const Field = ({ title, value, isModal, fontSize }) => {
  const theme = useTheme();
  const isHistoire = title.toLowerCase().includes("histoire");

  const titleVariant = isModal ? "h6" : "subtitle1";
  const valueFontSize =
    fontSize || (isModal ? (isHistoire ? ".8rem" : "1rem") : ".8rem");

  if (!value) {
    value = "Non disponible";
  }

  const commonStyles = {
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    width: "100%", // Make field block consume entire horizontal width
  };

  // Function to clean up the content
  const cleanContent = (htmlContent) => {
    // Remove [modifier | modifier le code] and the first heading tag
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Remove edit sections
    const editSections = doc.querySelectorAll(".mw-editsection");
    editSections.forEach((el) => el.remove());

    // Remove the first heading
    const firstHeading = doc.querySelector("h2, h3, h4, h5, h6");
    if (firstHeading) {
      firstHeading.remove();
    }

    return doc.body.innerHTML;
  };

  const [expanded, setExpanded] = useState(false);
  const maxTextLength = 500; // Adjust as needed

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={commonStyles}>
      <FieldTitle variant={titleVariant} isModal={isModal}>
        {title}:
      </FieldTitle>
      <Divider sx={{ marginBottom: theme.spacing(1) }} />
      {typeof value === "string" ? (
        <Typography
          variant="body1"
          sx={{
            marginLeft: theme.spacing(1),
            fontSize: valueFontSize,
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              expanded
                ? cleanContent(value)
                : cleanContent(value).slice(0, maxTextLength) + "..."
            ),
          }}
        ></Typography>
      ) : (
        <Typography
          variant="body1"
          sx={{
            marginLeft: theme.spacing(1),
            fontSize: valueFontSize,
          }}
        >
          {value}
        </Typography>
      )}
      {/* Show "View More" button if content is longer than maxTextLength */}
      {typeof value === "string" &&
        cleanContent(value).length > maxTextLength && (
          <Button onClick={handleToggleExpand} size="small">
            {expanded ? "Voir moins" : "Voir plus"}
          </Button>
        )}
    </Box>
  );
};

Field.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  isModal: PropTypes.bool,
  fontSize: PropTypes.string,
};

Field.defaultProps = {
  type: "text",
  isModal: false,
};

const TabPanelContent = ({ fields, isModal, fontSize }) => {
  const theme = useTheme();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Grid
        container
        spacing={2}
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "none",
        }}
      >
        {fields.map((field) => (
          <Grid item xs={12} key={field.title}>
            {field.value && (
              <Field {...field} isModal={isModal} fontSize={fontSize} />
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
      title: PropTypes.string.isRequired,
      value: PropTypes.any,
      type: PropTypes.string,
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
