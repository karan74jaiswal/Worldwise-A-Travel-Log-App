import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import MarkerList from "./MarkerList";
import Button from "./Button";
import useGeolocation from "../hooks/useGeoLocation";
import useCoordinates from "../hooks/useCoordinates";
import User from "./User";
function Map() {
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [lat, lng] = useCoordinates();

  useEffect(() => {
    if (lat && lng) setMapPosition([+lat, +lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) setMapPosition(geoLocationPosition);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerList />
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
      {!geoLocationPosition ? (
        <Button onClick={() => getPosition()}>
          {isLoadingPosition ? "Loading..." : "USE YOUR POSITION"}
        </Button>
      ) : null}
      <User />
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    navigate(`form?lat=${lat}&lng=${lng}`);
  });
  return null;
}
export default Map;
