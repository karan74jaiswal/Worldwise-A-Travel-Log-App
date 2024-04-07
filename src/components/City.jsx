import { useCities } from "../contexts/CitiesContext";
import styles from "./City.module.css";
import { useParams, useNavigate } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const navigate = useNavigate();
  const {
    state: { cities },
    dispatch,
  } = useCities();
  const { id } = useParams();
  const [currentCity] = cities.filter((city) => id === city.id);
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  // const currentCity = city;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div
      className={styles.city}
      onClick={() => dispatch({ type: "handleActiveCity", payload: id })}
    >
      <div className={styles.row}>
        <h6>city name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <button onClick={() => navigate("..")}>Back</button>
        {/* <ButtonBack /> */}
      </div>
    </div>
  );
}

export default City;
