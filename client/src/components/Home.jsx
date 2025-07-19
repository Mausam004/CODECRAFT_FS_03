import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <>
      <h1>Welcome to Our App</h1>
      <p>Create your account to get started</p>
      <button onClick={handleNavigate}>Register Now</button>
    </>
  );
}