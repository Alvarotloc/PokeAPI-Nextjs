import { Grid, Text } from "@nextui-org/react";
import { NextPage } from "next";
import Layout from "../../components/layouts/Layout";
import PokemonCard from "../../components/pokemon/PokemonCard";
import useFavoritos from "../../hooks/useFavoritos";
import type { IFavoritosProvider } from "../../interfaces";

const Favoritos: NextPage = (): JSX.Element => {
  const { pokesFavoritos }: IFavoritosProvider = useFavoritos();
  return (
    <Layout title="Pokémon Favoritos">
      <Grid.Container gap={2} justify="flex-start">
        {pokesFavoritos.length > 0 ? (
        pokesFavoritos.map((pokemon) => (
                 <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} img={pokemon.sprites.front_default} /> 
              ))
        ): <Text h1>No hay Pokémons Favoritos</Text>}
      </Grid.Container>
    </Layout>
  );
};

export default Favoritos;
