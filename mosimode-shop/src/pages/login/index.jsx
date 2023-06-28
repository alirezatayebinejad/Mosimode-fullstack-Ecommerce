import styles from "./index.module.css";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Login() {
	const { t } = useTranslation("all");
	const { data, status } = useSession();
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.target);

		await signIn("credentials", {
			username: form.get("username"),
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
						<h3>{t("Mosimode")}</h3>
					</div>
				</Link>

				<p className={styles.message}>
					{t("your are already logged in")} <br />
					<br />
					<button
						className={styles.logout_btn}
						onClick={() => {
							signOut({ callbackUrl: `/${router.locale}` });
						}}
					>
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
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2 className={styles.heading}>
					<PersonIcon style={{ border: "solid 1px black", borderRadius: "20px" }} />
					{t("Login")}
				</h2>
				<label className={styles.label} htmlFor="username">
					{t("Username")}:
				</label>
				<input className={styles.input} type="text" id="username" name="username" required />
				<label className={styles.label} htmlFor="password">
					{t("Password")}:
				</label>
				<input className={styles.input} type="password" id="password" name="password" required />
				<button className={styles.button} type="submit">
					{t("Submit")}
				</button>
			</form>
			<p className={styles.message}>
				{t("Not registered yet?")} <Link href="/register">{t("Register")}</Link>
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
