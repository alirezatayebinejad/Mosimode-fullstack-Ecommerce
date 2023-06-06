import styles from "./Header.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cartSlice";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./ShoppingCart";
import SearchPopup from "../Popups/SearchPopup";

const Header = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

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
							<li className={styles.shop_list} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
								<Link className={router.pathname === "/shop" ? styles.active : ""} href="/shop">
									Shop
								</Link>
								<div className={styles.dropdown_content}>
									{isDropdownOpen && (
										<ul>
											<li>
												<Link href="/shop?category=men's clothing">Men's Clothing</Link>
											</li>
											<li>
												<Link href="/shop?category=women's clothing">Women's Clothing</Link>
											</li>
											<li>
												<Link href="/shop?category=electronics">Electronics</Link>
											</li>
											<li>
												<Link href="/shop?category=jewelery">Jewelery</Link>
											</li>
										</ul>
									)}
								</div>
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
						<li onClick={() => setIsSearchOpen(true)}>
							<SearchIcon />
						</li>
						<li onClick={() => dispatch(setIsCartOpen({}))}>
							<ShoppingBasketIcon />
						</li>
						<li>
							<BurgerMenu />
						</li>
					</div>
				</div>
			</div>
			<ShoppingCart />
			{isSearchOpen && <SearchPopup setIsSearchOpen={setIsSearchOpen} />}
		</header>
	);
};

export default Header;
