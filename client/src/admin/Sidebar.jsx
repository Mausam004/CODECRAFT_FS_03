import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
    return (
        <div className="sidebar">
            <h2>Admin</h2>
            <ul className="menu">
                <li><Link to="/admin/products">Product List</Link></li>
                <li><Link to="/admin/add-product">Add Product</Link></li>
            </ul>
        </div>
    );
}