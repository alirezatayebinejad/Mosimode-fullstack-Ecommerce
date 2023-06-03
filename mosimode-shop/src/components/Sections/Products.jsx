import React from "react";
import styles from "./Products.module.css";
import ProductCard from "../Cards/ProductCard";
import Link from "next/link";

const products = ({ products, title }) => {
	return (
		<>
			<section className={styles.products_section}>
				<div className={styles.header}>
					<h1>{title}</h1>
					<Link href={"/"}>
						<button>See More</button>
					</Link>
				</div>
				<div className={styles.products_items}>
					{products?.map((item, index) => (
						<ProductCard key={item.id} {...products[index]} />
					))}
				</div>
			</section>
		</>
	);
};

export default products;
