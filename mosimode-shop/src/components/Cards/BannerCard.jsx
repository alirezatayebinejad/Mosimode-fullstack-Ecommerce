import React from "react";
import styles from "./BannerCard.module.css";
import { useRouter } from "next/dist/client/router";

const BannerCard = ({ imageSrc, header, subHeader, btnTitle }) => {
	const router = useRouter();

	return (
		<div className={styles.bannerCard} style={{ backgroundImage: `url(${imageSrc}` }}>
			<div className={styles.info}>
				<h2>{header}</h2>
				<span>{subHeader}</span>
				<button>{btnTitle}</button>
			</div>
		</div>
	);
};

export default BannerCard;
