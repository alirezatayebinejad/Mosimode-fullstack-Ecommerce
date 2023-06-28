import React from "react";
import styles from "./OrderCard.module.css";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const OrderCard = ({ order }) => {
	const { t } = useTranslation("all");
	return (
		<div key={order.id} className={styles.orders}>
			<div className={styles.orderDetails}>
				<div className={styles.orderHeader}>
					<div className={styles.orderId}>
						{t("Order ID")}: {order.id}
					</div>
					<div className={styles.paymentStatus}>
						{t("status")}: {order.paymentStatus}
					</div>
					<div className={styles.orderAmount}>
						{t("Total")}: {order.totalAmount}
					</div>
				</div>
				<div className={styles.orderItems}>
					<h3>{t("Order Items")}:</h3>
					<ul className={styles.orderItemList}>
						{order.items.map((item) => (
							<li key={item.id} className={styles.orderItem}>
								<Image className={styles.productImage} src={item.product.image} alt={item.product.title} width={50} height={60} />
								<div>
									<div className={styles.itemId}>
										{t("id")}: {item.product.id}
									</div>
									<p className={styles.itemName}>{item.product.title}</p>
								</div>
								<p className={styles.itemQuantity}>
									{t("Quantity")}: {item.quantity}
								</p>
								<p className={styles.itemPrice}>
									{t("Price")}: {item.price}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={styles.orderAddress}>
				<h3>{t("Delivery Address")}:</h3>
				<div className={styles.addressLine}>
					{t("name")}: {order.name}
				</div>
				<div className={styles.addressLine}>
					{t("phone number")}: {order.phonenumber}
				</div>
				<div className={styles.addressLine}>
					{t("address")}: {order.address}
				</div>
				<div className={styles.addressLine}>
					{t("city")}: {order.city}
				</div>
				<div className={styles.addressLine}>
					{t("state")}: {order.state}
				</div>
				<div className={styles.addressLine}>
					{t("postal code")}: {order.postalcode}
				</div>
				<div className={styles.addressLine}>
					{t("delivery")}: {order.deliveryMethod}
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
