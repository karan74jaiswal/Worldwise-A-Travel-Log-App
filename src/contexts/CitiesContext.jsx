import { createContext, useContext, useMemo } from "react";
import useData from "../hooks/useData";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const { state, getCurrentCity, createNewCity, deleteCity } = useData();
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
