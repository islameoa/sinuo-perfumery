import React from "react";
import "../styles/Products.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import DistortedGlass from "./PerfumeBottle/DistortedGlass";

const Products = () => {
    useEffect(() => {
        gsap.fromTo(
            ".product-item",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.8, stagger: 1.2, ease: "power2.out" }
        );
    }, []);
    return (
        <section className="products">
            <h2>Our Collection</h2>
            <div className="product-gallery">
                <div className="product-item">
                    <div className="product-img">
                        <img src="/assets/images/perfume.jpg" alt="Perfume" />
                    </div>
                    <p>Luxury Fragrance 1</p>
                </div>
                <div className="product-item">
                    <div className="product-img">
                        <img src="/assets/images/perfume.jpg" alt="Perfume" />
                    </div>
                    <p>Luxury Fragrance 2</p>
                </div>
                <div className="product-item">
                    <div className="product-img">
                        <img src="/assets/images/perfume.jpg" alt="Perfume" />
                    </div>
                    <p>Luxury Fragrance 3</p>
                </div>
                <div className="product-item">
                    <div className="product-img">
                        <img src="/assets/images/perfume.jpg" alt="Perfume" />
                    </div>
                    <p>Luxury Fragrance 4</p>
                </div>
                <div className="product-item">
                    <div className="product-img">
                        <img src="/assets/images/perfume.jpg" alt="Perfume" />
                    </div>
                    <p>Luxury Fragrance 5</p>
                </div>
                {/* <div className="h-screen flex items-center justify-center">
                    <DistortedGlass />
                </div> */}
            </div>
        </section>
    );
};

export default Products;