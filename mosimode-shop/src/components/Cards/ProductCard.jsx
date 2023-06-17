import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import generateStars from "../../utils/generateStars";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { closePopup, openPopup } from "@/store/messagePopupSlice";
import axios from "axios";
import { useSession } from "next-auth/react";

const ProductCard = (product) => {
	const { data, status } = useSession();
	const isAuthenticated = status === "unauthenticated" && data === null ? false : true;
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cart);
	const [btndisable, setBtndisable] = useState(false);

	const addToBasketHandler = async (product) => {
		setBtndisable(true);

		await new Promise((resolve) => {
			dispatch(closePopup());
			resolve();
		});

		let anonymousUserID = localStorage.getItem("anonymousUserID");
		if (cartItems.find((item) => item.product.id == product.id)) {
			dispatch(openPopup({ message: "product is already added", mood: false }));
		} else {
			if (!isAuthenticated && anonymousUserID === null) {
				// Handle anonymous user
				try {
					const response = await axios.post("/api/anonymousUser", { action: "create" });
					const data = response.data;
					localStorage.setItem("anonymousUserID", data.anonymousUser.id);
					anonymousUserID = localStorage.getItem("anonymousUserID");
				} catch (error) {
					console.error("Error creating anonymous user:", error);
				}
			}
			// Adding to cart
			// We pull out the onClick part because of Redux reasons
			const { onClick, ...productData } = product;
			const options = isAuthenticated
				? { product: productData, count: 1, userType: "authuser", anonymousUserUuid: undefined, userId: data.user.id }
				: { product: productData, count: 1, userType: "anonymous", anonymousUserUuid: anonymousUserID, userId: undefined };
			dispatch(addToCart(options));
			dispatch(openPopup({ message: "product added to cart", mood: true }));
		}
		setBtndisable(false);
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
			<button className={styles.buy_icon} onClick={() => addToBasketHandler(product)} disabled={btndisable}>
				{btndisable ? "..." : <ShoppingCartIcon />}
			</button>
		</div>
	);
};

export default ProductCard;
