import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <div className={styles.map}>
        <h1>map</h1>
        <h1>lat:{lat}</h1>
        <h1>lng:{lng}</h1>
      </div>
    </div>
  );
}

export default Map;
