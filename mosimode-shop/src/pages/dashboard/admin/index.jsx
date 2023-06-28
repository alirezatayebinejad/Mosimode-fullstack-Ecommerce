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
import { signOut } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const adminDashboard = () => {
	const { t } = useTranslation("all");
	const router = useRouter();
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
					<h3>{t("Dashboard")}</h3>
				</div>
				<ul className={styles.tabList}>
					<li className={`${styles.tabListItem} ${activeTab === "Add Product" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Add Product")}>
						{t("Add Product")}
					</li>
					<li className={`${styles.tabListItem} ${activeTab === "Products" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Products")}>
						{t("Products")}
					</li>
					<li className={`${styles.tabListItem} ${activeTab === "Users" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Users")}>
						{t("Users")}
					</li>
					<li className={`${styles.tabListItem} ${activeTab === "Orders" ? styles.activeTab : ""}`} onClick={() => handleTabClick("Orders")}>
						{t("Orders")}
					</li>
				</ul>

				<div className={styles.logout_btn} onClick={() => signOut({ callbackUrl: `/${router.locale}` })}>
					<p>{t("Logout")}</p>
				</div>
			</div>
			<div className={styles.content}>
				{activeTab === "Add Product" && (
					<>
						<TabsHeader title={t("Add Product")} description={t("here you can add products to the store using this form")} />
						<div className={styles.tabContent}>
							<AddProductTab />
						</div>
					</>
				)}
				{activeTab === "Products" && (
					<>
						<TabsHeader title={t("Products")} description={t("here you can see the store products and adit them")} />
						<div className={styles.tabContent}>
							<ProductsTab />
						</div>
					</>
				)}
				{activeTab === "Users" && (
					<>
						<TabsHeader title={t("Users")} description={t("here you can see users and edit them")} />
						<div className={styles.tabContent}>
							<UsersTab />
						</div>
					</>
				)}
				{activeTab === "Orders" && (
					<>
						<TabsHeader title={t("Orders")} description={t("here you can see orders that users have been made")} />
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
	const { locale } = context;
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
		props: {
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
