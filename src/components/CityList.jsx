import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useAuth } from "../contexts/AuthContext";
import { updateCitiesInUserDocument } from "../utils/firebase";
import { useEffect } from "react";
function CityList() {
  const {
    state: { cities, loading: isLoading },
  } = useCities();
  const { userObject: user } = useAuth();

  useEffect(() => {
    if (user) updateCitiesInUserDocument(user, cities);
  }, [user, cities]);

  if (isLoading) return <Spinner />;
  if (cities.length > 0)
    return (
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    );
  return (
    <Message message="Add your first city by clicking on a city on the map" />
  );
}

export default CityList;
