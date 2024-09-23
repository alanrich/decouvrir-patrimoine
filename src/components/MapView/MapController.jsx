import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = ({ selectedObject, selectedObjectLoaded }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedObject && selectedObjectLoaded)
      map.setView(
        [selectedObject.geo_point_2d.lat, selectedObject.geo_point_2d.lon],
        map.getZoom(),
        { animate: true }
      );
  }, [selectedObject, map, selectedObjectLoaded]);

  return null;
};

export default MapController;
