import React, { useState, useEffect, useRef } from "react";
import styles from "./ProductsLists.module.css";
import { useRouter } from "next/router";
import ProductCard from "@/components/Cards/ProductCard";

const ProductsLists = ({ products, selectedCategory }) => {
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory]);
	const router = useRouter();
	const productsPerPage = 7;
	const filteredProducts = selectedCategory ? products.filter((item) => item.category.some((cat) => cat.name === selectedCategory)) : products;
	const pageNumbers = Math.ceil(filteredProducts.length / productsPerPage);
	// Pagination
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	const generatePageNumbers = () => {
		const numbers = [];
		for (let i = 1; i <= pageNumbers; i++) {
			numbers.push(i);
		}
		return numbers;
	};

	const productsRef = useRef(null); //the top element
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		if (productsRef.current) {
			productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};
	const handleProductClick = (productId) => {
		router.push(`/shop/${productId}`);
	};

	const renderProductCards = () => {
		const products = currentProducts.map((product) => <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />);
		return products;
	};
	return (
		<section className={styles.productslists} ref={productsRef}>
			<div className={styles.products}>{renderProductCards()}</div>
			<div className={styles.pagination}>
				{generatePageNumbers().length > 1 &&
					generatePageNumbers().map((pageNumber, index) => (
						<button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === index + 1 ? styles.activepage : ""}>
							{pageNumber}
						</button>
					))}
			</div>
		</section>
	);
};

export default ProductsLists;
