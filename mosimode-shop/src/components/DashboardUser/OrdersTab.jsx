import React from "react";
import styles from "./OrdersTab.module.css";
import OrderCard from "../Cards/OrderCard";
import { useTranslation } from "next-i18next";

const OrdersTab = ({ orders }) => {
	const { t } = useTranslation("all");
	return (
		<div className={styles.ordersTab}>
			<h2>{t("Your Orders")}</h2>
			{orders.length > 0 ? orders.map((order) => <OrderCard order={order} key={order.id} />) : <p>{t("No orders found")}.</p>}
		</div>
	);
};

export default OrdersTab;
