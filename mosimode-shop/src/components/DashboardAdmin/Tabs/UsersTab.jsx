import React, { useEffect, useState } from "react";
import styles from "./UsersTab.module.css";
import { useDispatch } from "react-redux";
import { openPopup } from "@/store/messagePopupSlice";
import axios from "axios";

const UsersTab = () => {
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get("/api/admin/getUsers");
			setUsers(response.data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	const removeUser = async (userId) => {
		try {
			await axios.delete(`/api/admin/deleteUser?id=${userId}`);
			const newUsersList = users.filter((item) => {
				return item.id !== userId;
			});
			setUsers(newUsersList);
			dispatch(openPopup({ message: "the user is removed", mood: true }));
		} catch (error) {
			dispatch(openPopup({ message: "there was a problem removing user", mood: true }));
			console.error("Error removing user:", error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.countUsers}>
				<p>total products: {users.length}</p>
			</div>
			{users.map((user) => (
				<div key={user.id} className={styles.userCard}>
					<p>{user.username}</p>
					<button onClick={() => removeUser(user.id)}>Remove</button>
				</div>
			))}
		</div>
	);
};

export default UsersTab;
