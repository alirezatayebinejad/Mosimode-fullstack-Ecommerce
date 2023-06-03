import React, { useState, useEffect } from "react";
import styles from "./ProductsLists.module.css";
import { useRouter } from "next/router";
import ProductCard from "@/components/Cards/ProductCard";

const ProductsLists = ({ products, selectedCategory }) => {
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		setCurrentPage(1); // Reset currentPage to 1 when selectedCategory changes
	}, [selectedCategory]);

	const router = useRouter();
	const productsPerPage = 7;
	const filteredProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products;
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
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const handleProductClick = (productId) => {
		router.push(`/shop/${productId}`);
	};
	return (
		<section className={styles.productslists}>
			<div className={styles.products}>
				{currentProducts.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						title={product.title}
						image={product.image}
						price={product.price}
						rating={product.rating}
						category={product.category}
						onClick={() => handleProductClick(product.id)}
					/>
				))}
			</div>
			<div className={styles.pagination}>
				{generatePageNumbers().length > 1 &&
					generatePageNumbers().map((pageNumber, index) => (
						<button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === index + 1 && styles.activepage}>
							{pageNumber}
						</button>
					))}
			</div>
		</section>
	);
};

export default ProductsLists;
