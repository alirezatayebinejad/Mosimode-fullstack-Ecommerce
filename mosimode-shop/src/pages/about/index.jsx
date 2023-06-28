import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import PagesHeader from "@/components/Banner/PagesHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AboutPage = () => {
	const { t } = useTranslation("all");
	return (
		<>
			<Head>
				<title>
					{t("About")} | {t("Mosimode")}
				</title>
				<meta name="description" content="search page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<PagesHeader title={t("About Us")} />
			<div className={styles.container}>
				<h2 className={styles.heading}>
					{t("About")} {t("Mosimode")}
				</h2>
				<div className={styles.content}>
					<h3 className={styles.subheading}>{t("Our Story")}</h3>
					<p>{t("Mosimode is a...")}</p>
				</div>
				<div className={styles.content}>
					<h3 className={styles.subheading}>{t("Our Collections")}</h3>
					<div>
						<Image src="/assets/banners/about1.jpg" alt="Collection 1" width={976} height={488} className={styles.image} priority />
						<p>{t("Our collection showcases...")}</p>
					</div>
					<div>
						<Image src="/assets/banners/about2.jpg" alt="Collection 2" width={400} height={300} className={styles.image} />
						<p>{t("Our curated selection...")}</p>
					</div>
				</div>
				<div className={styles.content}>
					<h3 className={styles.subheading}>{t("Visit Us")}</h3>
					<p>{t("We invite you...")}</p>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AboutPage;

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
