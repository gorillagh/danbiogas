import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setupScrollAnimations } from "../../../utils/animations";
import innovator from "../../../assets/images/innovator.jpg";
import { FaQuoteRight, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

const AboutInnovator = () => {
  // State for story progression
  const [activeStoryPoint, setActiveStoryPoint] = useState(0);

  // Refs for animations
  const sectionRef = useRef(null);

  // Define the story points
  const storyPoints = [
    {
      title: "The Challenge",
      content:
        "As an amputee from Sankor, Ghana, Daniel faced obstacles but recognized a bigger challenge: his community's struggle with waste management and energy access.",
      icon: <IoSearchSharp />,
    },
    {
      title: "The Insight",
      content:
        "Daniel realized organic waste could generate renewable energy through biogas, addressing both environmental problems and energy needs simultaneously.",
      icon: "💡",
    },
    {
      title: "The Innovation",
      content:
        "He developed a biogas digester that converts food scraps and agricultural waste into clean energy for cooking, heating, and electricity.",
      icon: "⚙️",
    },
    {
      title: "The Vision",
      content:
        "Now Daniel aims to scale DanBiogas Enterprise across Ghana, creating sustainable communities while solving critical waste and energy challenges.",
      icon: "🌍",
    },
  ];

  useEffect(() => {
    // Animation setup
    const observer = setupScrollAnimations();

    // Auto-advance story points
    const interval = setInterval(() => {
      setActiveStoryPoint((prev) =>
        prev === storyPoints.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => {
      if (observer) observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Handle story navigation
  const goToStoryPoint = (index) => {
    setActiveStoryPoint(index);
  };

  const nextStoryPoint = () => {
    setActiveStoryPoint((prev) =>
      prev === storyPoints.length - 1 ? 0 : prev + 1
    );
  };

  const prevStoryPoint = () => {
    setActiveStoryPoint((prev) =>
      prev === 0 ? storyPoints.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-24 bg-neutral-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" ref={sectionRef}>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
              Meet the Innovator
              <span className="absolute left-0 -bottom-2 w-1/3 h-1 bg-secondary-500 rounded-full"></span>
            </h2>
          </div>
        </div>

        {/* Main content - Two column layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column - Large image and profile */}
            <div className="flex flex-col items-center">
              {/* Larger image with simple border */}
              <div className="relative mb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Daniel Apreku
                  </h3>
                  <p className="text-secondary-400 font-medium mb-4">
                    Founder, DanBiogas Enterprise
                  </p>
                </div>

                {/* Main image - larger size */}
                <div className="relative rounded-3xl overflow-hidden aspect-square w-72 md:w-96 shadow-xl border-4 border-neutral-800 z-10">
                  <img
                    src={innovator}
                    alt="Daniel Apreku"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Right column - Simplified story content */}
            <div className="flex flex-col h-full ">
              {/* Story navigation tabs aligned horizontally */}
              <div className="flex mb-6 border-b border-neutral-700">
                {storyPoints.map((point, index) => (
                  <button
                    key={index}
                    onClick={() => goToStoryPoint(index)}
                    className={`relative px-4 py-3 text-center flex-1 transition-all duration-300 ${
                      activeStoryPoint === index
                        ? "text-white border-b-2 border-secondary-500"
                        : "text-neutral-400 hover:text-neutral-300"
                    }`}
                  >
                    {/* <span className="text-2xl block mb-1">{point.icon}</span> */}
                    <span className="text-sm font-medium">{point.title}</span>
                  </button>
                ))}
              </div>

              {/* Story content with navigation */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStoryPoint}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-neutral-800 rounded-3xl p-8 shadow-lg min-h-[300px] flex flex-col"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      {storyPoints[activeStoryPoint].title}
                    </h3>
                    <p className="text-neutral-300 text-lg leading-relaxed flex-grow">
                      {storyPoints[activeStoryPoint].content}
                    </p>

                    {/* Navigation buttons */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-700">
                      <button
                        onClick={prevStoryPoint}
                        className="flex items-center text-neutral-400 hover:text-white transition-colors duration-300"
                      >
                        <FaArrowLeft className="mr-2" />
                        {/* <span>Previous</span> */}
                      </button>

                      <div className="flex space-x-2">
                        {storyPoints.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToStoryPoint(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              activeStoryPoint === index
                                ? "bg-secondary-500"
                                : "bg-neutral-600 hover:bg-neutral-500"
                            }`}
                            aria-label={`Go to story point ${index + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={nextStoryPoint}
                        className="flex items-center text-neutral-400 hover:text-white transition-colors duration-300"
                      >
                        {/* <span>Next</span> */}
                        <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Profile information */}
              <div className="text-center w-full   rounded-3xl p-6 shadow-lg">
                <div className="mt-4">
                  <p className="italic text-neutral-300">
                    "My mission is to turn waste challenges into energy
                    solutions for a cleaner, sustainable Ghana."
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center w-full bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-full py-3 px-6 transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Support Daniel's Vision
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInnovator;
