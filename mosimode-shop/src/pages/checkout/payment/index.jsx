import React from "react";
import styles from "./index.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const PaymentPage = () => {
	const { t } = useTranslation("all");
	return (
		<>
			<Header />
			<div className={styles.pageContainer}>
				<h1>{t("currently unavailable")}</h1>
			</div>
			<Footer />
		</>
	);
};
export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}

export default PaymentPage;
