import React, { useEffect, useState } from "react";
import styles from "./OrdersTab.module.css";
import Image from "next/image";
import OrderCard from "../Cards/OrderCard";

const OrdersTab = ({ orders }) => {
	console.log(orders);
	return (
		<div className={styles.ordersTab}>
			<h2>Your Orders</h2>
			{orders.length > 0 ? orders.map((order) => <OrderCard order={order} />) : <p>No orders found.</p>}
		</div>
	);
};

export default OrdersTab;
