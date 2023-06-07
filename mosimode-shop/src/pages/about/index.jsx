import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import PagesHeader from "@/components/Banner/PagesHeader";

const AboutPage = () => {
	return (
		<>
			<Head>
				<title>About | Mosimode</title>
				<meta name="description" content="search page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<PagesHeader title={"About Us"} />
			<div className={styles.container}>
				<h2 className={styles.heading}>About Mosimode</h2>
				<div className={styles.content}>
					<h3 className={styles.subheading}>Our Story</h3>
					<p>
						Mosimode is a trendy and fashion-forward clothing shop that offers a wide range of stylish and high-quality apparel for both men and women. Our
						passion for fashion and dedication to providing exceptional customer experiences have made us a favorite destination for fashion enthusiasts.
					</p>
				</div>
				<div className={styles.content}>
					<h3 className={styles.subheading}>Our Collections</h3>
					<div>
						<Image src="/assets/banners/about1.jpg" alt="Collection 1" width={976} height={488} className={styles.image} priority />
						<p>
							Our collection showcases the latest trends in clothing, from casualwear to formal attire. Whether you're looking for everyday essentials or
							statement pieces, we have something for every style and occasion.
						</p>
					</div>
					<div>
						<Image src="/assets/banners/about2.jpg" alt="Collection 2" width={400} height={300} className={styles.image} />
						<p>
							Our curated selection of clothing combines comfort, quality, and style. We source our products from renowned designers and brands to ensure
							that our customers receive the best in fashion.
						</p>
					</div>
				</div>
				<div className={styles.content}>
					<h3 className={styles.subheading}>Visit Us</h3>
					<p>
						We invite you to visit our store and explore our diverse collection of clothing. Our friendly and knowledgeable staff are always ready to assist
						you in finding the perfect outfits that reflect your unique style and personality.
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AboutPage;
