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
import WhereToFindUs from "./components/footer/WhereToFindUs";
import FAQs from "./components/footer/FAQs";
import OurMission from "./components/footer/OurMission";
import Shipping from "./components/footer/Shipping";
import LegalNotice from "./components/footer/LegalNotice";
import Privacy from "./components/footer/Privacy";
import Cookies from "./components/footer/Cookies";
import { CartProvider } from "./components/cart/CartContext";
import CartDrawer from "./components/cart/CartDrawer";
import Checkout from "./components/cart/Checkout";

function AppShell() {
  const location = useLocation();
  const first = useRef(true);

  const [isLoading, setIsLoading] = useState(true);

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      const lenis = window.lenis;
  
      if (lenis?.scrollTo) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, [pathname]);
  
    return null;
  }

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
      <ScrollToTop />
      <AnimatePresence>
        {isLoading && (
          <Prelude key={location.pathname} onComplete={handlePreludeComplete} />
        )}
      </AnimatePresence>

      <Header />

      <CartDrawer />

      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/where-to-find-us" element={<WhereToFindUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
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