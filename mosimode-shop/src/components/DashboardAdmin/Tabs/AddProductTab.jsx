import React, { useState } from "react";
import axios from "axios";
import styles from "./AddProductTab.module.css";
import { useDispatch } from "react-redux";
import { openPopup } from "@/store/messagePopupSlice";

const AddProductTab = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [selectedImage, setSelectedImage] = useState(false);
	const [selectedFile, setSelectedFile] = useState(false);
	const [description, setDescription] = useState("");
	const [options, setOptions] = useState([]);
	const [tags, setTags] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleImageChange = ({ target }) => {
		if (target.files) {
			const file = target.files[0];
			setSelectedImage(URL.createObjectURL(file));
			setSelectedFile(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (!selectedFile) {
				dispatch(openPopup({ message: "you did not selected a picture", mood: false }));
				return;
			}
			const formData = new FormData();
			formData.append("myImage", selectedFile);
			const { data } = await axios.post("/api/admin/upload", formData);
			const imageUrl = data.imageUrl;

			const productData = { title, image: imageUrl, price: +price, description, options, tags, categories };

			const response = await axios.post("/api/admin/addProducts", productData);

			// Handle successful response here
			dispatch(openPopup({ message: "the product is added successfully", mood: true }));

			// Reset form fields
			setTitle("");
			setSelectedImage(false);
			setSelectedFile(false);
			setPrice(0);
			setDescription("");
			setOptions([]);
			setTags([]);
			setCategories([]);
		} catch (error) {
			dispatch(openPopup({ message: "there was a problem with adding", mood: false }));
			console.error(error);
		}

		setLoading(false);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<label>
						<input type="file" hidden onChange={handleImageChange} />
						<div className={styles.ImageUpload}>{selectedImage ? <img src={selectedImage} alt="" /> : <span>Select Image</span>}</div>
					</label>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="title">
						Title:
						<input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
					</label>

					<label htmlFor="price">
						Price:(dollars)
						<input type="number" step="0.01" min={0} id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
					</label>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="options">
						options:(separate with comma)
						<input
							type="text"
							id="options"
							value={options}
							onChange={(e) => {
								setOptions(e.target.value.split(","));
							}}
						/>
					</label>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="tags">
						Tags:(separate with comma)
						<input
							type="text"
							id="tags"
							value={tags}
							onChange={(e) => {
								setTags(e.target.value.split(","));
							}}
						/>
					</label>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="categories">
						Categories:(separate with comma)
						<input
							type="text"
							id="categories"
							value={categories}
							onChange={(e) => {
								setCategories(e.target.value.split(","));
							}}
							required
						/>
					</label>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="description">
						Description:
						<textarea id="description" maxLength={180} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
					</label>
				</div>
				<button type="submit" className={styles.submitButton} disabled={loading} style={{ opacity: loading ? "0.5" : "1" }}>
					{loading ? "adding..." : "Add Product"}
				</button>
			</form>
		</div>
	);
};

export default AddProductTab;
