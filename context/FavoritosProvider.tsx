import { createContext, useState } from "react"
import type { PokemonBig } from "../interfaces";
import { IChildren } from '../interfaces/index';

const FavoritosContext = createContext<any>({});
const FavoritosProvider = ({children}:IChildren) => {
    const [pokesFavoritos, setPokesFavoritos] = useState<PokemonBig[]>([]);
  return (
    <FavoritosContext.Provider value={{
        pokesFavoritos,
        setPokesFavoritos
    }}>{children}</FavoritosContext.Provider>
  )
}
export {FavoritosProvider}
export default FavoritosContext