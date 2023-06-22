import Head from "next/head";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer.jsx";
import Banner from "@/components/Banner/Banner.jsx";
import Features from "@/components/Sections/Features.jsx";
import Products from "@/components/Sections/Products.jsx";
import OffBanner from "@/components/Sections/OffBanner";

export default function Home({ products }) {
	return (
		<>
			<Head>
				<title>mosimode shop</title>
				<meta name="description" content="mosimode ecommerce website" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>
				<div>
					<Banner />
					<Features />
					<Products products={products} title="New Arrivals" />
					<OffBanner />
					<Products products={products} title="Popular items" />
				</div>
				<Footer />
			</main>
		</>
	);
}
export async function getServerSideProps() {
	const response = await fetch("http://localhost:3000/api/getProducts");
	const data = await response.json();
	return {
		props: {
			products: data.slice(0, 10),
		},
	};
}
