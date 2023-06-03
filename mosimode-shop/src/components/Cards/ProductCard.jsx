import React from "react";
import styles from "./ProductCard.module.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ id, title, image, price, rating, category, onClick }) => {
	const rate = Math.round(rating.rate);
	const renderStars = () => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			if (i < rate) {
				stars.push(
					<i key={i}>
						<StarIcon />
					</i>
				);
			} else {
				stars.push(
					<i key={i}>
						<StarBorderIcon />
					</i>
				);
			}
		}
		return stars;
	};

	return (
		<div className={styles.product_cart}>
			<Link href={`/shop/${id}`}>
				<Image className={styles.product_image} src={image} width={1080} height={1350} alt={title} />
			</Link>
			<span>{category}</span>
			<h4 className={styles.text_limit}>{title}</h4>
			<div className={styles.stars}>{renderStars()}</div>
			<h4 className={styles.price}>${price}</h4>
			<button className={styles.buy_icon}>
				<ShoppingCartIcon />
			</button>
		</div>
	);
};

export default ProductCard;
