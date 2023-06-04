import Image from "next/image";
import React from "react";
import styles from "./PagesHeader.module.css";

const PagesHeader = ({ title }) => {
	return (
		<div className={styles.header}>
			<Image className={styles.image} src={"/assets/banners/pagesbanner.jpg"} width={"1290"} height={"300"} alt="shop page header pic" />
			<h1 className={styles.title}>{title}</h1>
		</div>
	);
};

export default PagesHeader;
