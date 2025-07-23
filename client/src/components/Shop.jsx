import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import Navbar from "../components/Navbar";

export default function Shop() {
  const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        size: '',
        gender: '',
        minPrice: '',
        maxPrice: ''
    });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/get");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 

   const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
    );
    fetchProducts(activeFilters);
};

    const handleReset = () => {
        const resetFilters = {
            category: '',
            size: '',
            gender: '',
            minPrice: '',
            maxPrice: ''
        };
        setFilters(resetFilters);
        fetchProducts();
    };

    const handleCardClick = (product) => {
        navigate(`/product/${product.id}`);
    };

  return (
    <>
      <Navbar />
       <form className="filter-form" onSubmit={handleFilterSubmit}>
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="Tshirt">T-shirt</option>
                    <option value="Dresses">Dress</option>
                    <option value="Accessories">Accessories</option>
                </select>


                <select name="size" value={filters.size} onChange={handleFilterChange}>
                    <option value="">All Sizes</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                    <option value="">All Genders</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>

                </select>

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                />

                <button type="submit">Apply</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
      <div className="shop-hero">
        <h1 className="shop-heading">Discover Your Style ✨</h1>
        <p className="shop-subheading">Explore our handpicked latest arrivals just for you.</p>
      </div>

      <div className="shop-product-grid">
        {products.map((product) => {
          const images = JSON.parse(product.image || "[]");
          return (
            <div className="shop-product-card" key={product.id}>
              <img
                src={`http://localhost:8000${images[0]}`}
                alt={product.name}
                className="shop-product-img"
              />
              <h3>{product.name}</h3>
              <p className="shop-product-price">₹{product.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
