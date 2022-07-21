import type { FC } from "react"
import Head from "next/head"
import type { PropsLayout } from '../../interfaces/index';
import Navbar from '../ui/Navbar';

const origin:string = (typeof window !== "undefined" && window.location.origin) || "";

const Layout:FC<PropsLayout> = ({children, title}):JSX.Element => {

  return (
    <>
    <Head>
        <title>{title || 'Pokémon App'}</title>
        <meta name="author" content="Álvaro Suárez"/>
        <meta name="description" content={`Información sobre el pokémon: ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
        <meta property="og:title" content={`Informacióm sobre: ${title}`} />
<meta property="og:description" content="Esta es mi página web sobre pokémon" />
<meta property="og:image" content={`${origin}/img/banner.png`} />
    </Head>
    <Navbar />
    <main className="main-app">
        {children}
    </main>
    </>

  )
}

export default Layout