import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AddProduct from './AddProduct';
import ProductList from './AdminProductList';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('add');

    const renderContent = () => {
        if (activeTab === 'add') return <AddProduct />;
        if (activeTab === 'list') return <AdminProductList />;
    };

    return (
        <div className="admin-dashboard">
            <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
            <div className="dashboard-content">
                {renderContent()}
            </div>
        </div>
    );
}
