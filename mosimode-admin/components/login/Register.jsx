import React from "react";
import styles from "@/components/login/Register.module.css";

function Register() {
	return (
		<div className={styles.card}>
			<form className={styles.form}>
				<h2 className={styles.title}>Register</h2>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" name="name" required />

				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" required />

				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" required />

				<button type="submit">register</button>
			</form>
		</div>
	);
}

export default Register;
