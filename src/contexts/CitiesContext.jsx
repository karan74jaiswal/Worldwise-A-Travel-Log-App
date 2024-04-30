import { createContext, useContext, useEffect, useMemo } from "react";
import { updateCitiesInUserDocument } from "../utils/firebase";
import useData from "../hooks/useData";
import { useAuth } from "./AuthContext";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const { state, getCurrentCity, createNewCity, deleteCity, getCities } =
    useData();
  const { userData, userObject: user } = useAuth();

  useEffect(() => {
    if (userData) getCities(userData.cities);
  }, [userData, getCities]);

  useEffect(() => {
    if (user && state.cities.length >= 0)
      updateCitiesInUserDocument(user.uid, state.cities);
  }, [state.cities]);

  const value = useMemo(() => {
    return { state, getCurrentCity, createNewCity, deleteCity };
  }, [state, getCurrentCity, createNewCity, deleteCity]);
  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

const useCities = function () {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("Cities Context was used outside the Cities Provider");
  return context;
};

export { CitiesProvider, useCities };
