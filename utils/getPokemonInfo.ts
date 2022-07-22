import type { PokemonBig } from '../interfaces/index';
const getPokemonInfo = async (nombre:string) => {
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const {id,name,sprites}: PokemonBig = await resp.json();
         return {
          id,
          name,
          sprites
        }
    } catch (error) {
      console.log('Pokémon no encontrado')
    }
}

export default getPokemonInfo;