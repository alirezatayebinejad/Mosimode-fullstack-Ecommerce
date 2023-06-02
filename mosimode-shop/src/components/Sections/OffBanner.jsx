import React from "react";
import styles from "./OffBanner.module.css";

const OffBanner = () => {
	return (
		<section className={styles.off_banner}>
			<h4>Repaire Services</h4>
			<h2>Up to 70% Off - All t-Shirts & Accessories</h2>
			<button className={styles.button}>Explore More</button>
		</section>
	);
};

export default OffBanner;
