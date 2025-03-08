import React, { useEffect } from "react";
import Hero from "./sections/Hero";
import AboutProduct from "./sections/AboutProduct";
import AboutInnovator from "./sections/AboutInnovator";
import Showcase from "./sections/Showcase";
import Contact from "./sections/Contact";
import CTA from "./sections/CTA";
import {
  setupScrollAnimations,
  setupStaggeredAnimations,
} from "../../utils/animations";

const Home = () => {
  useEffect(() => {
    // Initialize scroll animations
    const observer = setupScrollAnimations();

    // Set up staggered animations for various components
    setupStaggeredAnimations(".feature-container", ".feature-card", 100);
    setupStaggeredAnimations(".stats-container", ".stat-card", 150);
    setupStaggeredAnimations(".support-cards", ".support-card", 100);

    // Clean up observers when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="font-poppins">
      <Hero />
      <AboutProduct />
      <AboutInnovator />
      <Showcase />
      <CTA />
      <Contact />
    </div>
  );
};

export default Home;
