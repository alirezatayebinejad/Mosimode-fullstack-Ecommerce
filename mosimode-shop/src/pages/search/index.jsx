import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import PagesHeader from "@/components/Banner/PagesHeader";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductsLists from "@/components/Sections/ProductsLists";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const SearchPage = () => {
	const { t } = useTranslation("all");
	const [products, setProducts] = useState([]);
	const router = useRouter();
	const searchTerm = router.query.search;

	useEffect(() => {
		if (searchTerm) axios.get(`/api/search?keyword=${searchTerm}`).then((res) => setProducts(res.data.products));
	}, [searchTerm]);

	return (
		<div>
			<>
				<Head>
					<title>
						{t("search")}={searchTerm}
					</title>
					<meta name="description" content="search page" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header />
				<main>
					<PagesHeader title={`${t("search")}: ${searchTerm}`} />
					<h2 align="center">
						<br />
						{t("results")}:
						<br />
						<br />
					</h2>
					<div>
						<ProductsLists products={products} selectedCategory={""} />
					</div>
				</main>
				<Footer />
			</>
		</div>
	);
};

export default SearchPage;

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
