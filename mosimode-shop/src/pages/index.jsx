import Head from "next/head";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer.jsx";
import Banner from "@/components/Banner/Banner.jsx";
import Features from "@/components/Sections/Features.jsx";
import Products from "@/components/Sections/Products.jsx";
import OffBanner from "@/components/Sections/OffBanner";
import NewsLetter from "../components/Sections/NewsLetter";
import CallBanners from "../components/Sections/CallBanners";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home({ products }) {
	const { t } = useTranslation("all");
	return (
		<>
			<Head>
				<title>{t("mosimode shop")}</title>
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
					<CallBanners />
					<NewsLetter />
				</div>
			</main>
			<Footer />
		</>
	);
}
export async function getServerSideProps(context) {
	const { locale } = context;
	const response = await fetch(`${process.env.WEBSITE_DOMAIN}/api/getProducts`);
	const data = await response.json();
	return {
		props: {
			products: data.slice(0, 10),
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
