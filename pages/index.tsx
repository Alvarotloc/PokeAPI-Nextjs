import { Grid } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";
import Layout from "../components/layouts/Layout";
import PokemonCard from "../components/pokemon/PokemonCard";
import type { PokeapiResponse, PokemonSmall } from "../interfaces";

interface Props {
  pokemon: PokemonSmall[];
}

const HomePage: NextPage<Props> = ({ pokemon }): JSX.Element => {
  return (
    <Layout>
      <Grid.Container gap={2} justify="flex-start">
        {pokemon.map(({ name, img, id }) => (
           <PokemonCard key={id} id={id} name={name} img={img} /> 
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const response = await fetch(
    `${process.env.BASE_API_POKEMON}/pokemon?limit=151`
  );
  const { results }: PokeapiResponse = await response.json();
  const pokemons = results.map((poke, id) => {
    return {
      ...poke,
      id: id + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        id + 1
      }.svg`,
    };
  });
  return {
    props: {
      pokemon: pokemons,
    },
  };
};

export default HomePage;
