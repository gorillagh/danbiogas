import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import digester from "../../../assets/images/digester.jpg";

// Concise carousel content
const carouselContent = [
  {
    image: digester,
    title: "Waste Processing",
    description:
      "Converts organic waste into biogas through anaerobic digestion.",
  },
  {
    image: digester, // Replace with another image
    title: "Energy Production",
    description: "Powers cooking, heating, and electricity generation.",
  },
  {
    image: digester, // Replace with another image
    title: "Environmental Impact",
    description: "Reduces emissions while creating renewable energy.",
  },
];

// Simplified features
const features = [
  {
    title: "Waste Reduction",
    description: "Minimizes landfill waste and pollution.",
    icon: "♻️",
  },
  {
    title: "Renewable Energy",
    description: "Sustainable power for everyday needs.",
    icon: "⚡",
  },
  {
    title: "Circular Economy",
    description: "Transforms waste into valuable resources.",
    icon: "🌱",
  },
];

const AboutProduct = () => {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselContent.length;

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Refs for animations
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef(null);

  return (
    <section
      id="about"
      className="py-24 bg-neutral-900 text-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" ref={titleRef}>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
              Our Solution
              <span className="absolute left-0 -bottom-2 w-1/3 h-1 bg-secondary-500 rounded-full"></span>
            </h2>
            <p className="text-lg text-neutral-300">
              Converting waste into clean energy.
            </p>
          </div>
        </div>

        {/* Main content with carousel */}
        <div className="relative mb-20" ref={contentRef}>
          {/* Large navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 text-secondary-500  rounded-r-2xl shadow-xl transition-all duration-300 -ml-2 md:ml-0"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={40} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 text-secondary-500   rounded-l-2xl shadow-xl transition-all duration-300 -mr-2 md:mr-0"
            aria-label="Next slide"
          >
            <FaChevronRight size={40} />
          </button>

          {/* Content container */}
          <div className="flex flex-col md:flex-row items-center gap-8 mx-12">
            {/* Image Carousel - Left side */}
            <div className="w-full md:w-2/3 order-1">
              <div className="reveal relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 bg-neutral-800/50 relative">
                  <div className="relative aspect-video overflow-hidden">
                    {/* Images */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={carouselContent[currentSlide].image}
                          alt={carouselContent[currentSlide].title}
                          className="w-full h-full object-cover"
                        />

                        {/* Image overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent"></div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Indicator dots */}
                    <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
                      {carouselContent.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? "bg-secondary-500 scale-110 w-8"
                              : "bg-white/40 hover:bg-white/60"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content - Right side */}
            <div className="w-full md:w-1/2 order-2">
              <div className="pr-0 md:pr-8 reveal">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="bg-neutral-800/50 backdrop-blur-md p-6 rounded-3xl border border-neutral-700 shadow-xl"
                  >
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {carouselContent[currentSlide].title}
                    </h3>
                    <p className="text-neutral-300">
                      {carouselContent[currentSlide].description}
                    </p>

                    <div className="mt-4 bg-neutral-700/50 rounded-xl p-3 border border-neutral-600">
                      <p className="text-secondary-400 font-medium">
                        Daniel Apreku's biogas technology: sustainable energy
                        for communities.
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div
          className="feature-container grid grid-cols-1 md:grid-cols-3 gap-6"
          ref={featuresRef}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group p-5 hover-lift reveal backdrop-blur-md bg-neutral-800/50 rounded-3xl border border-neutral-700 shadow-lg"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-neutral-700 text-secondary-500 mb-3 transition-all duration-300 group-hover:bg-secondary-600 group-hover:text-white">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-secondary-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProduct;
