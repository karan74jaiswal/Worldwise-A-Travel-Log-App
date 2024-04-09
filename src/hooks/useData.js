import { useReducer, useEffect } from "react";

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

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "setLoading", payload: true });
      try {
        const data = await (await fetch(`http://localhost:3000/cities`)).json();
        dispatch({
          type: "getCitiesData",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }
    fetchData();
  }, []);

  const getCurrentCity = async function (id) {
    if (+id === +state.currentCity.id) return;
    dispatch({ type: "setLoading", payload: true });
    try {
      const data = await (
        await fetch(`http://localhost:3000/cities/${id}`)
      ).json();
      console.log(data);
      dispatch({
        type: "handleActiveCity",
        payload: data,
      });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  const createNewCity = async function (newCity) {
    dispatch({ type: "setLoading", payload: true });
    try {
      const city = await (
        await fetch(`http://localhost:3000/cities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCity),
        })
      ).json();
      dispatch({
        type: "addNewCity",
        payload: city,
      });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  };
  const deleteCity = async function (id) {
    dispatch({ type: "setLoading", payload: true });
    try {
      await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "deleteCity",
        payload: id,
      });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  return { state, getCurrentCity, createNewCity, deleteCity };
};

export default useData;
