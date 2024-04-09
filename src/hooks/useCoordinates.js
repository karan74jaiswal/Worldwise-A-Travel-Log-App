import { useSearchParams } from "react-router-dom";

function useCoordinates() {
  const [searchparams, setSearchParams] = useSearchParams();
  const lat = searchparams.get("lat");
  const lng = searchparams.get("lng");
  return [lat, lng];
}

export default useCoordinates;
