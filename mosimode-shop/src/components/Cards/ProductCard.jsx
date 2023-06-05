import React from "react";
import styles from "./ProductCard.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import generateStars from "../../utils/generateStars";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { openPopup, closePopup } from "@/store/messagePopupSlice";
const ProductCard = (product) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cart);

	const addToBasketHandler = (product) => {
		//we pull out the onClick part because of redux reasons
		if (cartItems.find((item) => item.product.id == product.id)) {
			dispatch(openPopup({ message: "product is already added", mood: false }));
		} else {
			const { onClick, ...productData } = product;
			dispatch(addToCart({ product: productData, count: 1 }));
			dispatch(openPopup({ message: "product added to cart", mood: true }));
		}
	};
	return (
		<div className={styles.product_cart}>
			<Link href={`/shop/product/${product.id}`}>
				<Image className={styles.product_image} src={product.image} width={1080} height={1350} alt={product.title} />
			</Link>
			<span>{product.category}</span>
			<h4 className={styles.text_limit}>{product.title}</h4>
			<div className={styles.stars}>{generateStars(product.rating.rate)}</div>
			<h4 className={styles.price}>${product.price}</h4>
			<button className={styles.buy_icon} onClick={() => addToBasketHandler(product)}>
				<ShoppingCartIcon />
			</button>
		</div>
	);
};

export default ProductCard;
