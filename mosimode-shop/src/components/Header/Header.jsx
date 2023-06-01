import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Image from "next/image";
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cartSlice";

const Header = () => {
	const dispatch = useDispatch();

	return (
		<header>
			<div className={styles.header}>
				<div className={styles.logo}>
					<Image className={styles.logo_image} src="/logo.jpg" width={50} height={50} alt="mosimode logo picture" />
					<h3>Mosimode</h3>
				</div>
				<div className={styles.list}>
					<nav className={styles.list_nav}>
						<ul>
							<li>
								<Link className={styles.active} href="/">
									Home
								</Link>
							</li>
							<li>
								<Link href="/shop">Shop</Link>
							</li>
							<li>
								<Link href="/about">About</Link>
							</li>
							<li>
								<Link href="/contact">Contact</Link>
							</li>
						</ul>
					</nav>
					<div className={styles.list_icon}>
						<Link href="">
							<i onClick={() => dispatch(setIsCartOpen({}))}>
								<ShoppingBasketIcon />
							</i>
						</Link>
					</div>
					<BurgerMenu />
				</div>
			</div>
			<ShoppingCart />
		</header>
	);
};

export default Header;
