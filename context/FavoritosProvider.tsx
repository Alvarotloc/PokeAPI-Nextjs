import { createContext, FC, useEffect, useState } from "react"
import type { PokemonBig } from "../interfaces";
import { IChildren } from '../interfaces/index';

const FavoritosContext = createContext<any>({});
const FavoritosProvider:FC<IChildren> = ({children}):JSX.Element => {
    const [pokesFavoritos, setPokesFavoritos] = useState<PokemonBig[]>([]);
    useEffect(() => {
        const pokesFavoritosLocal:PokemonBig[] = JSON.parse(localStorage.getItem("pokesFavoritos") || '[]');
        if (pokesFavoritosLocal.length > 0) {
            setPokesFavoritos(pokesFavoritosLocal);
        }
    },[]);
    useEffect(() => {
        localStorage.setItem("pokesFavoritos", JSON.stringify(pokesFavoritos));
    },[pokesFavoritos]);
  return (
    <FavoritosContext.Provider value={{
        pokesFavoritos,
        setPokesFavoritos
    }}>{children}</FavoritosContext.Provider>
  )
}
export {FavoritosProvider}
export default FavoritosContext