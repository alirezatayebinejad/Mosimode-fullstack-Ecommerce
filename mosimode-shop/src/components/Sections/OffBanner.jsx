import React from "react";
import styles from "./OffBanner.module.css";
import Link from "next/link";

const OffBanner = () => {
	return (
		<section className={styles.off_banner}>
			<h4>Repaire Services</h4>
			<h2>Up to 70% Off - All t-Shirts & Accessories</h2>
			<Link href={"/shop"}>
				<button className={styles.button}>Explore More</button>
			</Link>
		</section>
	);
};

export default OffBanner;
