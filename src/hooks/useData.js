import { useReducer, useEffect } from "react";

const reducer = function (state, action) {
  switch (action.type) {
    case "getCitiesData":
      return {
        ...state,
        cities: action.payload,
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
      };
    case "addNewCity":
      return { ...state, cities: [...state.cities, action.payload] };
    default:
      console.log("No such action type defined");
  }
};

const useData = function () {
  const [state, dispatch] = useReducer(reducer, {
    cities: [],
    loading: false,
    currentCity: {},
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
        console.log(err);
      } finally {
        dispatch({ type: "setLoading", payload: false });
      }
    }
    fetchData();
  }, []);

  const getCurrentCity = async function (id) {
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
      console.log(err);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const createNewCity = async function (newCity) {
    try {
      dispatch({ type: "setLoading", payload: true });
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
      console.log(err);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  };

  return [state, dispatch, getCurrentCity, createNewCity];
};

export default useData;
