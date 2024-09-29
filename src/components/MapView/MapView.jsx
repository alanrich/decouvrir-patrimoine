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
  const getCoordinates = (object) => {
    if (object.geo_point_2d) {
      // For videoprotection dataset
      return [object.geo_point_2d.lat, object.geo_point_2d.lon];
    } else if (object.coordonnees) {
      // For museums dataset
      return [object.coordonnees.lat, object.coordonnees.lon];
    } else {
      return null; // Coordinates not available
    }
  };

  const initialPosition =
    domainObjects.length > 0
      ? getCoordinates(domainObjects[0]) || [48.8192, 2.2389]
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

      {domainObjects
        // validate the surveillance camera has a geoLocation before giving it a ma
        .filter((object) => {
          const coords = getCoordinates(object);
          return coords && coords[0] != null && coords[1] != null;
        })
        .map((object, index) => {
          const coords = getCoordinates(object);
          return (
            <Marker
              key={index}
              position={coords}
              icon={object === selectedObject ? SelectedCameraIcon : CameraIcon}
              // TODO: Memoize the click handler with a useCallBack if we add more complex children to the popup,
              // like photos of persons of interest or warning alerts for high activity or recent events
              eventHandlers={{
                click: () => {
                  onSelect(object);
                },
              }}
            >
              <Popup>
                <div>
                  <strong>{object.adresse || object.nom_officiel}</strong>
                  <br />
                  Municipality: {object.commune}
                  <br />
                  INSEE Code: {object.code_insee}
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default MapView;
