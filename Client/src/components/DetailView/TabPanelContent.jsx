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

const Field = ({ title, value, type, isModal, fontSize, isWikiContent }) => {
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
    // Remove unwanted elements
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

    // Remove "Article détaillé" links
    const articleDetailLinks = doc.querySelectorAll(
      "div.mainarticle, div.hatnote"
    );
    articleDetailLinks.forEach((el) => el.remove());

    return doc.body.innerHTML;
  };

  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const chunkSize = 5000; // Adjust as needed

  const handleToggleExpand = () => {
    const cleanHtml = cleanContent(value);
    const totalLength = cleanHtml.length;
    const nextIndex = Math.min(currentIndex + chunkSize, totalLength);

    setDisplayedContent(cleanHtml.slice(0, nextIndex));
    setCurrentIndex(nextIndex);
  };

  // Initialize displayed content
  React.useEffect(() => {
    if (isWikiContent) {
      handleToggleExpand();
    }
  }, [value]);

  // Handle URLs when type is 'URL'
  if (type === "URL") {
    let urls = [];
    if (typeof value === "string") {
      // Check if the string is a JSON array
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          urls = JSON.parse(value);
        } catch (e) {
          // If parsing fails, treat as a single URL
          urls = [value];
        }
      } else {
        urls = [value];
      }
    } else if (Array.isArray(value)) {
      urls = value;
    } else {
      urls = ["Non disponible"];
    }

    // Ensure each URL starts with 'http://' or 'https://' only if it's a valid URL
    const formattedUrls = urls.map((url) => {
      if (typeof url !== "string") return "Non disponible"; // Handle non-string values

      const trimmedUrl = url.trim(); // Remove any leading/trailing whitespace

      if (trimmedUrl.toLowerCase() === "non disponible") {
        return "Non disponible";
      }
      if (!/^https?:\/\//i.test(trimmedUrl)) {
        return "http://" + trimmedUrl; // Default to http:// if no protocol is present
      }
      return trimmedUrl;
    });

    return (
      <Box sx={commonStyles}>
        {title && (
          <>
            <FieldTitle variant={titleVariant} isModal={isModal}>
              {title}:
            </FieldTitle>
            <Divider sx={{ marginBottom: theme.spacing(1) }} />
          </>
        )}
        {formattedUrls.map((url, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              marginLeft: theme.spacing(1),
              fontSize: valueFontSize,
              marginBottom: theme.spacing(1),
            }}
          >
            {url.toLowerCase() === "non disponible" ? (
              "Non disponible"
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            )}
          </Typography>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={commonStyles}>
      {title && (
        <>
          <FieldTitle variant={titleVariant} isModal={isModal}>
            {title}:
          </FieldTitle>
          <Divider sx={{ marginBottom: theme.spacing(1) }} />
        </>
      )}
      {isWikiContent ? (
        <>
          <Typography
            variant="body1"
            sx={{
              marginLeft: theme.spacing(1),
              fontSize: valueFontSize,
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(displayedContent),
            }}
          ></Typography>
          {/* Show "Voir Plus" button if not all content is displayed */}
          {currentIndex < cleanContent(value).length && (
            <Button onClick={handleToggleExpand} size="small">
              Voir plus
            </Button>
          )}
        </>
      ) : typeof value === "string" ? (
        <Typography
          variant="body1"
          sx={{
            marginLeft: theme.spacing(1),
            fontSize: valueFontSize,
          }}
        >
          {value}
        </Typography>
      ) : (
        value
      )}
    </Box>
  );
};

Field.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  isModal: PropTypes.bool,
  fontSize: PropTypes.string,
  isWikiContent: PropTypes.bool,
};

Field.defaultProps = {
  type: "text",
  isModal: false,
  isWikiContent: false,
};

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
