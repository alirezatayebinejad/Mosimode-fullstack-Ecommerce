import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../../store/messagePopupSlice";
import styles from "./MessagePopup.module.css";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const MessagePopup = () => {
	const { t } = useTranslation("all");
	const router = useRouter();
	const { showPopup, message, mood } = useSelector((state) => state.messagePopup);
	const dispatch = useDispatch();

	useEffect(() => {
		if (showPopup) {
			const timeout = setTimeout(() => {
				dispatch(closePopup());
			}, 5000);

			return () => clearTimeout(timeout);
		}
	}, [showPopup]);

	if (!showPopup) {
		return null; // Don't render the popup if showPopup is false
	}

	return (
		<section className={styles.message_container} style={router.locale === "fa" ? { left: "20px" } : { right: "20px" }} dir={router.locale === "en" ? "rtl" : "ltr"}>
			<div className={styles.progressbar} style={{ backgroundColor: `${mood ? "green" : "red"}` }}></div>
			<div className={styles.info}>
				<div className={styles.info_image}>
					{mood ? <MoodIcon sx={{ fontSize: "50px", color: "green" }} /> : <SentimentVeryDissatisfiedIcon sx={{ fontSize: "50px", color: "red" }} />}
				</div>
				<h3>{t(message)}</h3>
			</div>
			<div
				className={styles.closebtn}
				onClick={() => {
					return dispatch(closePopup());
				}}
			>
				<CloseIcon />
			</div>
		</section>
	);
};

export default MessagePopup;
