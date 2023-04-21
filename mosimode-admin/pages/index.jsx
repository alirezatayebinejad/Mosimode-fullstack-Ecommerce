import styles from "./index.module.css";

export default function Home() {
	return (
		<>
			<div className={styles.home}>
				<div className={styles.authbox}>
					<button type="button" className={styles.googlebtn}>
						login with google
					</button>
				</div>
			</div>
		</>
	);
}
