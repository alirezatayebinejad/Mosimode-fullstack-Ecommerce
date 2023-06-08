import styles from "./index.module.css";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";

export default function Register() {
	const { data, status } = useSession();

	async function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.target);

		const res = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: form.get("username"),
				password: form.get("password"),
			}),
		});
		const data = await res.json();
		if (!data.user) return null;
		await signIn("credentials", {
			username: data.user.username,
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
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className={styles.heading}>
					<PersonIcon style={{ border: "solid 1px black", borderRadius: "20px" }} />
					Register
				</h2>
				<label htmlFor="username" className={styles.label}>
					Username:
				</label>
				<input type="text" id="username" name="username" required className={styles.input} />
				<label htmlFor="password" className={styles.label}>
					Password:
				</label>
				<input type="password" id="password" name="password" required className={styles.input} />
				<button type="submit" className={styles.button}>
					Submit
				</button>
			</form>
			<p className={styles.message}>
				Already registered? <Link href="/login">Login here</Link>
			</p>
		</div>
	);
}
