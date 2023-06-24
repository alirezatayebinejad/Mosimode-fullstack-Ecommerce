import React, { useState } from "react";
import styles from "./index.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { openPopup } from "../../store/messagePopupSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const CheckoutPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const cartItems = useSelector((state) => state.cart.cart);
	const totalPrice = useSelector((state) => state.cart.totalPrice);
	const { data, status } = useSession();
	const isAuthenticated = status === "unauthenticated" && data === null ? false : true;
	const [formData, setFormData] = useState({ name: "", phoneNumber: "", address: "", city: "", state: "", postalCode: "", message: "" });
	const [btndisable, setBtndisable] = useState(false);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setBtndisable(true);

		const userId = data?.user ? data.user.id : undefined;
		let anonymousUserUuid = undefined;
		if (!isAuthenticated) anonymousUserUuid = localStorage.getItem("anonymousUserID");

		const { name, phoneNumber, address, state, city, postalCode, message } = formData;

		try {
			const orderData = {
				name,
				phoneNumber,
				address,
				state,
				city,
				postalCode,
				message,
				cartItems,
				totalPrice,
				userId,
				anonymousUserUuid,
			};

			const createdOrder = await axios.post("/api/createOrder", orderData);

			console.log("Order created:", createdOrder);
			dispatch(openPopup({ message: "order created", mood: true }));

			setFormData({ name: "", phoneNumber: "", address: "", state: "", city: "", postalCode: "", message: "" });

			dispatch(clearCart({ userId, anonymousUserUuid }));
			setBtndisable(false);
			router.push(`/checkout/payment?orderId=${createdOrder.data.id}`);
		} catch (error) {
			setBtndisable(false);
			// Handle error, e.g., show an error message
			console.error("Error creating order:", error);
		}
		setBtndisable(false);
	};

	return (
		<>
			<Header />
			<div className={styles.checkoutPage}>
				<div className={styles.orderItems}>
					<h2>Order Items</h2>
					<ul>
						{cartItems.map((item) => (
							<li key={item.product.id}>
								<img src={item.product.image} alt={item.product.title} />
								<span>{item.product.title}</span>
								<span>Quantity: {item.count}</span>
								<span>Price: ${item.product.price}</span>
							</li>
						))}
					</ul>
					<div className={styles.totalPrice}>Total: ${totalPrice}</div>
				</div>
				<div className={styles.orderForm}>
					<h2>Order Form</h2>
					<form onSubmit={handleSubmit}>
						<div className={styles.formGroup}>
							<label htmlFor="name">Name:</label>
							<input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="phoneNumber">Phone Number:</label>
							<input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="address">Address:</label>
							<input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="state">state:</label>
							<input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="city">City:</label>
							<input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="postalCode">Postal Code:</label>
							<input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="message">Message:</label>
							<textarea id="message" name="message" value={formData.message} onChange={handleInputChange}></textarea>
						</div>
						<button type="submit" disabled={btndisable}>
							Place Order
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default CheckoutPage;
