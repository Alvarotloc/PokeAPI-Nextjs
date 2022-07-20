import type { FC } from "react"
import Head from "next/head"
import type { PropsLayout } from '../../interfaces/index';
import Navbar from '../ui/Navbar';

const Layout:FC<PropsLayout> = ({children, title}):JSX.Element => {
  return (
    <>
    <Head>
        <title>{title || 'Pokémon App'}</title>
        <meta name="author" content="Álvaro Suárez"/>
        <meta name="description" content="Información sobre el pokémon: Charizard" />
        <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
    </Head>
    <Navbar />
    <main className="main-app">
        {children}
    </main>
    </>

  )
}

export default Layout