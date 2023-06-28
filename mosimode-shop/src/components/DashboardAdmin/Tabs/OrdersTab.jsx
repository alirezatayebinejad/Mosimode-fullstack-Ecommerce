import React, { useEffect, useState } from "react";
import styles from "./OrdersTab.module.css";
import axios from "axios";
import OrderCard from "../../Cards/OrderCard";
import { useTranslation } from "next-i18next";

const OrdersTab = () => {
	const { t } = useTranslation("all");
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			const response = await axios.get("/api/getOrders");
			setOrders(response.data);
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	};

	return (
		<div className={styles.ordersTab}>
			{orders.length > 0 ? (
				<ul className={styles.orderList}>
					{orders.map((order) => (
						<OrderCard order={order} key={order.id} />
					))}
				</ul>
			) : (
				<div className={styles.noOrders}>{t("No orders found")}.</div>
			)}
		</div>
	);
};

export default OrdersTab;
