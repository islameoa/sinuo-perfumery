import React, { useMemo, useState } from "react";
import "../styles/Products.css";
import DistortedGlass from "./PerfumeBottle/DistortedGlass";
import { useCart } from "../components/cart/CartContext";
import Gallery from "./Gallery";

const AccordionItem = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm md:text-base uppercase tracking-[0.18em] text-white/90">
          {title}
        </span>

        <span className="text-white/70 text-xl leading-none select-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-white/75 text-sm md:text-base leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const galleryItems = [
  { type: "image", src: "/assets/images/sinuo1.jpeg", span: "tall", alt: "Mood 1" },
  
  { type: "image", src: "/assets/images/afroRed.jpg", span: "wide", alt: "Mood 2" },
  
  { type: "video", src: "/assets/videos/sinuoCherries.mp4", span: "big" },
  { type: "video", src: "/assets/videos/sinuoHarmony.mp4", span: "" },
  
  { type: "image", src: "/assets/images/sinuoBottles.jpeg", span: "" },
  { type: "image", src: "/assets/images/sinuoBack.jpeg", span: "tall" }  
];


const Products = () => {
  const [open, setOpen] = useState("Description");

  const { addItem } = useCart();

  const variants = useMemo(
    () => ({
      "2ml": { label: "2ml", price: 9 },
      "100ml": { label: "100ml", price: 129 },
    }),
    []
  );

  const [selected, setSelected] = useState("100ml");

  const handleAddToCart = () => {
    const v = variants[selected];
    addItem({
      id: "sinuo-diaspora",
      name: "Sinuo Diaspora",
      variant: v.label,
      price: v.price,
      qty: 1,
    });
  };

  return (
    <section className="bg-[#4e0808]">
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
          <DistortedGlass />
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-20 product-item">
          <div className="text-center md:text-left text-white max-w-md w-full">
            <h2 className="mb-10 text-4xl md:text-5xl uppercase">Sinuo Diaspora</h2>

            <p className="text-lg md:text-xl mb-6 mt-10 text-white/85">
              A fragrance that transcends time — crafted with notes of memory, movement, and mystery.
            </p>

            <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-white/70 m-0">
                Size
                </p>

                <div className="flex items-center gap-2">
                {Object.keys(variants).map((k) => {
                    const isActive = selected === k;
                    return (
                    <button
                        key={k}
                        type="button"
                        onClick={() => setSelected(k)}
                        className={[
                        "px-4 py-3 border uppercase transition duration-300",
                        isActive
                            ? "bg-gray-50 text-black border-gray-50"
                            : "border-white/70 text-white hover:bg-white/10",
                        ].join(" ")}
                    >
                        <span className="tracking-[0.12em] text-xs md:text-sm">
                        {variants[k].label}
                        </span>
                        <span className="ml-2 text-xs md:text-sm opacity-80">
                        €{variants[k].price}
                        </span>
                    </button>
                    );
                })}
                </div>
            </div>

            {/* Add to cart full width */}
            <button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 border border-white/70 text-white uppercase transition duration-300 hover:bg-gray-50 hover:text-black"
            >
                Add to cart
            </button>
            </div>

            {/* Accordion */}
            <div className="mt-10 border border-white/15 px-5">
              <AccordionItem
                title="Description"
                isOpen={open === "Description"}
                onToggle={() => setOpen(open === "Description" ? null : "Description")}
              >
                Sinuo Diaspora is a warm, magnetic scent that lingers like a memory.
                It opens with brightness, deepens into resin and spice, and settles into a soft,
                skin-like trail—intimate, bold, and timeless.
              </AccordionItem>

              <AccordionItem
                title="Notes"
                isOpen={open === "Notes"}
                onToggle={() => setOpen(open === "Notes" ? null : "Notes")}
              >
                <div className="space-y-3">
                  <div>
                    <div className="text-white/90 uppercase tracking-[0.14em] text-xs mb-1">Top</div>
                    <div>Pink pepper • Bergamot • Saffron</div>
                  </div>
                  <div>
                    <div className="text-white/90 uppercase tracking-[0.14em] text-xs mb-1">Heart</div>
                    <div>Rose • Incense • Labdanum</div>
                  </div>
                  <div>
                    <div className="text-white/90 uppercase tracking-[0.14em] text-xs mb-1">Base</div>
                    <div>Amber • Cedarwood • Musk</div>
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem
                title="Ingredients"
                isOpen={open === "Ingredients"}
                onToggle={() => setOpen(open === "Ingredients" ? null : "Ingredients")}
              >
                Alcohol Denat. • Parfum (Fragrance) • Aqua (Water) • Limonene • Linalool • Citral •
                Coumarin • Geraniol • Citronellol • Eugenol • Farnesol.
                <div className="mt-3 text-xs text-white/55">
                  *Ingredients may vary by batch. Check the packaging for the most accurate list.
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <p
          className="
            pointer-events-none
            absolute left-6 md:top-10 md:left-10
            z-10
            text-5xl md:text-7xl
            tracking-[0.06em] uppercase
            text-white
            mix-blend-difference
            leading-none
          "
        >
          Gallery
        </p>
        <div className="">
          <Gallery items={galleryItems} />
        </div>
      </div>
    </section>
  );
};

export default Products;