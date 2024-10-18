// ArtistImage.jsx

import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useWikiImage } from "../../hooks/wikipedia-hooks/useWikiImage";
import { useTheme } from "@mui/material/styles";

const ArtistImage = ({ artistName }) => {
  const { imageUrl, loading, error } = useWikiImage(artistName);
  const theme = useTheme();

  if (loading) {
    return null; // Don't render anything while loading
  }

  if (!imageUrl || error) {
    return null; // Exclude the artist if there's no image or an error occurred
  }

  return (
    <Box
      sx={{
        width: "45%",
        margin: theme.spacing(1),
        textAlign: "center",
      }}
    >
      <a
        href={`https://fr.wikipedia.org/wiki/${encodeURIComponent(artistName)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={imageUrl}
          alt={`${artistName}`}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: theme.shape.borderRadius,
            cursor: "pointer",
          }}
          loading="lazy"
        />
        <Typography variant="body2" sx={{ marginTop: theme.spacing(1) }}>
          {artistName}
        </Typography>
      </a>
    </Box>
  );
};

ArtistImage.propTypes = {
  artistName: PropTypes.string.isRequired,
};

export default ArtistImage;
