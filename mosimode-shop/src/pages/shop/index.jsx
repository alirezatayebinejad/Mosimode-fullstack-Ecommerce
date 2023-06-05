import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ShopProducts from "@/components/Sections/ProductsLists";
import PagesHeader from "@/components/Banner/PagesHeader";
const Shop = ({ products }) => {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState("");

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};
	useEffect(() => {
		const { category } = router.query;
		if (category) {
			setSelectedCategory(category);
		}
	}, [router.query]);
	return (
		<>
			<Head>
				<title>Shop | mosimode</title>
				<meta name="description" content="Shop page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>
				<PagesHeader title={"Explore the shop"} />
				<div className={styles.categoryfilter}>
					<h3>choose a category</h3>
					<div className={styles.categorybuttons}>
						<button className={selectedCategory === "" ? styles.activeButton : ""} onClick={() => handleCategoryChange("")}>
							All
						</button>
						<button className={selectedCategory === "men's clothing" ? styles.activeButton : ""} onClick={() => handleCategoryChange("men's clothing")}>
							Men's Clothing
						</button>
						<button className={selectedCategory === "women's clothing" ? styles.activeButton : ""} onClick={() => handleCategoryChange("women's clothing")}>
							Women's Clothing
						</button>
						<button className={selectedCategory === "electronics" ? styles.activeButton : ""} onClick={() => handleCategoryChange("electronics")}>
							Electronics
						</button>
						<button className={selectedCategory === "jewelery" ? styles.activeButton : ""} onClick={() => handleCategoryChange("jewelery")}>
							Jewelery
						</button>
					</div>
				</div>

				<div>
					<ShopProducts products={products} selectedCategory={selectedCategory} />
				</div>
			</main>
			<Footer />
		</>
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

export default Shop;
