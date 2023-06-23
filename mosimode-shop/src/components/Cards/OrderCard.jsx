import React from "react";
import styles from "./OrderCard.module.css";
import Image from "next/image";

const OrderCard = ({ order }) => {
	console.log(order);
	return (
		<div key={order.id} className={styles.orders}>
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
								<Image className={styles.productImage} src={item.product.image} alt={item.product.title} width={50} height={60} />
								<div>
									<div className={styles.itemId}>id: {item.product.id}</div>
									<p className={styles.itemName}>{item.product.title}</p>
								</div>
								<p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
								<p className={styles.itemPrice}>Price: {item.price}</p>
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
		</div>
	);
};

export default OrderCard;
