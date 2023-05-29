import React from "react";
import styles from "./BurgerMenu.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Link from "next/link";

const BurgerMenu = () => {
	const [burgermenu, setBurgermenu] = useState(false);
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
							<li>
								<Link href="/">Home</Link>
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
				</div>
			</div>
		</div>
	);
};

export default BurgerMenu;
