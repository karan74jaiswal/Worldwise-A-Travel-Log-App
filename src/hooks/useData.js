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
        currentCityId: action.payload,
      };
    default:
      console.log("No such action type defined");
  }
};

const useData = function () {
  const [state, dispatch] = useReducer(reducer, {
    cities: [],
    loading: false,
    currentCityId: null,
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
  return [state, dispatch];
};

export default useData;
