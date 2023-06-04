import React from "react";
import styles from "./ShoppingCart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cartSlice";

const ShoppingCart = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector((state) => state.cart.isCartOpen);

	return (
		<div className={`${styles.shoppingcart} ${isCartOpen ? styles.showcart : ""}`}>
			<div className={styles.cartbackground} onClick={() => dispatch(setIsCartOpen({}))}></div>
			<div className={styles.shoppingcartcontainer}>
				<div className={styles.closebtn} onClick={() => dispatch(setIsCartOpen({}))}>
					<CloseIcon />
					<p>close</p>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
