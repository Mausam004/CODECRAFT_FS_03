import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/get/${id}`)
            .then(res => {
                setProduct(res.data);
                const imgs = JSON.parse(res.data.image);
                setSelectedImage(`http://localhost:8000${imgs[0]}`);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

     useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !product) return;

        const cartKey = `cart_${user.email}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const exists = cart.find(p => p.id === product.id);
        setIsInCart(!!exists); // ✅ Update state if found in cart
    }, [product]);

    if (!product) return <p>Loading...</p>;

    const images = JSON.parse(product.image);


    const checkAuth = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register');
            return false;
        }
        return true;
    };


    const handleBuyNow = () => {
        if (!checkAuth()) return;
        navigate(`/buynow/${product.id}`);
    };

    const handleAddToCart = () => {
        if (!checkAuth()) return;
        const user = JSON.parse(localStorage.getItem('user'));
        const existingCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
        existingCart.push(product);
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(existingCart));
         setIsInCart(true); 
        toast.success('Product added to cart!');
        setTimeout(() => {
            navigate("/cart");
        }, 2000);
    };
  
    
    return (
        <div className="product-container">
            <div className="left-column">
                <div className="main-image">
                    <img src={selectedImage} alt={product.name} />
                </div>
                <div className="thumbnail-gallery">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={`http://localhost:8000${img}`}
                            alt={`${product.name}-${idx}`}
                            onClick={() => setSelectedImage(`http://localhost:8000${img}`)}
                            className={selectedImage === `http://localhost:8000${img}` ? 'active' : ''}
                        />
                    ))}
                </div>
            </div>
            <div className="right-column">
                <h2 className="product-title">{product.name}</h2>
                <p className="product-price">₹{product.price}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-info">
                    <p><strong>In Stock:</strong> {product.stock_quantity}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Sizes:</strong> {product.size}</p>
                    <p><strong>Gender:</strong> {product.gender}</p>
                </div>
               <div className="button-group">
                    {product.stock_quantity === 0 ? (
                        <span className="out-of-stock">Out of Stock</span>
                    ) : (
                        <>  {!isInCart && (
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            )}
                           
                            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}