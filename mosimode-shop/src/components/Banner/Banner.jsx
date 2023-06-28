import React from "react";
import Image from "next/image";
import styles from "./Banner.module.css";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Banner = () => {
	const { t } = useTranslation("all");
	const router = useRouter();

	return (
		<div className={styles.banner}>
			<Image src="/assets/banners/banner-main.jpg" className={styles.image} width={1920} height={1080} alt="Picture of the author" priority></Image>
			<div className={styles.banner_content}>
				<h2>{t(`Discover the perfect blend of comfort and style`)}</h2>
				<Link href={"/shop"} locale={router.locale}>
					<button>{t("Shop Now")}</button>
				</Link>
			</div>
		</div>
	);
};

export default Banner;
