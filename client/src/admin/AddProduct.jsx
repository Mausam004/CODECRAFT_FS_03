import { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
        size: '',
        gender: 'Unisex',
        images: [], // changed from image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({ ...formData, images: files }); // accept multiple files
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append all form fields except images
        Object.keys(formData).forEach(key => {
            if (key !== 'images') {
                data.append(key, formData[key]);
            }
        });

        // Append all images
        for (let i = 0; i < formData.images.length; i++) {
            data.append('images', formData.images[i]);
        }

        try {
            await axios.post('http://localhost:8000/api/products/add', data);
            alert('Product added successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to add product');
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />

            <label>Description</label>
            <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>

            <label>Price</label>
            <input type="number" step="0.01" name="price" placeholder="Price" onChange={handleChange} required />

            <label>Category</label>
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />

            <label>Stock Quantity</label>
            <input type="number" name="stock_quantity" placeholder="Stock Quantity" onChange={handleChange} required />

            <label>Sizes</label>
            <input type="text" name="size" placeholder="Sizes (S, M, L, XL)" onChange={handleChange} required />

            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={formData.gender}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
            </select>

            <label>Product Images</label>
            <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />

            <button type="submit">Add Product</button>
        </form>
    );
}
