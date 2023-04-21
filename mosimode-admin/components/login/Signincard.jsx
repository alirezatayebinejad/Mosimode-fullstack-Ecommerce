import React from "react";
import styles from "@/components/login/Signincard.module.css";
import { useState } from "react";

function Signincard() {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formState); // Do something with the form data
	};
	return (
		<div className={styles.card}>
			<h2 className={styles.title}>Sign In</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" value={formState.name} onChange={handleChange} required />

				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" value={formState.pass} onChange={handleChange} required />

				<button type="submit">Sign In</button>
			</form>
		</div>
	);
}

export default Signincard;
