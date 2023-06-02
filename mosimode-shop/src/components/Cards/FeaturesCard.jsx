import React from "react";
import styles from "./FeaturesCard.module.css";
import Image from "next/image";

const FeaturesCard = ({ src, altText, title }) => {
	return (
		<div className={styles.featurescard}>
			<Image src={src} width={152} height={103} alt={altText} />
			<h6>{title}</h6>
		</div>
	);
};

export default FeaturesCard;
