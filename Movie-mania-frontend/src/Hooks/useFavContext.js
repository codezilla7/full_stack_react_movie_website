import { useContext } from 'react'
import { FavContext } from '../Contexts/FavContext'

export default function useFavContext() {
    const context = useContext(FavContext)

  return context
}
