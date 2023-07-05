import React from "react";
import styles from "./CallBanners.module.css";
import BannerCard from "../Cards/BannerCard";
import { useTranslation } from "next-i18next";

const CallBanners = () => {
	const { t } = useTranslation("all");

	return (
		<section className={styles.callBanners}>
			<div className={styles.line}>
				<BannerCard header={t("SEASONAL SALE")} subHeader={t("Winter Collection 50% Off")} btnTitle={t("see more")} imageSrc="/assets/banners/bannerCard3.jpg" />
				<BannerCard
					header={t("NEW FOOTWEAR COLLECTION")}
					subHeader={t("Spring/Summer 2022")}
					btnTitle={t("see more")}
					imageSrc="/assets/banners/bannerCard4.jpg"
				/>
				<BannerCard header={t("T-SHIRTS")} subHeader={t("New Trendy Prints")} btnTitle={t("see more")} imageSrc="/assets/banners/bannerCard5.jpg" />
			</div>
			<div className={styles.line}>
				<BannerCard
					header={t("buy 1 get 1 free")}
					subHeader={t("The best classic dress is on sale at coro")}
					btnTitle={t("see more")}
					imageSrc="/assets/banners/bannerCard1.jpg"
				/>
				<BannerCard
					header={t("upcomming season")}
					subHeader={t("The best classic dress is on sale at cara")}
					btnTitle={t("see more")}
					imageSrc="/assets/banners/bannerCard2.jpg"
				/>
			</div>
		</section>
	);
};

export default CallBanners;
