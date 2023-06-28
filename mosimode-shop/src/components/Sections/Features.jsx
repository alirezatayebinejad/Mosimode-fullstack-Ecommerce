import React from "react";
import FeaturesCard from "../Cards/FeaturesCard";
import styles from "./Features.module.css";
import { useTranslation } from "next-i18next";

const Features = () => {
	const { t } = useTranslation("all");
	const content = [
		{ id: 0, src: "/assets/features/f1.png", altText: "easy shiping", title: `${t("easy shiping")}` },
		{ id: 1, src: "/assets/features/f2.png", altText: "online order", title: `${t("online order")}` },
		{ id: 2, src: "/assets/features/f3.png", altText: "save money", title: `${t("save money")}` },
		{ id: 3, src: "/assets/features/f4.png", altText: "satisfaction", title: `${t("satisfaction")}` },
		{ id: 4, src: "/assets/features/f5.png", altText: "happy sell", title: `${t("happy sell")}` },
		{ id: 5, src: "/assets/features/f6.png", altText: "24/7 support", title: `${t("24/7 support")}` },
	];
	return (
		<div className={styles.features}>
			{content.map((item) => (
				<FeaturesCard key={item.id} {...content[item.id]} />
			))}
		</div>
	);
};

export default Features;
