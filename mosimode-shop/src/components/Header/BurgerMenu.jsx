import React from "react";
import styles from "./BurgerMenu.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const BurgerMenu = () => {
	const { data, status } = useSession();
	const [burgermenu, setBurgermenu] = useState(false);
	const router = useRouter();

	return (
		<div className={styles.burgermenu}>
			<MenuIcon onClick={() => setBurgermenu(true)} />

			<div className={`${burgermenu ? styles.showmenu : styles.hidemenu}`}>
				<div className={styles.menubackground} onClick={() => setBurgermenu(false)}></div>
				<div className={styles.menucontainer}>
					<div className={styles.closebtn} onClick={() => setBurgermenu(false)}>
						<CloseIcon />
						<p>close</p>
					</div>
					<nav className={styles.list_nav}>
						<ul>
							<li className={router.pathname === "/" ? styles.active : ""}>
								<Link href="/">Home</Link>
							</li>
							<li className={router.pathname === "/shop" ? styles.active : ""}>
								<Link href="/shop">Shop</Link>
							</li>
							<li className={router.pathname === "/about" ? styles.active : ""}>
								<Link href="/about">About</Link>
							</li>
							<li className={router.pathname === "/contact" ? styles.active : ""}>
								<Link href="/contact">Contact</Link>
							</li>
							{status === "authenticated" && data !== null && (
								<li className={router.pathname === "/dashboard" ? styles.active : ""}>
									<Link href="/dashboard">Dashboard</Link>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default BurgerMenu;
