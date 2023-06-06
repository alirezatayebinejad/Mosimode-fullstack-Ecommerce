import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SearchPopup.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchPopup = ({ setIsSearchOpen }) => {
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
			<div className={styles.searchpopup}>
				<div className={styles.close} onClick={() => setIsSearchOpen(false)}>
					<CloseIcon />
					close
				</div>
				<div className={styles.search}>
					<input type="text" name="search" onChange={(e) => setSearchTerm(e.target.value)} placeholder="search product..." />
					<button onClick={handleSearch}>
						<SearchIcon />
					</button>
				</div>
			</div>
		</>
	);
};

export default SearchPopup;
