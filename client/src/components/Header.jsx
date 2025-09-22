import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import smallLogo from "../assets/smallLogo.png";
import ShinyText from "./ShinyText";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down -> hide
        setShowHeader(false);
      } else {
        // scrolling up -> show
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/50 shadow-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                <img
                  src={smallLogo}
                  alt="Dini Paradise Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1
                  className="text-white tracking-wide font-marhey text-2xl font-semibold"
                  style={{ textShadow: "1px 1px 10px rgba(0,0,0,0.5)" }}
                >
                  Dini Paradise
                </h1>
                <ShinyText
                  text="Cafe & Resturant"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:flex items-center space-x-8"
            >
              <Link
                to="/"
                className="text-white/90 hover:text-white/50 transition-colors text-sm tracking-wide duration-300"
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-white/90 hover:text-white/50 transition-colors text-sm tracking-wide duration-300"
                style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.5)" }}
              >
                Menu
              </Link>
              <Link
                to="/about"
                className="text-white/90 hover:text-white/50 transition-colors text-sm tracking-wide duration-300"
                style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.5)" }}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white/90 hover:text-white/50 transition-colors text-sm tracking-wide duration-300"
                style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.5)" }}
              >
                Contact
              </Link>
            </motion.nav>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-black/60 backdrop-blur-md border-l border-white/20 shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">DP</span>
                      </div>
                    </div>
                    <h2 className="text-white text-lg font-light">
                      Dini Paradise
                    </h2>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="block text-white/90 hover:text-white text-lg py-3 border-b border-white/10 transition-colors"
                      >
                        Home
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        to="/menu"
                        onClick={closeMobileMenu}
                        className="block text-white/90 hover:text-white text-lg py-3 border-b border-white/10 transition-colors"
                      >
                        Menu
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        to="/about"
                        onClick={closeMobileMenu}
                        className="block text-white/90 hover:text-white text-lg py-3 border-b border-white/10 transition-colors"
                      >
                        About
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        to="/contact"
                        onClick={closeMobileMenu}
                        className="block text-white/90 hover:text-white text-lg py-3 border-b border-white/10 transition-colors"
                      >
                        Contact
                      </Link>
                    </motion.div>
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-white/20">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Reserve a Table
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
