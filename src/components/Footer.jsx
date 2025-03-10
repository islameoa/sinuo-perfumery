import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div 
      className="relative h-[800px]" 
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className='relative h-[calc(100vh+800px)] -top-[100vh]'>
        <div className='h-[800px] sticky top-[calc(100vh-800px)] text-white'>
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
      <div className='flex justify-between items-end'>
          <img className='w-1/2' src="/assets/images/LogoDefBigWhite.svg" alt="Big logo of Sinuo" />
          <p>©copyright</p>
      </div>
  )
}

const Nav = () => {
  return (
    <div className='flex shrink-0 gap-20'>
        <div className='flex flex-col gap-2'>
            <h3 className='mb-2 uppercase'>About</h3>
            <p>Home</p>
            <p>Projects</p>
            <p>Our Mission</p>
            <p>Contact Us</p>
        </div>

        <div className='flex flex-col gap-2'>
            <h3 className='mb-2 uppercase'>Education</h3>
            <p>News</p>
            <p>Learn</p>
            <p>Certification</p>
            <p>Publications</p>
        </div>
    </div>
  )
}

export default Footer;