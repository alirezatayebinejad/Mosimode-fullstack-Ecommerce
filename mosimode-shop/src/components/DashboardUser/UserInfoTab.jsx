import React from "react";
import styles from "./UserInfoTab.module.css";

const UserInfoTab = ({ user }) => {
	console.log(user);
	return (
		<div className={styles.userInfoTab}>
			<h2>User Information</h2>
			<p>Name: {user.name}</p>
			<p>Username: {user.username}</p>
			<p>Email: {user.email}</p>
			<p>Phone Number: {user.phoneNumber}</p>
			{/* Add input fields for updating user data */}
		</div>
	);
};

export default UserInfoTab;
