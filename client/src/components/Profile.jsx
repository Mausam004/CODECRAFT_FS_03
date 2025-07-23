import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Invalid user data:", error);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return null; // Optional loading state

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Welcome, {user.name}!</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}