import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import UserInfoTab from "../../../components/DashboardUser/UserInfoTab";
import OrdersTab from "../../../components/DashboardUser/OrdersTab";
import styles from "./index.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const UserDashboard = ({ user, orders }) => {
	const { t } = useTranslation("all");
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
						{t("User Info")}
					</div>
					<div className={`${styles.tab} ${activeTab === "orders" ? styles.active : ""}`} onClick={() => handleTabChange("orders")}>
						{t("Orders")}
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

export default UserDashboard;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const { locale } = context;

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
				...(await serverSideTranslations(locale, ["all"])),
			},
		};
	} else if (session.user.username === process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: "/dashboard/admin",
				permanent: false,
				...(await serverSideTranslations(locale, ["all"])),
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
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
