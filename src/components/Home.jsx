import React, { useEffect } from "react";
import { gsap } from "gsap";
import Lenis from 'lenis';
import "../styles/Home.css";
import PerfumeBottle from './PerfumeBottle';
// const PerfumeBottle = dynamic(() => import('./PerfumeBottle'), {
//   //loading: () => <p>Loading...</p>,
//   ssr: false
// })

const Home = () => {
  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  useEffect( () => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div className='columns-1 ...'>
      <div className='home text-center leading-none'>
        <div className="hero">
          <img src="/assets/images/hero.jpg" alt="Hero"/>
          <div className="hero-overlay">
            <h1 className="hero-text">Discover the Essence of Elegance</h1>
          </div>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center">
        <PerfumeBottle />
      </div>
    </div>
  );
};

export default Home;