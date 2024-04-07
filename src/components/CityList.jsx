import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
function CityList({ cities, isLoading }) {
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
