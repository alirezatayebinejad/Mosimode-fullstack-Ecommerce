import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.footercontent}>
				<div className={styles.logoColumn}>
					<Image className={styles.logo} src="/logo.jpg" width={90} height={90} alt="mosimode logo picture" />
					<p>Mosimode shop</p>
				</div>

				<div className={styles.contactColumn}>
					<h3>pages</h3>
					<hr />
					<br />
					<p>Email: info@yourcompany.com</p>
					<p>Phone: +1 123-456-7890</p>
					<p>Address: 123 Street, City, Country</p>
				</div>
				<div className={styles.menuColumn}>
					<h3>pages</h3>
					<hr />
					<br />
					<ul>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/products">shop</Link>
						</li>
						<li>
							<Link href="/bout">bout</Link>
						</li>
						<li>
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.bottomfooter}>
				<p> &copy; {currentYear} Mosimode. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
