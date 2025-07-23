import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [isInCart, setIsInCart] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register');
            return;
        }

        console.log("👤 Logged in user:", user);

      // ✅ Use user-specific cart key consistently
    const cartKey = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        console.log("🛒 Cart for this user:", cart);

        setCartItems(cart);

        // Load purchased products from backend
        axios.post('http://localhost:8000/api/products/purchased', { user_id: user.id })
            .then(res => setPurchasedItems(res.data))
            .catch(err => console.error('Error loading purchased products:', err));
    }, [navigate]);

    const getFirstImage = (item) => {
        try {
            const images = Array.isArray(item.image) ? item.image : JSON.parse(item.image);
            return `http://localhost:8000${images[0]}`;
        } catch {
            return '';
        }
    };

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

  const handleRemoveFromCart = (e, indexToRemove) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem('user'));
    const cartKey = `cart_${user.email}`;

    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);

    // ✅ Save back to the same key
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
};


    const handleBuyAll = () => {
        navigate('/buynowall');
    };

    return (
        <div className="cart-container">
            <h2 className="cart-heading">🛒 Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-grid">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="cart-card"
                                onClick={() => handleCardClick(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {getFirstImage(item) && (
                                    <img src={getFirstImage(item)} alt={item.name} className="cart-card-image" />
                                )}
                                <div className="cart-card-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ₹{item.price}</p>
                                    <div className="cart-card-actions">
                                        <button className="remove-btn" onClick={(e) => handleRemoveFromCart(e, index)}>
                                            Remove
                                        </button>
                                        <button className="buy-btn" onClick={() => navigate(`/buynow/${item.id}`)}>
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="buy-all-btn" onClick={handleBuyAll}>
                        Buy All in Cart
                    </button>
                </>
            )}

            <hr style={{ margin: '40px 0', borderTop: '1px solid #ccc' }} />

            <div className="order-summary-section">
                <h2 className="cart-heading">🧾 Purchased Products</h2>
                {purchasedItems.length === 0 ? (
                    <p className="empty-cart">No products purchased yet.</p>
                ) : (
                    <div className="cart-grid">
                        {purchasedItems.map((item, index) => (
                            <div
                                key={index}
                                className="cart-card"
                                onClick={() => handleCardClick(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {getFirstImage(item) && (
                                    <img src={getFirstImage(item)} alt={item.name} className="cart-card-image" />
                                )}
                                <div className="cart-card-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
