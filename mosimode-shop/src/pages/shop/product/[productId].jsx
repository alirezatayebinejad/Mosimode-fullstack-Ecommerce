import React, { useState, useRef } from "react";
import styles from "./[productId].module.css";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Products from "@/components/Sections/Products";
import Image from "next/image";
import generateStars from "../../../utils/generateStars";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { openPopup, closePopup } from "@/store/messagePopupSlice";
import { useSession } from "next-auth/react";
import axios from "axios";

const ProductPage = ({ product, productList }) => {
	const { data, status } = useSession();
	const isAuthenticated = status === "unauthenticated" && data === null ? false : true;
	const dispatch = useDispatch();
	const [userRating, setUserRating] = useState(5);
	const rateInputRef = useRef(null);
	const cartItems = useSelector((state) => state.cart.cart);
	const [btndisable, setBtndisable] = useState(false);

	const ratingSubmitHandle = () => {
		const userRate = parseInt(rateInputRef.current.value);
		if (userRate > 5 || userRate < 0) {
			dispatch(openPopup({ message: "your rating should be in the range of 0 to 5", mood: false }));
			return;
		}
		//work of updating the product rating
	};
	const addToBasketHandler = async () => {
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
	if (product == null)
		return (
			<>
				<Header />
				<div className={styles.invalidpage}>
					<h1>this product does not exist!</h1>
				</div>
				<Footer />
			</>
		);

	return (
		<>
			<Head>
				<title>{product.title} | mosimode</title>
				<meta name="description" content={`product:${product.title}`} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>
				<section className={styles.section}>
					<div className={styles.product_container}>
						<div className={styles.product_image}>
							<Image className={styles.product_picture} src={product.image} alt={product.title} width={1080} height={1350} priority />
						</div>
						<div className={styles.product_info}>
							<h3>{product.title}</h3>
							<p className={styles.category}>category: {product.category}</p>
							<div className={styles.stars}>
								{generateStars(product.rating.rate)}
								<br />

								<div className={styles.rateit}>
									rate:
									<input type="number" min="0" max="5" value={userRating} ref={rateInputRef} onChange={(e) => setUserRating(e.target.value)} />
									<button onClick={ratingSubmitHandle}>ok</button>
								</div>
							</div>
							<p className={styles.price}>${product.price}</p>
							<p className={styles.description}>description: {product.description}</p>
							<button className={styles.addtobasket_btn} onClick={addToBasketHandler} disabled={btndisable}>
								Add To Basket
							</button>
						</div>
					</div>
				</section>
				<Products products={productList} title="more products" />
			</main>
			<Footer />
		</>
	);
};
export async function getServerSideProps(context) {
	const { productId } = context.query;

	try {
		// Fetch the product details based on productId
		const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
		const response2 = await fetch(`https://fakestoreapi.com/products/`);
		const product = await response.json();
		const productList = await response2.json();
		// Return the fetched product as props
		return {
			props: {
				product,
				productList: productList.slice(0, 6),
			},
		};
	} catch (error) {
		return {
			props: {
				product: null,
				productList: {},
			},
		};
	}
}
export default ProductPage;
