import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navRef = useRef(null);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active link based on scroll position
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        isDrawerOpen
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNavLinkClick = (id) => {
    setActiveLink(id);
    closeDrawer();

    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "solution", label: "Solution" },
    { id: "contact", label: "Contact" },
  ];

  // Drawer animation variants
  const drawerVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  // Overlay animation
  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Nav item animation
  const navItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 backdrop-blur-md bg-neutral-900/80 shadow-3xl"
          : "py-4 backdrop-blur-sm bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-neutral-50/10 backdrop-blur-md flex items-center justify-center">
                <img src="/logo.png" alt="logo" className="h-7 w-7" />
              </div>
              <span className="ml-2 text-xl font-bold text-neutral-50">
                DanBiogas
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="backdrop-blur-sm bg-neutral-800/30 border border-neutral-700/50 rounded-full p-1">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.id);
                    }}
                    className={`px-4 py-2 font-medium text-sm rounded-full transition-all duration-300 relative
                      ${
                        activeLink === link.id
                          ? "bg-primary-600/80 text-neutral-50"
                          : "text-neutral-50/80 hover:text-neutral-50 hover:bg-neutral-700/30"
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  className="ml-1 bg-secondary-500 hover:bg-secondary-600 text-neutral-50 font-medium rounded-full px-5 py-2 transition-colors duration-300 text-sm shadow-lg"
                  onClick={() => handleNavLinkClick("contact")}
                >
                  Support Us
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDrawer}
              className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-full p-3 text-neutral-50 transition-colors duration-300 hover:bg-neutral-700/50"
              aria-label="Toggle menu"
            >
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop/Overlay */}
            <motion.div
              key="drawer-backdrop"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm z-40 md:hidden"
              onClick={closeDrawer}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed top-0 right-0 h-full w-80 bg-neutral-900/90 backdrop-blur-xl shadow-2xl z-50 md:hidden  border-l border-neutral-700/30"
            >
              <div className="p-6 bg-neutral-900">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                      <img src="/logo.png" alt="logo" className="h-6 w-6" />
                    </div>
                    <span className="ml-2 text-xl font-bold text-neutral-50">
                      DanBiogas
                    </span>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="bg-neutral-800/50 rounded-full p-2 text-neutral-400 hover:text-neutral-50 transition-colors duration-300"
                    aria-label="Close menu"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <div className="space-y-3">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.id}
                      custom={i}
                      initial="closed"
                      animate="open"
                      variants={navItemVariants}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavLinkClick(link.id);
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300
                          ${
                            activeLink === link.id
                              ? "bg-primary-600/20 border border-primary-600/30 text-primary-400"
                              : "text-neutral-400 hover:text-neutral-200 bg-neutral-800/30 border border-neutral-700/30 hover:bg-neutral-800/50"
                          }`}
                      >
                        <span className="font-medium">{link.label}</span>
                        {activeLink === link.id ? (
                          <span className="w-2 h-2 rounded-full bg-primary-400"></span>
                        ) : (
                          <FaChevronRight
                            size={12}
                            className="text-neutral-500"
                          />
                        )}
                      </a>
                    </motion.div>
                  ))}

                  <motion.div
                    custom={navLinks.length}
                    initial="closed"
                    animate="open"
                    variants={navItemVariants}
                    className="pt-4 mt-6 border-t border-neutral-700/50"
                  >
                    <button
                      onClick={() => handleNavLinkClick("contact")}
                      className="w-full bg-secondary-500 hover:bg-secondary-600 text-neutral-50 font-medium rounded-xl px-6 py-3 transition-colors duration-300 shadow-lg"
                    >
                      Support Us
                    </button>
                  </motion.div>
                </div>

                <div className="mt-12 pt-6 border-t border-neutral-700/50">
                  <p className="text-sm text-neutral-400">Connect with us</p>
                  <div className="flex space-x-4 mt-3">
                    <a
                      href="#"
                      className="bg-neutral-800/50 p-2 rounded-full text-neutral-400 hover:text-primary-400 transition-colors duration-300 border border-neutral-700/50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-neutral-800/50 p-2 rounded-full text-neutral-400 hover:text-primary-400 transition-colors duration-300 border border-neutral-700/50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-neutral-800/50 p-2 rounded-full text-neutral-400 hover:text-primary-400 transition-colors duration-300 border border-neutral-700/50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
