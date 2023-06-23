import React, { useEffect, useState } from "react";
import styles from "./OrdersTab.module.css";
import axios from "axios";
import OrderCard from "../../Cards/OrderCard";

const OrdersTab = () => {
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
						<OrderCard order={order} />
					))}
				</ul>
			) : (
				<div className={styles.noOrders}>No orders found.</div>
			)}
		</div>
	);
};

export default OrdersTab;
