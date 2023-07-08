import React from "react";
import styles from "./Products.module.css";
import ProductCard from "../Cards/ProductCard";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Products = ({ products, title }) => {
	const { t } = useTranslation("all");
	return (
		<>
			<section className={styles.products_section}>
				<div className={styles.header}>
					<h1>{t(title)}</h1>
					<Link href={"/"}>
						<button>{t("See More")}</button>
					</Link>
				</div>
				<div className={styles.products_items}>
					{products?.map((item) => (
						<ProductCard key={item.id} product={item} />
					))}
				</div>
			</section>
		</>
	);
};

export default Products;
