import securityCameraIconPng from "../Images/securityCameraPng.png";
import L from "leaflet";

// Fix Leaflet's default icon paths (this is necessary even when using custom icons)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: null,
  iconUrl: null,
  shadowUrl: null,
});

export const CameraIcon = new L.Icon({
  iconUrl: securityCameraIconPng,
  iconRetinaUrl: securityCameraIconPng,
  iconSize: [12, 12],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

export const SelectedCameraIcon = new L.Icon({
  iconUrl: securityCameraIconPng,
  iconRetinaUrl: securityCameraIconPng,
  iconSize: [24, 24], // Slightly larger size
  iconAnchor: [22.5, 45],
  popupAnchor: [0, -45],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});
