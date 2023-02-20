import React, { createContext, useReducer } from 'react';

export const FavContext = createContext();

const initialState = {
  movies: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add-movie':
      return { ...state, movies: [...state.movies, action.payload] };
    default:
      return state;
  }
};


export const FavouritesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state, 'movie')
  return (
    <FavContext.Provider value={{ state, dispatch }}>
      {children}
    </FavContext.Provider>
  );
};
