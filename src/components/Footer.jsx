import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div 
      className="relative h-[800px]" 
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className='relative h-[calc(100vh+800px)] -top-[100vh]'>
        <div className='h-[800px] sticky top-[calc(100vh-800px)]'>
          <div className='bg-sky-50 py-8 px-12 h-full w-full flex flex-col justify-between'>
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
      <div className='flex justify-between items-end text-sky-700'>
          <h1 className='text-[14vw] leading-[0.8] mt-10 '>sinuo</h1>
          <p>©copyright</p>
      </div>
  )
}

const Nav = () => {
  return (
    <div className='flex shrink-0 gap-20'>
        <div className='flex flex-col gap-2 text-sky-700'>
            <h3 className='mb-2 uppercase text-sky-800'>About</h3>
            <p>Home</p>
            <p>Projects</p>
            <p>Our Mission</p>
            <p>Contact Us</p>
        </div>

        <div className='flex flex-col gap-2 text-sky-700'>
            <h3 className='mb-2 uppercase text-sky-800'>Education</h3>
            <p>News</p>
            <p>Learn</p>
            <p>Certification</p>
            <p>Publications</p>
        </div>
    </div>
  )
}

export default Footer;