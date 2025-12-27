import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage1 from "../../assets/heroImage1.jpg";
import heroImage2 from "../../assets/heroImage2.jpg";
import heroImage3 from "../../assets/heroImage3.jpg";
import heroImage4 from "../../assets/heroImage4.jpg";
import heroImage5 from "../../assets/heroImage5.jpg";


const slides = [
  {
    image: heroImage1,
    title: "Holiday Tech Deals",
    highlight: "Smarter Shopping 🎄",
    description:
      "Exclusive Christmas offers on mobiles, laptops and accessories.",
  },
  {
    image: heroImage2,
    title: "Unwrap Big Savings",
    highlight: "This Season 🎁",
    description: "Premium gadgets, unbeatable prices — only for the holidays.",
  },
  {
    image: heroImage3,
    title: "Everything You Want",
    highlight: "Holiday Shopping Made Easy 🎁",
    description:
      "Laptops, accessories, gadgets — grab all your Christmas essentials here!",
  },
  {
    image: heroImage4,
    title: "Headphones for Holiday Tunes",
    highlight: "Crystal Clear Sound 🎧",
    description:
      "Enjoy your favorite music this Christmas with exclusive headphone deals.",
  },
  {
    image: heroImage5,
    title: "Smartwatches for Every Wrist",
    highlight: "Track & Celebrate ⌚",
    description:
      "Stay connected and stylish this holiday season with our exclusive smartwatch deals.",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative mt-22 mb-20 h-140 md:h-150 rounded-2xl overflow-hidden ">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/35 to-black/20" />

      {/* Christmas Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/80 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-16 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1}}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {slide.title} <br />
              <span className="text-yellow-300">{slide.highlight}</span>
            </h1>

            <p className="text-lg text-white/90 mb-8">
              {slide.description}
            </p>

            <button className="cursor-pointer bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition">
              Shop Christmas Deals
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
