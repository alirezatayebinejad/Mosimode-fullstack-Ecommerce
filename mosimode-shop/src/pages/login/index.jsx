import styles from "./index.module.css";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";

export default function Login() {
	const { data, status } = useSession();

	async function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.target);

		await signIn("credentials", {
			username: form.get("username"),
			password: form.get("password"),
			callbackUrl: "/",
		});
	}
	if (status === "authenticated" && data !== null)
		return (
			<div className={styles.container}>
				<Link href={"/"}>
					<div className={styles.logo}>
						<Image className={styles.logo_image} src="/logo.jpg" width={50} height={50} alt="mosimode logo picture" priority />
						<h3>Mosimode</h3>
					</div>
				</Link>

				<p className={styles.message}>
					your are already logged in <br />
					<br />
					<button className={styles.logout_btn} onClick={() => signOut()}>
						Logout
					</button>
				</p>
			</div>
		);
	return (
		<div className={styles.container}>
			<Link href={"/"}>
				<div className={styles.logo}>
					<Image className={styles.logo_image} src="/logo.jpg" width={50} height={50} alt="mosimode logo picture" priority />
					<h3>Mosimode</h3>
				</div>
			</Link>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2 className={styles.heading}>
					<PersonIcon style={{ border: "solid 1px black", borderRadius: "20px" }} />
					Login
				</h2>
				<label className={styles.label} htmlFor="username">
					Username:
				</label>
				<input className={styles.input} type="text" id="username" name="username" required />
				<label className={styles.label} htmlFor="password">
					Password:
				</label>
				<input className={styles.input} type="password" id="password" name="password" required />
				<button className={styles.button} type="submit">
					Submit
				</button>
			</form>
			<p className={styles.message}>
				Not registered yet? <Link href="/register">Register here</Link>
			</p>
		</div>
	);
}
