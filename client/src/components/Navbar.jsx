import { useState, useEffect } from "react";
import { FaUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "undefined") {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <span className="brand-name">Shop<span className="highlight">Now</span></span>
      </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

   
      {/* Right Actions */}
      <div className="nav-actions">
        <FaShoppingCart
          className="cart-icon"
          size={24}
          title="Cart"
          onClick={() => navigate("/cart")}
        />

        {user ? (
          <FaUserCircle
            className="user-icon"
            size={26}
            title="Profile"
            onClick={() => navigate("/profile")}
          />
        ) : (
          <button className="register-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        )}
      </div>
    </nav>
  );
}
