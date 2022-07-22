import Layout from "../../components/layouts/Layout";
import type {
  PokemonBig,
  IFavoritosProvider,
  Pokemon,
  PokeapiResponse,
} from "../../interfaces";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import useFavoritos from "../../hooks/useFavoritos";
import confetti from "canvas-confetti";
import getPokemonInfo from "../../utils/getPokemonInfo";

interface Props {
  pokemon: PokemonBig;
}

const PokemonPage: NextPage<Props> = ({ pokemon }): JSX.Element => {
  const { pokesFavoritos, setPokesFavoritos }: IFavoritosProvider =
    useFavoritos();
  const setFavorito = () => {
    if (
      pokesFavoritos.find(
        (pokemonFavorito) => pokemonFavorito.id === pokemon.id
      )
    ) {
      setPokesFavoritos(
        pokesFavoritos.filter(
          (pokemonFavorito) => pokemonFavorito.id !== pokemon.id
        )
      );
      return;
    }
    setPokesFavoritos([...pokesFavoritos, pokemon]);
    confetti({
      zIndex: 100,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };
  return (
    <Layout title={`Pokémon ${pokemon.name}`}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={
                  !pokesFavoritos.find(
                    (pokemonFavorito) => pokemonFavorito.id === pokemon.id
                  )
                }
                onPress={setFavorito}
              >
                {pokesFavoritos.find(
                  (pokemonFavorito) => pokemonFavorito.id === pokemon.id
                )
                  ? "En Favoritos"
                  : "Agregar a Favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const { results }: PokeapiResponse = await response.json();
  const pokemon151 = results.map((pokemon) => pokemon.name);

  return {
    paths: pokemon151.map((name) => ({ params: { name } })),
    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);
  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
