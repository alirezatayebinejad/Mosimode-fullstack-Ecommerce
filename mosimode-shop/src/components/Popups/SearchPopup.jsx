import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SearchPopup.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "next-i18next";

const SearchPopup = ({ setIsSearchOpen }) => {
	const { t } = useTranslation("all");
	const [searchTerm, setSearchTerm] = useState("");
	const router = useRouter();
	const handleSearch = () => {
		router.push({ pathname: "/search", query: { search: searchTerm } });
		setIsSearchOpen(false);
		setSearchTerm("");
	};
	return (
		<>
			<div className={styles.background} onClick={() => setIsSearchOpen(false)}></div>
			<div className={styles.searchpopup} dir={"ltr"}>
				<div className={styles.close} onClick={() => setIsSearchOpen(false)}>
					<CloseIcon />
					{t("close")}
				</div>
				<div className={styles.search}>
					<input type="text" name="search" onChange={(e) => setSearchTerm(e.target.value)} placeholder={t("search product...")} />
					<button onClick={handleSearch}>
						<SearchIcon />
					</button>
				</div>
			</div>
		</>
	);
};

export default SearchPopup;
