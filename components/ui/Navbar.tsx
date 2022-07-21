import { Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <div
      className="navbar"
      style={{
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <Image
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
        }
        alt="Icono pokémon"
        width={70}
        height={80}
      />

      <Link href='/'>
        <a style={{cursor : 'pointer', display:'flex'}}>
        <Text color="white" h1>
          P
        </Text>
        <Text color="white" h2>
          okémon
        </Text>
        </a>
      </Link>
      <Spacer css={{ flex: 1 }} />
      <Link href='/favoritos'>
        <Text color="white" h2 css={{cursor : 'pointer'}}>Favoritos</Text>
      </Link>
    </div>
  );
};

export default Navbar;
