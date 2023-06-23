import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import UserInfoTab from "../../../components/DashboardUser/UserInfoTab";
import OrdersTab from "../../../components/DashboardUser/OrdersTab";
import styles from "./index.module.css";

const userDashboard = ({ user, orders }) => {
	const [activeTab, setActiveTab] = useState("userInfo");

	const handleTabChange = (tabName) => {
		setActiveTab(tabName);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.tabsContainer}>
					<div className={`${styles.tab} ${activeTab === "userInfo" ? styles.active : ""}`} onClick={() => handleTabChange("userInfo")}>
						User Info
					</div>
					<div className={`${styles.tab} ${activeTab === "orders" ? styles.active : ""}`} onClick={() => handleTabChange("orders")}>
						Orders
					</div>
				</div>
				<div className={styles.tabContent}>
					{activeTab === "userInfo" ? <UserInfoTab user={user} /> : activeTab === "orders" ? <OrdersTab orders={orders} /> : null}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default userDashboard;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	} else if (session.user.username === process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: "/dashboard/admin",
				permanent: false,
			},
		};
	}

	// Fetch user data using the session information
	const response = await fetch(`${process.env.WEBSITE_DOMAIN}/api/users/${session.user.id}`);
	const response2 = await fetch(`${process.env.WEBSITE_DOMAIN}/api/getOrders?userId=${session.user.id}`);
	const user = await response.json();
	const orders = await response2.json();

	return {
		props: {
			user,
			orders,
		},
	};
}
