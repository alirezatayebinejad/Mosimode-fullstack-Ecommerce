import React, { useState } from "react";
import styles from "./UserInfoTab.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openPopup } from "@/store/messagePopupSlice";

const UserInfoTab = ({ user }) => {
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
				dispatch(openPopup({ message: "you data is updated", mood: true }));
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
			<h2>Your Information</h2>
			<p>You can modify this data and click save changes</p>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div>
					<label>
						Name:
						<input type="text" name="name" defaultValue={formData.name} onChange={handleChange} />
					</label>
					<label>
						Username:
						<input type="text" name="username" defaultValue={formData.username} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Email:
						<input type="email" name="email" defaultValue={formData.email} onChange={handleChange} />
					</label>
					<label>
						Phone Number:
						<input type="tel" name="phoneNumber" defaultValue={formData.phoneNumber} onChange={handleChange} />
					</label>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Saving..." : "Save Changes"}
				</button>
				{error && <p className={styles.error}>{error}</p>}
			</form>
		</div>
	);
};

export default UserInfoTab;
