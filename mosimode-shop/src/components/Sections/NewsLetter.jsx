import React from "react";
import styles from "./NewsLetter.module.css";
import { useTranslation } from "next-i18next";

const NewsLetter = () => {
	const { t } = useTranslation("all");

	return (
		<section className={styles.newsLetter}>
			<div className={styles.newsletter_text}>
				<h3>{t("Sign Up For Newsletters")}</h3>
				<h5>
					{t("get e-mail updates about out latest shop and")} <span>{t("special offers")}</span>
				</h5>
			</div>
			<div className={styles.form} dir="ltr">
				<input type="email" placeholder={t("Your email address")} />
				<button>{t("Sign Up")}</button>
			</div>
		</section>
	);
};

export default NewsLetter;
