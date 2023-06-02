import React from "react";
import FeaturesCard from "../Cards/FeaturesCard";
import styles from "./Features.module.css";

const Features = () => {
	const content = [
		{ id: 0, src: "/assets/features/f1.png", altText: "easy shiping", title: "easy shiping" },
		{ id: 1, src: "/assets/features/f2.png", altText: "online order", title: "online order" },
		{ id: 2, src: "/assets/features/f3.png", altText: "save money", title: "save money" },
		{ id: 3, src: "/assets/features/f4.png", altText: "satisfaction", title: "satisfaction" },
		{ id: 4, src: "/assets/features/f5.png", altText: "happy sell", title: "happy sell" },
		{ id: 5, src: "/assets/features/f6.png", altText: "24/7 support", title: "24/7 support" },
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
