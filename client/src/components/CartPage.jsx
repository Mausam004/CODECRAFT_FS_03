import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-heading">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <div className="cart-grid">
                    {cartItems.map((item, index) => {
                        let imageUrl = '';
                        try {
                            const images = JSON.parse(item.image);
                            imageUrl = `http://localhost:8000${images[0]}`;
                        } catch (e) {
                            console.error('Invalid image format:', e);
                        }

                        return (
                            <div
                                key={index}
                                className="cart-card"
                                onClick={() => handleCardClick(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={item.name}
                                        className="cart-card-image"
                                    />
                                )}
                                <div className="cart-card-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ₹{item.price}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
