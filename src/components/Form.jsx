// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import useCoordinates from "../hooks/useCoordinates";
import Message from "./Message";
import { nanoid } from "nanoid";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createNewCity } = useCities();
  const navigate = useNavigate();
  const [lat, lng] = useCoordinates();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    async function getCityDetails() {
      try {
        const { city, countryCode, countryName, locality } = await (
          await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
            { signal: controller.signal }
          )
        ).json();
        if (!city || !countryName || !countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        setCityName(city || locality);
        setCountry(countryName);
        setEmoji(convertToEmoji(countryCode));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    const getCityTimeOut = setTimeout(getCityDetails, 1000);
    return () => {
      if (getCityTimeOut) {
        clearTimeout(getCityTimeOut);
        controller.abort();
      }
    };
  }, [lat, lng]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      id: nanoid(4),
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createNewCity(newCity);
    navigate("../cities");
  }
  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (loading) return <Spinner />;
  if (error) return <Message message={error} />;
  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handleFormSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} type="primary">
          ADD
        </Button>
        <Button onClick={() => navigate("../cities")} type="back">
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
