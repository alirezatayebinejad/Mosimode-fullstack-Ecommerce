import React from "react";
import styles from "./ShoppingCart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen, removeFromCart, increaseCount, decreaseCount } from "../../store/cartSlice";
import Image from "next/image";
import Link from "next/link";

const ShoppingCart = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector((state) => state.cart.isCartOpen);
	const cartItems = useSelector((state) => state.cart.cart);

	const pricCalculator = () => {
		let lastPrice = 0;
		cartItems.forEach((item) => {
			lastPrice += item.count * item.product.price;
		});

		return Math.round(lastPrice * 100) / 100; //only two digit after dot
	};
	const deleteItemHandler = (item) => {
		dispatch(removeFromCart(item));
	};

	const generateCartItems = () => {
		const items = cartItems.map((item) => (
			<section key={item.product.id}>
				<div>
					<Image className={styles.imagecontainer} src={item.product.image} width={80} height={100} alt={item.product.title} />
				</div>
				<div className={styles.item_info}>
					<p>{item.product.title}</p>
					<h3>${item.product.price}</h3>
					<div className={styles.count}>
						<p>
							count: <span>{item.count}</span>
						</p>
						<button onClick={() => dispatch(increaseCount(item))}>+</button>
						<button onClick={() => dispatch(decreaseCount(item))}>-</button>
					</div>
					<button className={styles.delete_btn} onClick={() => deleteItemHandler(item)}>
						<DeleteForeverIcon sx={{ color: "#ff5959" }} />
					</button>
				</div>
			</section>
		));
		return items;
	};

	return (
		<div className={`${styles.shoppingcart} ${isCartOpen ? styles.showcart : ""}`}>
			<div className={styles.cartbackground} onClick={() => dispatch(setIsCartOpen({}))}></div>
			<div className={styles.shoppingcartcontainer}>
				<div className={styles.closebtn} onClick={() => dispatch(setIsCartOpen({}))}>
					<CloseIcon />
					<p>close</p>
				</div>
				<div className={styles.cartitems}>{generateCartItems()}</div>
				{cartItems.length > 0 ? (
					<div className={styles.cart_footer}>
						<h3>Total Price: ${pricCalculator()}</h3>
						<Link href={"/checkout"}>
							<button>Checkout Page</button>
						</Link>
					</div>
				) : (
					<h3 align="center">your cart is empty!</h3>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
