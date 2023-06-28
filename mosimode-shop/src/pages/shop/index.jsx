import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductsLists from "@/components/Sections/ProductsLists";
import PagesHeader from "@/components/Banner/PagesHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ShopPage = ({ products, categoryList }) => {
	const { t } = useTranslation("all");
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
				<title>
					{t("Shop")} | {t("mosimode")}
				</title>
				<meta name="description" content="Shop page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>
				<PagesHeader title={t("Explore the shop")} />
				<div className={styles.categoryfilter}>
					<h3>{t("choose a category")}</h3>
					<div className={styles.categorybuttons}>
						<button className={selectedCategory === "" ? styles.activeButton : ""} onClick={() => handleCategoryChange("")}>
							{t("All")}
						</button>
						{categoryList.map((item) => (
							<button key={item} className={selectedCategory === item ? styles.activeButton : ""} onClick={() => handleCategoryChange(item)}>
								{item}
							</button>
						))}
					</div>
				</div>

				<div>
					<ProductsLists products={products} selectedCategory={selectedCategory} />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default ShopPage;

export async function getServerSideProps({ locale }) {
	const response = await fetch(`${process.env.WEBSITE_DOMAIN}/api/getProducts`);
	const data = await response.json();
	const categoryList = [];
	data.forEach((item) => {
		if (item.category) {
			item.category.forEach((category) => {
				if (category.name && !categoryList.includes(category.name)) {
					categoryList.push(category.name);
				}
			});
		}
	});

	return {
		props: {
			products: data,
			categoryList,
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
