import React, { useState } from "react";
import styles from "./ChatPopup.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "next-i18next";

const ChatPopup = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation("all");

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<IconButton className={styles.chatButton} onClick={handleClick}>
				{isOpen ? <CloseIcon sx={{ fontSize: "40px" }} /> : <ChatIcon sx={{ fontSize: "40px" }} />}
			</IconButton>
			{isOpen && (
				<div className={styles.popup}>
					<div className={styles.popupheader}>
						<h3>{t("Ask Us Anything")}</h3>
					</div>
					<form>
						<input type="text" id="name" placeholder={t("your name")} />
						<input type="number" id="name" placeholder={t("your phone number")} />
						<input type="email" id="email" placeholder={t("type your email")} />
						<textarea placeholder={t("Enter your message")} />
						<button type="submit">{t("Send")}</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default ChatPopup;
