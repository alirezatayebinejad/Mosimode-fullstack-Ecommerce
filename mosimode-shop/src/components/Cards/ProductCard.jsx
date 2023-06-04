import React from "react";
import styles from "./ProductCard.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import generateStars from "../../utils/generateStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductCard = (product) => {
	const dispatch = useDispatch();
	const addToBasketHandler = () => {
		dispatch(addToCart({ product, count: 1 }));
	};
	return (
		<div className={styles.product_cart}>
			<Link href={`/shop/${product.id}`}>
				<Image className={styles.product_image} src={product.image} width={1080} height={1350} alt={product.title} />
			</Link>
			<span>{product.category}</span>
			<h4 className={styles.text_limit}>{product.title}</h4>
			<div className={styles.stars}>{generateStars(product.rating.rate)}</div>
			<h4 className={styles.price}>${product.price}</h4>
			<button className={styles.buy_icon} onClick={addToBasketHandler}>
				<ShoppingCartIcon />
			</button>
		</div>
	);
};

export default ProductCard;
