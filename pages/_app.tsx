import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";
import { darkTheme } from "../themes/darktheme";
import { FavoritosProvider } from "../context/FavoritosProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <FavoritosProvider>
        <Component {...pageProps} />
      </FavoritosProvider>
    </NextUIProvider>
  );
}

export default MyApp;
