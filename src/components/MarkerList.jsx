import { Marker, Popup } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";

function MarkerList() {
  const {
    state: { cities },
  } = useCities();
  return (
    <>
      {cities.map(({ position, id, emoji, cityName }) => (
        <Marker position={[position.lat, position.lng]} key={id}>
          <Popup>
            <span>{emoji}</span>
            <span>{cityName}</span>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default MarkerList;
