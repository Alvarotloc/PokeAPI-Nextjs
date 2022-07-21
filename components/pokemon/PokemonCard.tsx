import { FC } from "react";
import { Grid, Card, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
interface PokemonCardProps {
  name: string;
  img: string;
  id: number;
}

const PokemonCard: FC<PokemonCardProps> = ({ name, img, id }): JSX.Element => {
  const router = useRouter();
  const clickPokemon = () => {
    router.push(`/name/${name}`);
  };
  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable onClick={clickPokemon}>
        <Card.Body css={{ px: 5, py: 10 }}>
          <Card.Image
            src={img}
            alt={`Imagen de pokémon: ${name}`}
            width="100%"
            height={140}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize" h3>
              {name}
            </Text>
            <Text h3>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
