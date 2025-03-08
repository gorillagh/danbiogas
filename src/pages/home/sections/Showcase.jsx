import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animateCounter } from "../../../utils/animations";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import collection from "../../../assets/images/digester.jpg";

const Showcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState([
    {
      value: 0,
      target: 5,
      unit: "tons",
      label: "Waste Processed Daily",
      icon: "♻️",
    },
    {
      value: 0,
      target: 25,
      unit: "kWh",
      label: "Energy Generated Daily",
      icon: "⚡",
    },
    {
      value: 0,
      target: 2.5,
      unit: "tons",
      label: "CO₂ Reduced Daily",
      icon: "🌿",
    },
  ]);

  // Refs for animations
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Set up counters for stats when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statsContainerElement = entry.target;
            const counterElements =
              statsContainerElement.querySelectorAll(".stat-counter");

            counterElements.forEach((element, index) => {
              const targetValue = stats[index].target;
              animateCounter(element, targetValue);
            });

            observer.unobserve(statsContainerElement);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [stats]);

  // Journey steps
  const steps = [
    {
      title: "Collection",
      content:
        "We gather organic waste that would otherwise pollute landfills.",
      image: collection,
    },
    {
      title: "Digestion",
      content:
        "Our digester transforms waste into biogas through anaerobic digestion.",
      image: collection,
    },
    {
      title: "Utilization",
      content:
        "The biogas provides clean energy for cooking, heating, and electricity.",
      image: collection,
    },
  ];

  // Design & Impact
  const designSpecs = [
    "5 cubic meters capacity",
    "Temperature-controlled chamber",
    "Pressure regulation system",
    "Dual-phase filtration",
    "Modular, scalable design",
  ];

  const impacts = [
    "Reduced methane emissions",
    "Fossil fuel replacement",
    "Nutrient-rich fertilizer byproduct",
    "Water conservation",
  ];

  // State for journey steps
  const [activeStep, setActiveStep] = useState(0);

  // Navigate through steps
  const nextStep = () => {
    setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  return (
    <section
      id="solution"
      className="py-24 bg-neutral-900 text-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" ref={sectionRef}>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
              Our Impact
              <span className="absolute left-0 -bottom-2 w-1/3 h-1 bg-secondary-500 rounded-full"></span>
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              From waste to energy: the biogas journey.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className="stats-container grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 reveal"
          ref={statsRef}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-neutral-800/40 border border-neutral-700 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-secondary-400">
                  <span className="stat-counter">{0}</span>
                  <span className="text-xl ml-1">{stat.unit}</span>
                </h3>
              </div>
              <p className="text-neutral-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto mb-8" ref={tabsRef}>
          <div className="reveal flex justify-center">
            <div className="backdrop-blur-md bg-neutral-800/30 border border-neutral-700 rounded-full p-1">
              <div className="flex">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`px-6 py-3 font-medium text-sm rounded-full transition-all duration-300
                    ${
                      activeTab === 0
                        ? "bg-secondary-500 text-white"
                        : "text-neutral-300 hover:text-white"
                    }`}
                >
                  Journey
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`px-6 py-3 font-medium text-sm rounded-full transition-all duration-300
                    ${
                      activeTab === 1
                        ? "bg-secondary-500 text-white"
                        : "text-neutral-300 hover:text-white"
                    }`}
                >
                  Design
                </button>
                <button
                  onClick={() => setActiveTab(2)}
                  className={`px-6 py-3 font-medium text-sm rounded-full transition-all duration-300
                    ${
                      activeTab === 2
                        ? "bg-secondary-500 text-white"
                        : "text-neutral-300 hover:text-white"
                    }`}
                >
                  Impact
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="reveal max-w-4xl mx-auto" ref={contentRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 0 ? (
                /* Journey Tab */
                <div className="relative backdrop-blur-md bg-neutral-800/40 border border-neutral-700 rounded-3xl overflow-hidden shadow-xl">
                  {/* Step content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="md:flex"
                    >
                      <div className="md:w-1/2">
                        <img
                          src={steps[activeStep].image}
                          alt={steps[activeStep].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <span className="text-secondary-400 text-sm font-medium">
                          Step {activeStep + 1} of {steps.length}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                          {steps[activeStep].title}
                        </h3>
                        <p className="text-neutral-300 mb-8">
                          {steps[activeStep].content}
                        </p>

                        {/* Navigation dots */}
                        <div className="flex space-x-2 mb-6">
                          {steps.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveStep(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                activeStep === idx
                                  ? "bg-secondary-500 w-8"
                                  : "bg-neutral-600 hover:bg-neutral-500"
                              }`}
                              aria-label={`Go to step ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Large navigation arrows */}
                  <button
                    onClick={prevStep}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300"
                    aria-label="Previous step"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    onClick={nextStep}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300"
                    aria-label="Next step"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              ) : activeTab === 1 ? (
                /* Design Tab */
                <div className="backdrop-blur-md bg-neutral-800/40 border border-neutral-700 rounded-3xl overflow-hidden shadow-xl">
                  <div className="md:flex">
                    <div className="md:w-1/2 bg-gradient-to-br from-primary-800 to-primary-900 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Biogas Digester
                        </h3>
                        <div className="text-8xl">⚙️</div>
                        <p className="mt-4 text-neutral-300">
                          Engineered for efficiency and impact
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8">
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Technical Design
                      </h3>
                      <ul className="space-y-4">
                        {designSpecs.map((spec, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-secondary-500/20 text-secondary-400 flex items-center justify-center mr-4">
                              {index + 1}
                            </div>
                            <span className="text-neutral-300">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                /* Impact Tab */
                <div className="backdrop-blur-md bg-neutral-800/40 border border-neutral-700 rounded-3xl overflow-hidden shadow-xl">
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Environmental Benefits
                    </h3>
                    <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
                      Each biogas digester creates multiple positive impacts for
                      communities and ecosystems.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      {impacts.map((impact, index) => (
                        <div
                          key={index}
                          className="backdrop-blur-md bg-neutral-700/30 border border-neutral-600 rounded-xl p-4 hover:bg-neutral-700/50 transition-colors duration-300"
                        >
                          <div className="text-3xl mb-2">
                            {["🌍", "⛽", "🌱", "💧"][index]}
                          </div>
                          <p className="text-neutral-300 text-sm">{impact}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-xl p-6 mt-8 inline-block">
                      <h4 className="text-xl font-bold text-white mb-2">
                        Annual Impact
                      </h4>
                      <p className="text-neutral-300">
                        1,825 tons of waste processed • 9,125 kWh of energy •
                        912.5 tons CO₂ reduced
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
