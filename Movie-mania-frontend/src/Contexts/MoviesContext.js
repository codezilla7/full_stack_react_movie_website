import{ createContext, useReducer } from "react";

export const MoviesContext = createContext();

export const moviesReducer = (state, action) => {
  switch (action.type) {
    case "updateCat":
      return {movies: action.payload };
    default:
      return state;
  }
};

export const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, {
    movies: [],
  });

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};
