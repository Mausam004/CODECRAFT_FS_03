import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);

                const storedOrders = JSON.parse(localStorage.getItem("purchased")) || [];

                // Filter orders for this user
                const userOrders = storedOrders.filter(order => order.userId === parsedUser.email);
                setOrders(userOrders);

            } catch (error) {
                console.error("Invalid user or orders data:", error);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Welcome, {user.name}!</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="orders-section">
                <h3>Your Orders</h3>
                {orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <div className="orders-list">
                        {orders.map((order, index) => (
                            <div key={index} className="order-card">
                                <p><strong>Product:</strong> {order.product.name}</p>
                                <p><strong>Price:</strong> ₹{order.product.price}</p>
                                <p><strong>Ordered on:</strong> {new Date(order.timestamp).toLocaleString()}</p>
                                {order.product.image && (
                                    <img
                                        src={`http://localhost:8000${JSON.parse(order.product.image)[0]}`}
                                        alt={order.product.name}
                                        className="order-image"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
