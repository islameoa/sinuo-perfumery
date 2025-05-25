import React from "react";
import "../styles/Products.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import DistortedGlass from "./PerfumeBottle/DistortedGlass";

const Products = () => {    
    return (
        <section>
            <div className="flex flex-col md:flex-row h-screen">
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
                    <DistortedGlass />
                </div>
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-20 product-item bg-[#8c2f39]">
                    <div className="text-center md:text-left text-white max-w-md">
                        <h2 className="mb-10 text-4xl md:text-5xl uppercase">Rouge Chaotic</h2>
                        <p className="text-lg md:text-xl mb-6 mt-10">
                            A fragrance that transcends time — crafted with notes of memory, movement, and mystery.
                        </p>
                        <button className="mt-6 px-6 py-3 border border-black text-black uppercase hover:bg-gray-50 transition">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;