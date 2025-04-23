import React from "react";
import "../styles/Home.css";
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

//TODO:Corregir error importando dynamic
// const Scene = dynamic(() => import('./Scene'), {
//     ssr: false,
// })

export default function Home() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-30vh", "150vh"])
    
  const container1 = useRef();
  
  const { scrollYProgress: scrollYProgress1 } = useScroll({
      target: container1,
      offset: ["start end", 'end start']
  })

  const y1 = useTransform(scrollYProgress1, [0, 1], ["0%", "10%"]);

  return (
    <div className='home columns-1 ...' style={{backgroundColor: "#8c2f39"}}>
      <div className='home relative w-full h-screen overflow-hidden'>
        <video className='absolute top-0 left-0 w-full h-full object-cover' autoPlay loop muted >
          <source src="assets/videos/sinuoFirstCommercial.mp4" type="video/mp4" />
          Sinuo - The Art of Perfume Crafting
        </video>
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-40'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white'>
          <img src='/assets/images/LogoDefBigWhite.svg' alt='Logo sinuo' className="w-1/4 h-1/2" />
          <h1 className='text-3xl mb-6'>Flowing with emotion</h1>
          <button className='px-6 py-3 text-white rounded-lg hover:bg-gray-300 transition uppercase'>
            Discover now
          </button>
        </div>
      </div>
      <div className='h-screen overflow-hidden'>
        <motion.div style={{y}} className='relative h-full'>
        <img src='/assets/images/frascosinuo.jpg' alt='first main cologne' className='w-full h-full object-cover object-center'/>
        </motion.div>
      </div>
      <div className='flex justify-center my-40'>
        <p className='text-[5vw] sm:text-[4vw] md:text-[3vw] uppercase text-center max-w-[50vw] leading-none text-white'>"Born between two worlds, Sinuo is the breath between roots and future — fluid, undefined, unapologetically whole."</p>
      </div>
      <div
        ref={container1} 
        className='relative flex items-center justify-center h-screen overflow-hidden'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
      >
        <div className='relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between'>
          <p className='text-[4vw] sm:text-[3vw] md:text-[2vw] w-full md:w-[50vw] self-end uppercase mix-blend-difference'>
            A memory in motion — a whisper from the past, and a gesture toward what's yet to come.
          </p>
          <p className='text-[7vw] sm:text-[6vw] md:text-[5vw] uppercase mix-blend-difference'>
            This is not rebellion,<br />nor conformity — it's presence.
          </p>
        </div>
        <div className='fixed top-0 left-0 w-full h-screen z-0 overflow-hidden'>
          <motion.div style={{ y: y1 }} className='w-full h-screen'>
            <img
              src='/assets/images/4.jpg'
              alt='main collection'
              className='w-full h-full object-cover object-center'
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};