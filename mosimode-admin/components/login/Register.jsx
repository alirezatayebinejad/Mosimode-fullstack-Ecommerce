import styles from "@/components/login/Register.module.css";
import React, { useState } from "react";
import axios from "axios";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		console.log("response in registe.jsx: ", response);
		if (response.ok) {
			// Handle successful sign-up, e.g., redirect to home page
			console.log("signup was successful");
		} else {
			// Handle sign-up error
			console.log("signup is not valid");
		}
	};

	return (
		<div className={styles.card}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2 className={styles.title}>Register</h2>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

				<label htmlFor="email">Email</label>
				<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

				<label htmlFor="password">Password</label>
				<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

				<button type="submit">register</button>
			</form>
		</div>
	);
}

export default Register;
