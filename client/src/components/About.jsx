import React from "react";
import Navbar from "../components/Navbar";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>About <span className="highlight">ShopNow</span></h1>
          <p>Your one-stop destination for style and essentials.</p>
        </div>
        <div className="about-hero-image">
          <img src="/public/shopping.png"  alt="Shopping" />
        </div>
      </section>

      {/* Our Story */}
      <section className="about-section">
        <h2>Our Story</h2>
        <div className="about-story">
          <img src="/public/our story.png" alt="Our Story" />
          <p>
            At ShopNow, we specialize in the latest fashion trends, offering a wide
            range of clothing and accessories for all styles and occasions.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="offer-section">
        <h2 className="section-title">What We Offer</h2>
        <div className="offer-grid">

            <div className="offer-card">
            <img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="Clothing Icon" />
            <p>Fashion & Clothing</p>
            </div>

            <div className="offer-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2622/2622181.png" alt="Accessories Icon" />
            <p>Trendy Accessories</p>
            </div>

            <div className="offer-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="Deals Icon" />
            <p>Exclusive Offers</p>
            </div>

        </div>
        </section>



      {/* Our Mission */}
      <section className="about-section mission">
        <h2>Our Mission</h2>
        <p>
          To make everyday shopping effortless, stylish, and reliable. Whether it's fashion or essentials,
          we believe in quality, affordability, and a seamless shopping experience.
        </p>
        <img src="https://images.unsplash.com/photo-1549924231-f129b911e442" alt="Mission" />
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© 2025 ShopNow. All rights reserved.</p>
      </footer>
    </div>
  );
}
