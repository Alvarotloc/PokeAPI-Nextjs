import { useContext } from "react"
import FavoritosContext from '../context/FavoritosProvider';

const useFavoritos = () => useContext(FavoritosContext);

export default useFavoritos