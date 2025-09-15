import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Header from "./components/Header/Header";
import Prelude from "./components/prelude/Prelude";
import Lenis from 'lenis';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, []);

  const handlePreludeComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      {/* Preloader que desaparece cuando termine */}
      <AnimatePresence>
        {isLoading && <Prelude onComplete={handlePreludeComplete} />}
      </AnimatePresence>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;