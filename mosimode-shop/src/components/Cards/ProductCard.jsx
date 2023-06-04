import React from "react";
import styles from "./ProductCard.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import generateStars from "../../utils/generateStars";

const ProductCard = ({ id, title, image, price, rating, category }) => {
	return (
		<div className={styles.product_cart}>
			<Link href={`/shop/${id}`}>
				<Image className={styles.product_image} src={image} width={1080} height={1350} alt={title} />
			</Link>
			<span>{category}</span>
			<h4 className={styles.text_limit}>{title}</h4>
			<div className={styles.stars}>{generateStars(rating.rate)}</div>
			<h4 className={styles.price}>${price}</h4>
			<button className={styles.buy_icon}>
				<ShoppingCartIcon />
			</button>
		</div>
	);
};

export default ProductCard;
