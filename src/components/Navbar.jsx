import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect } from "react";
import { gsap } from "gsap";


const Navbar = () => {
    useEffect(() => {
        gsap.fromTo(".navbar", { y: -100 }, { y: 0, duration: 4, ease: "power2.out" });
    }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/assets/images/logo1.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;