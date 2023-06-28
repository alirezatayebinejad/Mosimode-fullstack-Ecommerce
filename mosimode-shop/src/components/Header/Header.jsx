import styles from "./Header.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cartSlice";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./ShoppingCart";
import SearchPopup from "../Popups/SearchPopup";
import { useSession } from "next-auth/react";
import { fetchCart } from "../../store/cartSlice";
import { useTranslation } from "next-i18next";

const Header = () => {
	const { t } = useTranslation("all");
	const { data, status } = useSession();
	const dispatch = useDispatch();
	const router = useRouter();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const isCartOpen = useSelector((state) => state.cart.isCartOpen);
	const cartCount = useSelector((state) => state.cart.cart.length);
	const isAuthenticated = status === "authenticated" && data ? true : false;

	useEffect(() => {
		const anonymousUserUuid = localStorage.getItem("anonymousUserID");
		if (isAuthenticated) {
			dispatch(fetchCart({ userId: data.user.id, anonymousUserUuid: undefined }));
		} else if (!isAuthenticated && status !== "loading") {
			dispatch(fetchCart({ userId: undefined, anonymousUserUuid }));
		}
	}, [status]);

	return (
		<header>
			<div className={styles.header}>
				<div className={styles.logoSection}>
					<Link href={"/"}>
						<div className={styles.logo}>
							<Image className={styles.logo_image} src="/logo.jpg" width={50} height={50} alt="mosimode logo picture" priority />
							<h3>{t("Mosimode")}</h3>
						</div>
					</Link>
					<Link
						className={styles.languageSelect}
						/* ther query is for when we are inside the product page and want to change the locale*/
						href={{ pathname: router.pathname, query: { ...router.query } }}
						locale={`${router.locale == "en" ? "fa" : "en"}`}
					>
						{router.locale == "en" ? "Fa" : "En"}
					</Link>
				</div>
				<nav className={styles.list_nav}>
					<ul>
						<li>
							<Link className={router.pathname === "/" ? styles.active : ""} href="/">
								{t("Home")}
							</Link>
						</li>
						<li className={styles.shop_list} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
							<Link className={router.pathname === "/shop" ? styles.active : ""} href="/shop">
								{t("Shop")}
							</Link>
							<div className={styles.dropdown_content}>
								{isDropdownOpen && (
									<ul>
										<li>
											<Link href="/shop?category=پیرهن">پیرهن</Link>
										</li>
										<li>
											<Link href="/shop?category=تیشرت">تیشرت</Link>
										</li>
										<li>
											<Link href="/shop?category=کاپشن">کاپشن</Link>
										</li>
										<li>
											<Link href="/shop?category=سویشرت">سویشرت</Link>
										</li>
									</ul>
								)}
							</div>
						</li>
						<li>
							<Link className={router.pathname === "/about" ? styles.active : ""} href="/about">
								{t("About")}
							</Link>
						</li>
						<li>
							<Link className={router.pathname === "/contact" ? styles.active : ""} href="/contact">
								{t("Contact")}
							</Link>
						</li>
						{status === "authenticated" && data !== null && (
							<li>
								<Link className={router.pathname === "/dashboard" ? styles.active : ""} href="/dashboard">
									{t("Dashboard")}
								</Link>
							</li>
						)}
					</ul>
				</nav>
				<div className={styles.list_icon}>
					{status === "unauthenticated" && data === null && (
						<li>
							<Link href="/login">
								{t("Login")}
								<PersonIcon />
							</Link>
						</li>
					)}
					{status === "authenticated" && data !== null && (
						<li>
							<Link href="/dashboard">
								<p className={styles.userName}>{data.user.username}</p>
								<PersonIcon />
							</Link>
						</li>
					)}
					<li onClick={() => setIsSearchOpen(true)}>
						<SearchIcon />
					</li>
					<li className={styles.shoppingIcon_li} onClick={() => dispatch(setIsCartOpen({}))}>
						{cartCount > 0 && <span style={router.locale === "fa" ? { left: "-8px" } : { right: "-8px" }}>{cartCount}</span>}
						<ShoppingBasketIcon />
					</li>
					<li>
						<BurgerMenu />
					</li>
				</div>
			</div>
			{isCartOpen && <ShoppingCart />}
			{isSearchOpen && <SearchPopup setIsSearchOpen={setIsSearchOpen} />}
		</header>
	);
};

export default Header;
