import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { setupParallaxEffect } from "../../../utils/animations";

const CTA = () => {
  // Refs for animations
  const sectionRef = useRef(null);

  useEffect(() => {
    // Set up parallax effect for floating elements
    const cleanupParallax = setupParallaxEffect(".parallax-float", 0.03);

    return () => {
      cleanupParallax();
    };
  }, []);

  // Support options with more visual focus and less text
  const supportOptions = [
    {
      emoji: "💰",
      title: "Financial Support",
      brief: "Fund equipment and operations",
      link: "Contribute",
    },
    {
      emoji: "🔧",
      title: "Technical Expertise",
      brief: "Share knowledge and skills",
      link: "Join as Expert",
    },
    {
      emoji: "🌍",
      title: "Network Access",
      brief: "Expand our community reach",
      link: "Partner with Us",
    },
  ];

  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900 to-neutral-900"></div>

      {/* Animated background elements - reduced number for simplicity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="parallax-float absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="parallax-float absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
            ref={sectionRef}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join Us in Transforming Waste into Energy
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto mb-6"></div>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Support our mission to bring sustainable energy solutions to
              communities.
            </p>

            {/* Primary CTA button - single, focused call to action */}
            <a
              href="#contact"
              className="inline-block bg-secondary-500 text-white font-medium rounded-full px-10 py-4 hover:bg-secondary-600 transition-colors duration-300 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Support the Project
            </a>
          </motion.div>

          {/* Visual support options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="backdrop-blur-md bg-neutral-800/30 border border-neutral-700 rounded-3xl overflow-hidden shadow-xl"
              >
                {/* Top visual section */}
                <div className="bg-gradient-to-br from-primary-800 to-primary-900 p-6 text-center">
                  <span className="text-5xl">{option.emoji}</span>
                </div>

                {/* Text content - minimal */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4">
                    {option.brief}
                  </p>

                  <a
                    href="#contact"
                    className="inline-flex items-center text-secondary-400 hover:text-secondary-300 transition-colors duration-300 text-sm font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {option.link}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom message - simple, focused */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <a
              href="#about"
              className="text-neutral-300 hover:text-white transition-colors duration-300 underline text-sm"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn more about our technology
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
