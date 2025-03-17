import React from "react";
import "../styles/Home.css";
import DistortedGlass from "./PerfumeBottle/DistortedGlass";

//TODO:Corregir error importando dynamic
// const Scene = dynamic(() => import('./Scene'), {
//     ssr: false,
// })

const Home = () => {
  return (
    <div className='columns-1 ...'>
      <div className='home text-center h-screen'>
        <div>
          <video width='100%' height='100%' autoPlay loop muted>
            <source src="assets/videos/Sinuo - The Art of Perfume Crafting.mp4" type="video/mp4"/>
            Sinuo - The Art of Perfume Crafting
          </video>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-40'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white'>
          <img src='/assets/images/LogoDefBigWhite.svg' alt='Logo sinuo' className="w-1/2 h-min"/>
          <h1 className='text-3xl mt-16 font-bold'>The Art of Perfume Crafting</h1>
          <button className='mt-4 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition'>
            Discover now
          </button>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center">
        <DistortedGlass />
      </div>
    </div>
  );
};

export default Home;