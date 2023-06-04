import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Image from "next/image";
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./ShoppingCart";
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cartSlice";

const Header = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	return (
		<header>
			<div className={styles.header}>
				<Link href={"/"}>
					<div className={styles.logo}>
						<Image className={styles.logo_image} src="/logo.jpg" width={50} height={50} alt="mosimode logo picture" priority />
						<h3>Mosimode</h3>
					</div>
				</Link>
				<div className={styles.list}>
					<nav className={styles.list_nav}>
						<ul>
							<li>
								<Link className={router.pathname === "/" ? styles.active : ""} href="/">
									Home
								</Link>
							</li>
							<li>
								<Link className={router.pathname === "/shop" ? styles.active : ""} href="/shop">
									Shop
								</Link>
							</li>
							<li>
								<Link className={router.pathname === "/about" ? styles.active : ""} href="/about">
									About
								</Link>
							</li>
							<li>
								<Link className={router.pathname === "/contact" ? styles.active : ""} href="/contact">
									Contact
								</Link>
							</li>
						</ul>
					</nav>
					<div className={styles.list_icon}>
						<li onClick={() => dispatch(setIsCartOpen({}))}>
							<ShoppingBasketIcon />
						</li>
					</div>
					<BurgerMenu />
				</div>
			</div>
			<ShoppingCart />
		</header>
	);
};

export default Header;
