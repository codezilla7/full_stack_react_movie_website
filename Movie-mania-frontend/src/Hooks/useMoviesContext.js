import { useContext } from 'react'
import { MoviesContext } from '../Contexts/MoviesContext'

export default function useMoviesContext() {
    const Context = useContext(MoviesContext) 

    if (!Context) {
      throw Error('useMoviesContext must be used inside an AuthMoviesProvider')
    }
  return Context
}
