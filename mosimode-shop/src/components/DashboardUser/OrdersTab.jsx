import React from "react";
import styles from "./OrdersTab.module.css";
import OrderCard from "../Cards/OrderCard";

const OrdersTab = ({ orders }) => {
	return (
		<div className={styles.ordersTab}>
			<h2>Your Orders</h2>
			{orders.length > 0 ? orders.map((order) => <OrderCard order={order} key={order.id} />) : <p>No orders found.</p>}
		</div>
	);
};

export default OrdersTab;
