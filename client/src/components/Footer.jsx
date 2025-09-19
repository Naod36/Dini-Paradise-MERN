import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ImageWithFallback from "./figma/ImageWithFallback";

// Footer background images
const footerBackgrounds = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwZGluaW5nfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
];

// Floating particles for footer
const FooterParticle = ({ delay = 0, size = "small" }) => {
  const sizes = {
    small: "w-1 h-1",
    medium: "w-2 h-2",
    large: "w-3 h-3",
  };

  return (
    <motion.div
      className={`absolute ${sizes[size]} bg-amber-400/20 rounded-full`}
      initial={{
        opacity: 0,
        scale: 0,
        x:
          Math.random() *
          (typeof window !== "undefined" ? window.innerWidth : 1200),
        y: Math.random() * 200 + 100,
      }}
      animate={{
        opacity: [0, 0.4, 0],
        scale: [0, 1, 0],
        y: [0, -150],
        x: [0, Math.random() * 80 - 40],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

// Floating food icons for footer
const FooterFloatingIcon = ({
  icon,
  delay = 0,
  x = 0,
  y = 0,
  size = "medium",
}) => {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <motion.div
      className={`absolute text-amber-400/15 ${sizes[size]}`}
      initial={{
        opacity: 0,
        scale: 0,
        x: x,
        y: y,
      }}
      animate={{
        opacity: [0, 0.2, 0],
        scale: [0, 1, 0],
        rotate: [0, 180],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 10,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {icon}
    </motion.div>
  );
};

function Footer() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.4, 0.3, 0.2]);

  // Background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % footerBackgrounds.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={backgroundIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <ImageWithFallback
                src={footerBackgrounds[backgroundIndex]}
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <FooterParticle
            key={`footer-particle-${i}`}
            delay={i * 1}
            size={i % 2 === 0 ? "small" : "medium"}
          />
        ))}

        {/* Floating Food Icons */}
        <FooterFloatingIcon
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          }
          delay={0}
          x={200}
          y={150}
          size="large"
        />
        <FooterFloatingIcon
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          }
          delay={3}
          x={800}
          y={100}
          size="medium"
        />
        <FooterFloatingIcon
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          }
          delay={6}
          x={600}
          y={200}
          size="large"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DP</span>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-amber-400 mb-1">
                  Dini Paradise
                </h4>
                <p className="text-amber-300/70 text-sm">A Culinary Journey</p>
              </div>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 leading-relaxed"
            >
              Creating memorable dining experiences with exceptional food and
              service. Where every dish tells a story and every moment becomes a
              memory.
            </motion.p>

            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="flex space-x-4 mt-6">
              {[
                {
                  icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                  name: "Twitter",
                },
                {
                  icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
                  name: "Facebook",
                },
                {
                  icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z",
                  name: "Instagram",
                },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-amber-500/20 hover:bg-amber-500/30 rounded-full flex items-center justify-center border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h5 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Menu", href: "/menu" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    <motion.span className="w-0 h-0.5 bg-amber-400 mr-0 group-hover:mr-2 group-hover:w-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h5 className="text-lg font-semibold mb-6 text-white">
              Contact Info
            </h5>
            <ul className="space-y-3 text-gray-300">
              {[
                {
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                  text: "123 Restaurant Street",
                },
                {
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  text: "(555) 123-4567",
                },
                {
                  icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  text: "info@diniparadise.com",
                },
              ].map((contact, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-5 h-5 text-amber-400 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={contact.icon}
                      />
                    </svg>
                  </div>
                  <span>{contact.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div variants={itemVariants}>
            <h5 className="text-lg font-semibold mb-6 text-white">Hours</h5>
            <ul className="space-y-3 text-gray-300">
              {[
                "Mon-Thu: 11:00 AM - 10:00 PM",
                "Fri-Sat: 11:00 AM - 11:00 PM",
                "Sunday: 12:00 PM - 9:00 PM",
              ].map((hour, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                  <span>{hour}</span>
                </motion.li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <motion.div variants={itemVariants} className="mt-6">
              <h6 className="text-sm font-semibold text-white mb-3">
                Stay Updated
              </h6>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-r-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-white/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm"
              whileHover={{ scale: 1.02 }}
            >
              &copy; 2024 Dini Paradise. All rights reserved.
            </motion.p>
            <motion.div
              className="flex space-x-6 mt-4 md:mt-0"
              variants={containerVariants}
            >
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link, index) => (
                  <motion.a
                    key={link}
                    href="#"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link}
                  </motion.a>
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
