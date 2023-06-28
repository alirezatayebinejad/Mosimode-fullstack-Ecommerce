import React from "react";
import styles from "./OffBanner.module.css";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const OffBanner = () => {
	const { t } = useTranslation("all");
	const router = useRouter();

	return (
		<section className={styles.off_banner}>
			<h4>{t("Repair Services")}</h4>
			<h2>{t("Up to 70% Off - All t-Shirts & Accessories")}</h2>
			<Link href={"/shop"} locale={router.locale}>
				<button className={styles.button}>{t("Explore More")}</button>
			</Link>
		</section>
	);
};

export default OffBanner;
