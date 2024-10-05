import React from "react";
import ReactDOMServer from "react-dom/server";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import L from "leaflet";

// Create an image from the MUI icon so we can use it with Leaflet
const createIconImage = (size, color) => {
  // Render the icon as static HTML
  const iconMarkup = ReactDOMServer.renderToString(
    <LocationOnIcon style={{ fontSize: size, color: color }} /> // Adjust the color and size as needed
  );

  // Create an SVG wrapper for the icon markup
  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
      <foreignObject width="100%" height="100%">
        ${iconMarkup}
      </foreignObject>
    </svg>
  `;

  // Convert the SVG to a base64-encoded image
  const svgBase64 = `data:image/svg+xml;base64,${btoa(svgMarkup)}`;
  return svgBase64;
};

// Fix Leaflet's default icon paths (this is necessary even when using custom icons)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: null,
  iconUrl: null,
  shadowUrl: null,
});

export const MapMarker = new L.Icon({
  iconUrl: createIconImage(24, "#d00"),
  iconRetinaUrl: createIconImage(48, "#d00"),
  iconSize: [24, 24], // [12, 12],
  iconAnchor: [12, 24], // [15, 30],
  popupAnchor: [0, -24],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

export const SelectedMapMarker = new L.Icon({
  iconUrl: createIconImage(48, "#FF0000"),
  iconRetinaUrl: createIconImage(96, "#FF0000"),
  iconSize: [36, 36], // [24, 24], // Slightly larger size
  iconAnchor: [18, 36], //[22.5, 45],
  popupAnchor: [0, 36], //[0, -45],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});
