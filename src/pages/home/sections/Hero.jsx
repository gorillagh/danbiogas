import React, { useEffect, useRef, useState } from "react";
import { setupParallaxEffect } from "../../../utils/animations";
import { motion } from "framer-motion";

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Set up parallax effect for floating elements
    const cleanupParallax = setupParallaxEffect(".parallax-float", 0.05);

    return () => {
      cleanupParallax();
    };
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-fixed"
    >
      {/* Video Background with Overlay */}
      <div className="absolute inset-0">
        {/* Animated gradient as fallback until video loads */}
        <div
          className={`absolute inset-0 animated-gradient transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoaded}
        >
          <source src="/videos/biogas-production.mp4" type="video/mp4" />
          {/* You'll need to add this video to your public/videos folder */}
        </video>

        {/* Multi-layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 to-primary-800/50"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            {/* Glassy card for text content */}
            <div className="backdrop-blur-lg bg-primary-900/20 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <motion.h1
                ref={headingRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-50 leading-tight mb-6"
              >
                Transforming Waste into{" "}
                <span className="text-secondary-400 shimmer-effect block mt-2">
                  Sustainable Energy
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#about"
                  className="btn-primary group"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("about")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="relative z-10">Discover Our Solution</span>
                  <span className="absolute inset-0 z-0 bg-secondary-500 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </a>
                <a
                  href="#contact"
                  className="bg-transparent text-neutral-50 border-2 border-neutral-50 px-8 py-3 rounded-full uppercase text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-neutral-50/10 hover:shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-neutral-50 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-neutral-900/30">
            <div className="w-1 h-2 bg-neutral-50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
