import styles from "./index.module.css";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Register() {
	const { t } = useTranslation("all");
	const { data, status } = useSession();
	const router = useRouter();

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
			callbackUrl: `/${router.locale}`,
		});
	}
	if (status === "authenticated" && data !== null)
		return (
			<div className={styles.container}>
				<Link href={"/"}>
					<div className={styles.logo}>
						<Image className={styles.logo_image} src="/logo.jpg" width={50} height={50} alt="mosimode logo picture" priority />
						<h3>{Mosimode}</h3>
					</div>
				</Link>

				<p className={styles.message}>
					{t("your are already logged in")} <br />
					<br />
					<button className={styles.logout_btn} onClick={() => signOut()}>
						{t("Logout")}
					</button>
				</p>
			</div>
		);
	return (
		<div className={styles.container}>
			<Link href={"/"}>
				<div className={styles.logo}>
					<Image className={styles.logo_image} src="/logo.jpg" width={50} height={50} alt="mosimode logo picture" priority />
					<h3>{t("Mosimode")}</h3>
				</div>
			</Link>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className={styles.heading}>
					<PersonIcon style={{ border: "solid 1px black", borderRadius: "20px" }} />
					{t("Register")}
				</h2>
				<label htmlFor="username" className={styles.label}>
					{t("Username")}:
				</label>
				<input type="text" id="username" name="username" required className={styles.input} />
				<label htmlFor="password" className={styles.label}>
					{t("Password")}:
				</label>
				<input type="password" id="password" name="password" required className={styles.input} />
				<button type="submit" className={styles.button}>
					{t("Submit")}
				</button>
			</form>
			<p className={styles.message}>
				{t("Already registered?")} <Link href="/login">{t("Login")}</Link>
			</p>
		</div>
	);
}
export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
