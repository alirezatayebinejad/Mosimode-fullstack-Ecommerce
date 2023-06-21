import axios from 'axios';
import React, { useState } from 'react'

const test = () => {
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(false);

    const handleUpload = async () => {
        setUploading(true);
        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            const { data } = await axios.post("/api/admin/upload", formData);
        } catch (error) {
            console.log(error.response?.data);
        }
        setUploading(false);
    }
    return (
        <div>
            <label>
                <input type="file" hidden onChange={({ target }) => {
                    if (target.files) {
                        const file = target.files[0];
                        setSelectedImage(URL.createObjectURL(file));
                        setSelectedFile(file);
                    }
                }} />
                <div>
                    {selectedImage ? (
                        <img src={selectedImage} alt="" />
                    ) : (
                        <span>Select Image</span>
                    )}
                    <button disabled={uploading} onClick={handleUpload}
                        style={{ opacity: uploading ? "0.5" : "1" }}
                    >{uploading ? "uploading.." : "upload"}</button>
                </div>
            </label>
        </div>
    )
}

export default test