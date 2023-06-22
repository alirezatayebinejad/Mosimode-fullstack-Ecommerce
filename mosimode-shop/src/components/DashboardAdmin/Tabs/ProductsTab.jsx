import React, { useState, useEffect } from "react";
import styles from "./ProductsTab.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openPopup } from "@/store/messagePopupSlice";

const ProductsTab = () => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("/api/getProducts");
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
		setLoading(false);
	}, []);

	const handleDelete = async (productId) => {
		try {
			await axios.delete(`/api/admin/deleteProduct?id=${productId}`);
			const remainingProducts = products.filter((item) => {
				return item.id !== productId;
			});
			setProducts(remainingProducts);
			dispatch(openPopup({ message: "the product deleted", mood: true }));
		} catch (error) {
			console.error("Error deleting product:", error);
			dispatch(openPopup({ message: "the product is not deleted", mood: false }));
		}
	};

	return loading ? (
		<h3>Loading...</h3>
	) : (
		<div className={styles.container}>
			<div className={styles.countProducts}>
				<p>total products: {products.length}</p>
			</div>
			{products.map((product) => (
				<div key={product.id} className={styles.product_card}>
					<div className={styles.product_card_info}>
						<img src={product.image} alt="" />
						<h4>{product.id}</h4>
						<div>
							<h3>{product.title}</h3>
							<h3>{product.category[0]?.name}</h3>
						</div>
						<h4>{product.price}</h4>
					</div>
					<button onClick={() => handleDelete(product.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default ProductsTab;
