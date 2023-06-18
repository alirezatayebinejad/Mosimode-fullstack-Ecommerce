import React from "react";
import styles from "./TabsHeader.module.css";

const TabsHeader = ({ title, description }) => {
	return (
		<div className={styles.tabs_header}>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.description}>{description}</p>
		</div>
	);
};

export default TabsHeader;
