import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer = () => {
	const { t } = useTranslation("all");
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.footercontent}>
				<div className={styles.logoColumn}>
					<Image className={styles.logo} src="/logo.jpg" width={90} height={90} alt="mosimode logo picture" />
					<p>{t("Mosimode shop")}</p>
				</div>

				<div className={styles.contactColumn}>
					<h3>{t("pages")}</h3>
					<hr />
					<br />
					<p>{t("Email")}: info@yourcompany.com</p>
					<p>{t("Phone")}: +1 123-456-7890</p>
					<p>{t("Address")}: 123 Street, City, Country</p>
				</div>
				<div className={styles.menuColumn}>
					<h3>{t("pages")}</h3>
					<hr />
					<br />
					<ul>
						<li>
							<Link href="/">{t("Home")}</Link>
						</li>
						<li>
							<Link href="/products">{t("shop")}</Link>
						</li>
						<li>
							<Link href="/bout">{t("about")}</Link>
						</li>
						<li>
							<Link href="/contact">{t("Contact")}</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.bottomfooter}>
				<p>
					{" "}
					&copy; {currentYear} {t("Mosimode")}. {t("All rights reserved")}.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
