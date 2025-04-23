import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div 
      className="relative h-[300px]" 
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className='relative h-[calc(100vh+300px)] -top-[100vh]'>
        <div className='h-[300px] sticky top-[calc(100vh-300px)] text-white'>
          <div className='py-8 px-12 h-full w-full flex flex-col justify-between' style={{background: '#8c2f39'}}>
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
          <p className="text-[3vw] sm:text-[1vw]">parfums © | 2025, All Rights Reserved</p>
      </div>
  )
}

const Nav = () => {
  return (
    <div className='flex shrink-0 gap-20'>
        <div className='flex flex-col gap-2'>
            <h3 className="mb-2 uppercase">about us</h3>
            <p>Where to find us</p>
            <p>FAQs</p>
            <p>Our Mission</p>
            <p>Contact Us</p>
        </div>
        <div className='flex flex-col gap-2'>
        <h3 className="mb-2 uppercase">client care</h3>
            <p>Shipping</p>
            <p>Legal notice</p>
            <p>Privacy</p>
            <p>Cookies</p>
        </div>
    </div>
  )
}

export default Footer;