import { createContext, useContext } from "react";
import useData from "../hooks/useData";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [state, dispatch] = useData();

  return (
    <CitiesContext.Provider value={{ state, dispatch }}>
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = function () {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("Cities Context was used outside the Cities Provider");
  return context;
};

export { CitiesProvider, useCities };
