import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import PagesHeader from "@/components/Banner/PagesHeader";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ShopProducts from "@/components/Sections/ProductsLists";

const SearchPage = ({ products }) => {
	console.log("products", products);
	const router = useRouter();
	const searchTerm = router.query.search;
	return (
		<div>
			<>
				<Head>
					<title>Shop | search</title>
					<meta name="description" content="search page" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header />
				<main>
					<PagesHeader title={`search: ${searchTerm}`} />
					<h2 align="center">
						<br />
						results:
						<br />
						<br />
					</h2>
					<div>
						<ShopProducts products={products} selectedCategory={""} />
					</div>
				</main>
				<Footer />
			</>
		</div>
	);
};
export async function getServerSideProps() {
	const response = await fetch("https://fakestoreapi.com/products/");
	const data = await response.json();
	return {
		props: {
			products: data,
		},
	};
}

export default SearchPage;
