import Layout from "../../components/layouts/Layout";
import type { PokemonBig, IFavoritosProvider } from "../../interfaces";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import useFavoritos from "../../hooks/useFavoritos";

interface Props {
  pokemon: PokemonBig;
}

const PokemonPage: NextPage<Props> = ({ pokemon }): JSX.Element => {
  const { pokesFavoritos, setPokesFavoritos }: IFavoritosProvider =
    useFavoritos();
  const setFavorito = () => {
    setPokesFavoritos([...pokesFavoritos, pokemon]);
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

              {pokesFavoritos.find(
                (pokemonFavorito) => pokemonFavorito.id === pokemon.id
              ) ? (
                ""
              ) : (
                <Button color="gradient" ghost onPress={setFavorito}>
                  Guardar en favoritos
                </Button>
              )}
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
  const pokemon151: string[] = [...Array(151)].map(
    (value, index) => `${index + 1}`
  );

  return {
    paths: pokemon151.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const resp = await fetch(`${process.env.BASE_API_POKEMON}/pokemon/${id}`);
  const pokemon: PokemonBig = await resp.json();

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonPage;
