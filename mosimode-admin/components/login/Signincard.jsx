import React from "react";
import styles from "@/components/login/Signincard.module.css";

function Signincard() {
	return (
		<div className={styles.card}>
			<h2 className={styles.title}>Sign In</h2>
			<form className={styles.form}>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" required />

				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" required />

				<button type="submit">Sign In</button>
			</form>
		</div>
	);
}

export default Signincard;
