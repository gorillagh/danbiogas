import React, { useEffect, useRef } from "react";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { setupScrollAnimations } from "../utils/animations";
import { COMPANY_DATA } from "../constants/placeholder";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    // Use animation util for our specific elements
    const observer = setupScrollAnimations();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-50 relative overflow-hidden">
      {/* Background decoration */}

      <div className="container mx-auto px-6 py-8" ref={footerRef}>
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center ">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start">
                <div className="transparent p-2 rounded-full">
                  <img src={COMPANY_DATA.logo} alt="logo" />
                </div>
                <span className="ml-2 text-xl font-bold">
                  {COMPANY_DATA.name}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <a
                href={COMPANY_DATA.socials.instagram}
                target="_blank"
                className="text-neutral-400 hover:text-secondary-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={COMPANY_DATA.socials.facebook}
                target="_blank"
                className="text-neutral-400 hover:text-secondary-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={COMPANY_DATA.socials.tiktok}
                target="_blank"
                className="text-neutral-400 hover:text-secondary-500 transition-colors duration-300"
                aria-label="TikTok"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href={COMPANY_DATA.socials.whatsapp}
                target="_blank"
                className="text-neutral-400 hover:text-secondary-500 transition-colors duration-300"
                aria-label="TikTok"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-neutral-400">
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-secondary-500">
                  <a href="/">DanBiogas</a>
                </span>{" "}
                Enterprise. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
