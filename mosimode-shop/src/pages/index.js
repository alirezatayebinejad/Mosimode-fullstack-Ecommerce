import Head from 'next/head'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer.jsx'
import Banner from '@/components/Banner/Banner.jsx'
import Features from '@/components/Sections/Features.jsx'
import Products from '@/components/Sections/Products.jsx'

export default function Home({ products }) {
  console.log("products home:", products);
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
        <div>
          <Banner />
          <Features />
          <Products products={products} />
        </div>
        <Footer />
      </main>
    </>
  )
}
export async function getServerSideProps() {
  console.log("Pre-rendering items");
  const response = await fetch("https://fakestoreapi.com/products/");
  const data = await response.json();
  return {
    props: {
      products: data,
    },
  };
}