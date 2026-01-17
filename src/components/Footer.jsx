import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div 
      className="relative h-[300px]" 
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className='relative h-[calc(100vh+300px)] -top-[100vh]'>
        <div className='h-[300px] sticky top-[calc(100vh-300px)] text-white'>
          <div className='py-8 px-12 h-full w-full flex flex-col justify-between' style={{background: '#4e0808'}}>
            <Section1 />
            <Section2 />
          </div>
        </div>
      </div>
    </div>
  );
};

const Section1 = () => {
  return (
      <div>
          <Nav />
      </div>
  )
}

const Section2 = () => {
  return (
      <div className='flex justify-end items-end'>
          <img className='w-24 mr-2' src="/assets/images/LogoDefBigWhite.svg" alt="Big logo of Sinuo" />
          <p className="text-[3vw] sm:text-[1vw]">parfums © | 2026, All Rights Reserved</p>
      </div>
  )
}

const Nav = () => {
  return (
    <div className='flex shrink-0 gap-20'>
        <div className='flex flex-col gap-2'>
            <h3 className="mb-2 uppercase">about us</h3>
            <Link to="/where-to-find-us">Where to find us</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/our-mission">Our Mission</Link>
            <Link to="/contact">Contact Us</Link>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className="mb-2 uppercase">client care</h3>
          <Link to="/shipping">Shipping</Link>
          <Link to="/legal-notice">Legal notice</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
    </div>
  )
}

export default Footer;