import { useState } from 'react';
import Register from './components/Register';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Forgot from './components/Forgot';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import OtpForm from './components/OtpForm';
import Profile from './components/Profile';
import NavBar from './components/Navbar';
import AddProduct from './admin/AddProduct';
import ProductList from './components/ProductList';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './admin/Admin';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import SearchBar from './components/SearchBar';
import BuyNowPage from './components/BuyNow';
import Shop from './components/Shop';
import BuyNowAll from './components/BuyNowAll';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/otp-form/:email" element={<OtpForm/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-list" element={<ProductList/>} />
        <Route path="/admin/*" element={<Admin/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/search" element={<SearchBar/>} />
        <Route path="/buynow/:id" element={<BuyNowPage/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/buynowall" element={<BuyNowAll />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;