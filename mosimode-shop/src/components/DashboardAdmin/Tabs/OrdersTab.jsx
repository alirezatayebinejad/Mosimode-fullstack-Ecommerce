import React, { useEffect, useState } from "react";
import styles from "./OrdersTab.module.css";
import axios from "axios";

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
						<li key={order.id} className={styles.orders}>
							<div className={styles.orderDetails}>
								<div className={styles.orderHeader}>
									<div className={styles.orderId}>Order ID: {order.id}</div>
									<div className={styles.paymentStatus}>status: {order.paymentStatus}</div>
									<div className={styles.orderAmount}>Total Amount: {order.totalAmount}</div>
								</div>
								<div className={styles.orderItems}>
									<h3>Order Items:</h3>
									<ul className={styles.orderItemList}>
										{order.items.map((item) => (
											<li key={item.id} className={styles.orderItem}>
												<div className={styles.itemId}>id: {item.product.id}</div>
												<div className={styles.itemName}>{item.product.title}</div>

												<div className={styles.itemQuantity}>Quantity: {item.quantity}</div>
												<div className={styles.itemPrice}>Price: {item.price}</div>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className={styles.orderAddress}>
								<h3>Delivery Address:</h3>
								<div className={styles.addressLine}>name: {order.name}</div>
								<div className={styles.addressLine}>phone number: {order.phonenumber}</div>
								<div className={styles.addressLine}>address: {order.address}</div>
								<div className={styles.addressLine}>city: {order.city}</div>
								<div className={styles.addressLine}>state: {order.state}</div>
								<div className={styles.addressLine}>postal code: {order.postalcode}</div>
								<div className={styles.addressLine}>delivery: {order.deliveryMethod}</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className={styles.noOrders}>No orders found.</div>
			)}
		</div>
	);
};

export default OrdersTab;
