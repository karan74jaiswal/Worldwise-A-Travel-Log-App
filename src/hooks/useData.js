import { useReducer, useCallback } from "react";

const reducer = function (state, action) {
  switch (action.type) {
    case "getCitiesData":
      return {
        ...state,
        cities: action.payload,
        loading: false,
      };

    case "setLoading":
      return {
        ...state,
        loading: action.payload,
      };
    case "handleActiveCity":
      return {
        ...state,
        currentCity: action.payload,
        loading: false,
      };
    case "addNewCity":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
        currentCity: action.payload,
      };
    case "deleteCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:
          state.currentCity.id === action.payload ? {} : state.currentCity,
        loading: false,
      };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      console.log("No such action type defined");
  }
};

const useData = function () {
  const [state, dispatch] = useReducer(reducer, {
    cities: [],
    loading: false,
    currentCity: {},
    error: "",
  });

  const getCities = useCallback(function (data) {
    const temp = data.map((city) => {
      console.log(city);
      return { ...city, date: city.date.toDate() };
    });
    dispatch({
      type: "getCitiesData",
      payload: temp,
    });
  }, []);

  const getCurrentCity = useCallback(
    async function (id) {
      if (+id === +state.currentCity.id) return;
      dispatch({ type: "setLoading", payload: true });
      try {
        const [data] = state.cities.filter((city) => city.id === id);
        dispatch({
          type: "handleActiveCity",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    },
    [state.currentCity.id, state.cities]
  );

  const createNewCity = async function (newCity) {
    dispatch({ type: "setLoading", payload: true });
    dispatch({
      type: "addNewCity",
      payload: newCity,
    });
  };
  const deleteCity = async function (id) {
    dispatch({ type: "setLoading", payload: true });
    dispatch({
      type: "deleteCity",
      payload: id,
    });
  };

  return {
    state,
    getCurrentCity,
    createNewCity,
    deleteCity,
    getCities,
  };
};

export default useData;
