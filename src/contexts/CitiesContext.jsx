import { createContext, useContext, useEffect, useMemo } from "react";
import { updateCitiesInUserDocument } from "../utils/firebase";
import useData from "../hooks/useData";
import { useAuth } from "./AuthContext";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const { state, getCurrentCity, createNewCity, deleteCity, getCities } =
    useData();
  const { userData } = useAuth();

  useEffect(() => {
    console.log(userData);
    if (userData) getCities(userData.cities);
  }, [userData, getCities]);

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
