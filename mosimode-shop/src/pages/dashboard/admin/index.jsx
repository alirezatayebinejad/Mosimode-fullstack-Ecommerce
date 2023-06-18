import React, { useState } from "react";
import { getSession } from "next-auth/react";
import styles from "./index.module.css";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import AddProductTab from "../../../components/DashboardAdmin/Tabs/AddProductTab";
import ProductsTab from "../../../components/DashboardAdmin/Tabs/ProductsTab";
import UsersTab from "../../../components/DashboardAdmin/Tabs/UsersTab";
import OrdersTab from "../../../components/DashboardAdmin/Tabs/OrdersTab";
import TabsHeader from "../../../components/DashboardAdmin/TabsHeader/TabsHeader";

const adminDashboard = () => {
	const [activeTab, setActiveTab] = useState("Add Product");
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<div className={styles.sidebar_header}>
					<Link href={"/"}>
						<Avatar alt="Travis Howard" src="/logo.jpg" sx={{ width: 35, height: 35 }} />
					</Link>
					<h3>Dashboard</h3>
				</div>
				<ul className={styles.tabList}>
					<li className={`${styles.tabListItem} ${activeTab === "Add Product" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Add Product")}>
						Add Product
					</li>
					<li className={`${styles.tabListItem} ${activeTab === "Products" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Products")}>
						Products
					</li>
					<li className={`${styles.tabListItem} ${activeTab === "Users" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Users")}>
						Users
					</li>
					<li className={`${styles.tabListItem} ${activeTab === "Orders" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Orders")}>
						Orders
					</li>
				</ul>
			</div>
			<div className={styles.content}>
				{activeTab === "Add Product" && (
					<>
						<TabsHeader title="Add Product" description="here you can add products to the store using this form" />
						<div className={styles.tabContent}>
							<AddProductTab />
						</div>
					</>
				)}
				{activeTab === "Products" && (
					<>
						<TabsHeader title="Products" description="here you can see the store products and adit them" />
						<div className={styles.tabContent}>
							<ProductsTab />
						</div>
					</>
				)}
				{activeTab === "Users" && (
					<>
						<TabsHeader title="Users" description="here you can learn how you can see users and edit them" />
						<div className={styles.tabContent}>
							<UsersTab />
						</div>
					</>
				)}
				{activeTab === "Orders" && (
					<>
						<TabsHeader title="Orders" description="here you can see orders that users have been made" />
						<div className={styles.tabContent}>
							<OrdersTab />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default adminDashboard;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	} else if (session.user.username !== process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
