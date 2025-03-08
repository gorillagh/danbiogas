import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChevronDown,
  FaWhatsapp,
} from "react-icons/fa";
import { setupScrollAnimations } from "../../../utils/animations";
import { COMPANY_DATA } from "../../../constants/placeholder";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageType: "",
    message: "",
  });

  const [isMessageTypeOpen, setIsMessageTypeOpen] = useState(false);

  // Message type options
  const messageTypes = [
    "General Inquiry",
    "Technical Support",
    "Partnership Opportunity",
    "Financial Support",
    "Media Inquiry",
  ];

  // Refs for animations
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Use animation util for our specific elements
    const observer = setupScrollAnimations();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectMessageType = (type) => {
    setFormData((prev) => ({ ...prev, messageType: type }));
    setIsMessageTypeOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert(
      `Thank you for your ${
        formData.messageType || "message"
      }! We will get back to you soon.`
    );
    setFormData({ name: "", email: "", messageType: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-24 bg-neutral-900 text-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-neutral-900 opacity-80"></div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-700 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary-500 opacity-10 blur-3xl"></div>

      {/* Topography pattern overlay for texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('/patterns/topography.svg')]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal" ref={sectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-secondary-500 mx-auto mb-6"></div>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Have questions or want to support our mission? We'd love to hear
              from you.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Form Section - 3 columns wide */}
          <motion.div
            className="lg:col-span-3 order-2 lg:order-1 reveal"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            ref={formRef}
          >
            <div className="backdrop-blur-md bg-neutral-800/30 rounded-3xl overflow-hidden border border-neutral-700/50 shadow-xl">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <span className="bg-secondary-500/20 text-secondary-400 w-10 h-10 rounded-xl flex items-center justify-center mr-3">
                    <FaEnvelope />
                  </span>
                  Send Us a Message
                </h3>

                <form
                  action="https://formspree.io/f/meoajpwe"
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-neutral-300 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 text-white transition-all duration-300"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-neutral-300 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 text-white transition-all duration-300"
                        placeholder="Your Email"
                      />
                    </div>
                  </div>

                  {/* Message Type Dropdown */}
                  <div className="relative">
                    <label
                      htmlFor="messageType"
                      className="block text-sm font-semibold text-neutral-300 mb-2"
                    >
                      Message Type
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-left focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 transition-all duration-300 flex justify-between items-center"
                        onClick={() => setIsMessageTypeOpen(!isMessageTypeOpen)}
                      >
                        <span
                          className={
                            formData.messageType
                              ? "text-white"
                              : "text-neutral-500"
                          }
                        >
                          {formData.messageType || "Select Message Type"}
                        </span>
                        <FaChevronDown
                          className={`transition-transform duration-300 ${
                            isMessageTypeOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      {isMessageTypeOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-xl shadow-lg py-1 max-h-60 overflow-auto">
                          {messageTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              className="w-full px-4 py-2 text-left hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors duration-200"
                              onClick={() => selectMessageType(type)}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-neutral-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 text-white transition-all duration-300"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group relative overflow-hidden w-full bg-secondary-500 text-white font-medium uppercase rounded-full px-6 py-4 hover:bg-secondary-600 transition-all duration-300 shadow-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Section - 2 columns wide */}
          <motion.div
            className="lg:col-span-2 order-1 lg:order-2 reveal"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            ref={infoRef}
          >
            <div className="space-y-6 h-full">
              {/* Contact Info Card */}
              <div className="backdrop-blur-md bg-primary-900/30 rounded-3xl p-6 border border-primary-800/50 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary-800/50 rounded-lg p-2 mr-3 border border-primary-700/50">
                      <FaMapMarkerAlt className="text-primary-300 text-lg" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-primary-300 mb-1">
                        Location
                      </h4>
                      <p className="text-neutral-300 text-sm">
                        {COMPANY_DATA.addresses[0].name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-800/50 rounded-lg p-2 mr-3 border border-primary-700/50">
                      <FaEnvelope className="text-primary-300 text-lg" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-primary-300 mb-1">
                        Email
                      </h4>
                      <p className="text-neutral-300 text-sm">
                        {COMPANY_DATA.emails[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="backdrop-blur-md bg-primary-900/30 rounded-3xl p-6 border border-primary-800/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
                  <span className="bg-primary-800/50 text-primary-300 w-8 h-8 rounded-lg flex items-center justify-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </span>
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={COMPANY_DATA.socials.instagram}
                    target="_blank"
                    className="bg-primary-800/30 hover:bg-primary-700/50 p-3 rounded-xl text-primary-300 transition-colors duration-300 border border-primary-700/30 hover:border-primary-600/50"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href={COMPANY_DATA.socials.facebook}
                    target="_blank"
                    className="bg-primary-800/30 hover:bg-primary-700/50 p-3 rounded-xl text-primary-300 transition-colors duration-300 border border-primary-700/30 hover:border-primary-600/50"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href={COMPANY_DATA.socials.tiktok}
                    target="_blank"
                    className="bg-primary-800/30 hover:bg-primary-700/50 p-3 rounded-xl text-primary-300 transition-colors duration-300 border border-primary-700/30 hover:border-primary-600/50"
                  >
                    <FaTiktok size={24} />
                  </a>
                  <a
                    href={COMPANY_DATA.socials.whatsapp}
                    target="_blank"
                    className="bg-primary-800/30 hover:bg-primary-700/50 p-3 rounded-xl text-primary-300 transition-colors duration-300 border border-primary-700/30 hover:border-primary-600/50"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                </div>
              </div>

              {/* Support Mission Card */}
              <div className="backdrop-blur-md bg-gradient-to-br from-primary-900/30 to-secondary-900/20 rounded-3xl p-6 border border-primary-800/50 shadow-xl">
                <span className="px-3 py-1 bg-secondary-500/20 text-secondary-300 text-xs font-medium rounded-full border border-secondary-500/30 inline-block mb-3">
                  SUPPORT US
                </span>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Join Our Mission
                </h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Your contribution helps bring sustainable energy solutions to
                  communities in need.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-secondary-400 hover:text-secondary-300 transition-colors duration-300 font-medium"
                >
                  Donation options
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
