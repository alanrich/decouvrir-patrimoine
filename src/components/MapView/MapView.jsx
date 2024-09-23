import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapController from "./MapController"; // Extracted to its own file
import {
  SelectedCameraIcon,
  CameraIcon,
} from "../../assets/MapIcons/SecurityCameraIcon";

const MapView = ({
  domainObjects,
  selectedObject,
  onSelect,
  selectedObjectLoaded,
}) => {
  const initialPosition =
    domainObjects.length > 0
      ? [domainObjects[0].geo_point_2d.lat, domainObjects[0].geo_point_2d.lon]
      : [48.8192, 2.2389]; // Default Map Center, just south of bois du boulogne for now, reassess if we find more data sets for paris

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <MapController
        selectedObject={selectedObject}
        selectedObjectLoaded={selectedObjectLoaded}
      />

      {domainObjects.map((object, index) => (
        <Marker
          key={index}
          position={[object.geo_point_2d.lat, object.geo_point_2d.lon]}
          icon={object === selectedObject ? SelectedCameraIcon : CameraIcon}
          eventHandlers={{
            click: () => {
              onSelect(object);
            },
          }}
        >
          <Popup>
            <div>
              <strong>{object.adresse}</strong>
              <br />
              Municipality: {object.commune}
              <br />
              INSEE Code: {object.code_insee}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
