import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Header from "./components/Header/Header";
import Prelude from "./components/prelude/Prelude";
import Lookbook from "./components/Lookbook";
import { CartProvider } from "./components/cart/CartContext";

function AppShell() {
  const location = useLocation();
  const first = useRef(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setIsLoading(true);
  }, [location.pathname]);

  const handlePreludeComplete = () => setIsLoading(false);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Prelude key={location.pathname} onComplete={handlePreludeComplete} />
        )}
      </AnimatePresence>

      <Header />

      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lookbook" element={<Lookbook />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppShell />
      </Router>
    </CartProvider>
  );
}

export default App;