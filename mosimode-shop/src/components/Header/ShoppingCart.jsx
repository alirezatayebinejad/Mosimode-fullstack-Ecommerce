import React, { useState } from "react";
import styles from "./ShoppingCart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen, removeFromCart, increaseCount, decreaseCount } from "../../store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const ShoppingCart = () => {
	const { t } = useTranslation("all");
	const router = useRouter();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cart);
	const totalPrice = useSelector((state) => state.cart.totalPrice);
	const { data, status } = useSession();
	const isAuthenticated = status === "unauthenticated" && data === null ? false : true;
	const [btndisable, setBtndisable] = useState(false);

	let handlersConfig = (item) => {
		let anonymousUserID = localStorage.getItem("anonymousUserID");
		const options = isAuthenticated
			? { productId: item.product.id, anonymousUserUuid: undefined, userId: data.user.id }
			: { productId: item.product.id, anonymousUserUuid: anonymousUserID, userId: undefined };
		return options;
	};
	const deleteItemHandler = (item) => {
		setBtndisable(true);
		const options = handlersConfig(item);
		dispatch(removeFromCart(options));
		setBtndisable(false);
	};
	const increaseHandler = (item) => {
		setBtndisable(true);
		const options = handlersConfig(item);
		dispatch(increaseCount(options));
		setBtndisable(false);
	};
	const decreaseHandler = (item) => {
		setBtndisable(true);
		const options = handlersConfig(item);
		dispatch(decreaseCount(options));
		setBtndisable(false);
	};
	const generateCartItems = () => {
		const items = cartItems.map((item) => (
			<section key={item.product.id}>
				<div>
					<Image className={styles.imagecontainer} src={item.product.image} width={80} height={100} alt={item.product.title} />
				</div>
				<div className={styles.item_info}>
					<p>{item.product.title}</p>
					<h3>
						{t("$")} {item.product.price}
					</h3>
					<div className={styles.count}>
						<p>
							{t("count")}: <span>{item.count}</span>
						</p>
						<button onClick={() => increaseHandler(item)} disabled={btndisable}>
							+
						</button>
						<button onClick={() => decreaseHandler(item)} disabled={btndisable}>
							-
						</button>
					</div>
					<button className={styles.delete_btn} onClick={() => deleteItemHandler(item)} disabled={btndisable}>
						<DeleteForeverIcon sx={{ color: "#ff5959" }} />
					</button>
				</div>
			</section>
		));
		return items;
	};

	return (
		<div className={styles.shoppingcart}>
			<div className={styles.cartbackground} onClick={() => dispatch(setIsCartOpen({}))}></div>
			<div className={styles.shoppingcartcontainer} style={router.locale === "fa" ? { left: 0 } : { right: 0 }}>
				<div className={styles.closebtn} onClick={() => dispatch(setIsCartOpen({}))}>
					<CloseIcon />
					<p>{t("close")}</p>
				</div>
				<div className={styles.cartitems} dir="ltr">
					{generateCartItems()}
				</div>
				{cartItems.length > 0 ? (
					<div className={styles.cart_footer}>
						<h3>
							{t("Total Price")}: {totalPrice} {t("$")}
						</h3>
						<Link href={"/checkout"}>
							<button
								onClick={() => {
									dispatch(setIsCartOpen({}));
									router.push("/checkout");
								}}
							>
								{t("Checkout Page")}
							</button>
						</Link>
					</div>
				) : (
					<h3 align="center">{t("your cart is empty")}!</h3>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
