import React from "react";
import Navbar from "../components/Navbar"; // Adjust the path based on your folder structure
import "./Home.css"; // Create and style this CSS file
import { Link } from "react-router-dom";
import ProductList from "./ProductList";

export default function Home() {

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Latest arrivals</h1>
          <button className="shop-now-btn">Shop now</button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1542060748-10c28b62716e"
            alt="Fashion Model"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="category-card">Women's clothing</div>
        <div className="category-card">Men's clothing</div>
        <div className="category-card">Accessories</div>
      </section>

      <ProductList/>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
              alt="Basic Tee"
            />
            <p className="name">Basic Tee</p>
            <p className="price">$35.00</p>
          </div>

          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1600180758890-94a45c0c4b2c?auto=format&fit=crop&w=600&q=80" 
                 alt="Bag" 
                 />

            <p className="name">Leather Bag</p>
            <p className="price">$40.00</p>
          </div>

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
              alt="Casual Shirt"
            />
            <p className="name">Casual Shirt</p>
            <p className="price">$70.00</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h3>Subscribe to our newsletter</h3>
        <p>And get 10% off your first order</p>
        <div className="subscribe-box">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </section>
      <footer className="footer">
        <p>© 2025 ShopNow. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>

    </div>
  );

};