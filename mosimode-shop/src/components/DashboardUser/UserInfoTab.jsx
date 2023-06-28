import React, { useState } from "react";
import styles from "./UserInfoTab.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openPopup } from "@/store/messagePopupSlice";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

const UserInfoTab = ({ user }) => {
	const { t } = useTranslation("all");
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: user.name || "",
		username: user.username || "",
		email: user.email || "",
		phoneNumber: user.phoneNumber || "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const response = await axios.put(`/api/users/${user.id}`, formData);
			if (response.statusText === "OK") {
				console.log("User data updated");
				dispatch(openPopup({ message: "your data is updated", mood: true }));
			} else {
				dispatch(openPopup({ message: "your data is not updated", mood: false }));
				throw new Error("Error updating user data");
			}
		} catch (error) {
			dispatch(openPopup({ message: "your data is not updated", mood: false }));
			console.error("Error updating user data:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.userInfoTab}>
			<h2>{t("Your Information")}</h2>
			<p>{t("You can modify this data and click save changes")}</p>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div>
					<label>
						{t("Name")}:
						<input type="text" name="name" defaultValue={formData.name} onChange={handleChange} />
					</label>
					<label>
						{t("Username")}:
						<input type="text" name="username" defaultValue={formData.username} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						{t("Email")}:
						<input type="email" name="email" defaultValue={formData.email} onChange={handleChange} />
					</label>
					<label>
						{t("Phone Number")}:
						<input type="tel" name="phoneNumber" defaultValue={formData.phoneNumber} onChange={handleChange} />
					</label>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? t("Saving...") : t("Save Changes")}
				</button>
				{error && <p className={styles.error}>{error}</p>}
				<div className={styles.logout_btn} onClick={() => signOut()}>
					<p>{t("Logout")}</p>
				</div>
			</form>
		</div>
	);
};

export default UserInfoTab;
