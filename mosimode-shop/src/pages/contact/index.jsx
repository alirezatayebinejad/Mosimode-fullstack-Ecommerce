import React, { useState } from "react";
import styles from "./index.module.css";
import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PagesHeader from "@/components/Banner/PagesHeader";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here (e.g., send data to backend API)
		console.log(formData);
	};

	return (
		<>
			<Head>
				<title>contact | mosimode</title>
				<meta name="description" content="mosimode ecommerce website" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>
				<PagesHeader title={"contact us"} />
				<div className={styles.contactPage}>
					<div className={styles.contactInfo}>
						<div className={styles.section}>
							<LocationOnIcon className={styles.icon} />
							<p>123 Main St, City, Country</p>
						</div>
						<div className={styles.section}>
							<EmailIcon className={styles.icon} />
							<p>info@example.com</p>
						</div>
						<div className={styles.section}>
							<PhoneIcon className={styles.icon} />
							<p>+1 123 456 7890</p>
						</div>
						<div className={styles.section}>
							<InstagramIcon className={styles.icon} />
							<a href="https://www.instagram.com/example/" target="_blank" rel="noopener noreferrer">
								Instagram
							</a>
						</div>
						<div className={styles.section}>
							<WhatsAppIcon className={styles.icon} />
							<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
								WhatsApp
							</a>
						</div>
					</div>
					<div className={styles.contactForm}>
						<h2>Send Us a Message</h2>
						<form onSubmit={handleSubmit}>
							<div className={styles.formGroup}>
								<label htmlFor="firstName">First Name *</label>
								<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="lastName">Last Name</label>
								<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="email">Email *</label>
								<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="phoneNumber">Phone Number</label>
								<input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="message">Message *</label>
								<textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
							</div>
							<button type="submit">Send Message</button>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default ContactPage;
