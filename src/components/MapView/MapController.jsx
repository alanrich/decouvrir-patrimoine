import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = ({ selectedObject, selectedObjectLoaded }) => {
  const map = useMap();

  useEffect(() => {
    if (
      selectedObject &&
      selectedObjectLoaded &&
      selectedObject.latitude != null &&
      selectedObject.longitude != null
    )
      map.setView(
        [selectedObject.latitude, selectedObject.longitude],
        map.getZoom(),
        { animate: true }
      );
  }, [selectedObject, map, selectedObjectLoaded]);

  return null;
};

export default MapController;
