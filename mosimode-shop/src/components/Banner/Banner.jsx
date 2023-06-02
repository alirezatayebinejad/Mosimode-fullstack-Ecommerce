import React from "react";
import Image from "next/image";
import styles from "./Banner.module.css";

const Banner = () => {
	return (
		<div className={styles.banner}>
			<Image src="/assets/banners/banner1.jpeg" className={styles.image} width={1920} height={1080} alt="Picture of the author"></Image>
			<div className={styles.banner_content}>
				<h2>
					Discover the perfect blend <br /> of comfort and style.
				</h2>
				<button>Shop Now</button>
			</div>
		</div>
	);
};

export default Banner;
