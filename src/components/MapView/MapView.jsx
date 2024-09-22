import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ domainObjects, selectedObject, onSelect }) => {
  // Define initial map center coordinates
  const initialPosition =
    domainObjects.length > 0
      ? [domainObjects[0].geo_point_2d.lat, domainObjects[0].geo_point_2d.lon]
      : [48.8566, 2.3522]; // Default to Paris Centre Ville if no other location is given

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
      {domainObjects.map((object, index) => (
        <Marker
          key={index}
          position={[object.geo_point_2d.lat, object.geo_point_2d.lon]}
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
