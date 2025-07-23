import React,{useEffect,useState}from "react";
import Navbar from "../components/Navbar"; // Adjust the path based on your folder structure
import "./Home.css"; // Create and style this CSS file
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import axios from "axios";
import NewArrivals from "./NewArrivals";

export default function Home() {

  const [homeProducts, setHomeProducts] = useState([]);

  const fetchLimitedProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/get");
      setHomeProducts(res.data.slice(0, 10)); // only show 10 products
    } catch (err) {
      console.error("Error fetching homepage products:", err);
    }
  };

  useEffect(() => {
    fetchLimitedProducts();
  }, []); 


  return (
    <div className="home-page">
      <Navbar />
         {/* Search Bar */}
           <div className="nav-search">
            <SearchBar />
            </div>

        <ProductList limit={10} />
        <NewArrivals/>
 
     <section className="promo-banner">
  <h3>🎉 Limited Time Offer!</h3>
  <p>Flat 20% off on all Accessories. Hurry, ends soon!</p>
  <Link to="/shop">
    <button className="shop-now-btn">Shop Now</button>
  </Link>
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