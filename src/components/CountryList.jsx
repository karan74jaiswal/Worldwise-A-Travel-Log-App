import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const {
    state: { cities: countries, loading: isLoading },
  } = useCities();
  if (isLoading) return <Spinner />;
  if (countries.length > 0) {
    const newCountries = Array.from(
      new Set(
        countries.map((el) => {
          return { country: el.country, emoji: el.emoji, id: el.id };
        })
      ),
      (_) => _
    );
    return (
      <ul className={styles.countryList}>
        {newCountries.map((country) => (
          <CountryItem country={country} key={country.id} />
        ))}
      </ul>
    );
  }
  return (
    <Message message="Add first Country by clicking on a city on the map" />
  );
}

export default CountryList;
