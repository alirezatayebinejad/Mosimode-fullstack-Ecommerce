import Head from 'next/head'
import HomePage from './Home/index.jsx'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer.jsx'

export default function Home() {
  return (
    <>
      <Head>
        <title>mosimode</title>
        <meta name="description" content="mosimode ecommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Header />
        <HomePage />
        <Footer />
      </main>
    </>
  )
}
