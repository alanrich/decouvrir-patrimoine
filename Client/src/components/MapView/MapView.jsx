import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapController from "./MapController";
import { SelectedMapMarker, MapMarker } from "../../assets/MapIcons/mapMarker";

const MapView = ({
  domainObjects,
  selectedObject,
  onSelect,
  selectedObjectLoaded,
}) => {
  const initialPosition =
    domainObjects.length > 0
      ? [domainObjects[0].latitude, domainObjects[0].longitude]
      : [46.603354, 1.888334];

  return (
    <MapContainer
      center={initialPosition}
      zoom={6}
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
      {domainObjects
        .filter((object) => object.latitude != null && object.longitude != null)
        .map((object, index) => {
          return (
            <Marker
              key={index}
              position={[object.latitude, object.longitude]}
              icon={object === selectedObject ? SelectedMapMarker : MapMarker}
              eventHandlers={{
                click: () => {
                  onSelect(object);
                },
              }}
            >
              <Popup>
                <div>
                  <strong>{object.name}</strong>
                  <br />
                  City: {object.city}
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default MapView;
