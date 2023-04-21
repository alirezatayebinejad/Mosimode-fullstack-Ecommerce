import Signincard from "@/components/login/Signincard";
import Register from "@/components/login/Register";
import styles from "./login.module.css";
import { use, useState } from "react";

function login() {
	const [register, useRegister] = useState(false);
	console.log(register);
	if (!register)
		return (
			<div className={styles.login}>
				<h1 className={styles.title}>Log In to your account</h1>
				<Signincard />
				<h4 className={styles.registerText}>
					no account? <span onClick={() => useRegister(!register)}>click to register</span>
				</h4>
			</div>
		);
	else {
		return (
			<div className={styles.login}>
				<h1 className={styles.title}>Log In to your account</h1>
				<Register />
				<h4 className={styles.registerText}>
					no account? <span onClick={() => useRegister(!register)}>click to sign in</span>
				</h4>
			</div>
		);
	}
}

export default login;
