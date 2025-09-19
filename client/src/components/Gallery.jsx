import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ImageWithFallback from "./figma/ImageWithFallback";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmclMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Signature Pasta",
    description: "Handmade pasta with truffle cream sauce",
    category: "Main Course",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Pan-Seared Salmon",
    description: "Fresh Atlantic salmon with herb butter",
    category: "Seafood",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Wagyu Beef Steak",
    description: "Premium Wagyu with roasted vegetables",
    category: "Premium",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1563379091339-03246963d96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Lobster Thermidor",
    description: "Classic French preparation with cognac cream",
    category: "Seafood",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Chocolate Soufflé",
    description: "Warm chocolate soufflé with vanilla ice cream",
    category: "Dessert",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1563379091339-03246963d96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Truffle Risotto",
    description: "Creamy risotto with black truffle shavings",
    category: "Main Course",
  },
];

// Restaurant interior background images
const backgroundImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwZGluaW5nfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
];

// Enhanced Particle component
const Particle = ({ delay = 0, size = "small" }) => {
  const sizes = {
    small: "w-1 h-1",
    medium: "w-2 h-2",
    large: "w-3 h-3",
  };

  return (
    <motion.div
      className={`absolute ${sizes[size]} bg-amber-400/30 rounded-full`}
      initial={{
        opacity: 0,
        scale: 0,
        x:
          Math.random() *
          (typeof window !== "undefined" ? window.innerWidth : 1200),
        y:
          Math.random() *
            (typeof window !== "undefined" ? window.innerHeight : 800) +
          200,
      }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
        y: [0, -200],
        x: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 6,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

// Floating Food Icon
const FloatingIcon = ({ icon, delay = 0, x = 0, y = 0, size = "medium" }) => {
  const sizes = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <motion.div
      className={`absolute text-amber-400/20 ${sizes[size]}`}
      initial={{
        opacity: 0,
        scale: 0,
        x: x,
        y: y,
      }}
      animate={{
        opacity: [0, 0.3, 0],
        scale: [0, 1, 0],
        rotate: [0, 360],
        y: [0, -50, 0],
      }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {icon}
    </motion.div>
  );
};

// Floating Orbs Component
const FloatingOrb = ({ delay = 0, size = "medium", x = 0, y = 0 }) => {
  const sizes = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  return (
    <motion.div
      className={`absolute ${sizes[size]} rounded-full bg-gradient-to-r from-amber-400/5 to-orange-500/5 blur-sm`}
      initial={{
        opacity: 0,
        scale: 0,
        x: x,
        y: y,
      }}
      animate={{
        opacity: [0, 0.4, 0],
        scale: [0, 1, 0],
        y: [0, -100, 0],
        x: [0, Math.sin(delay) * 50, 0],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.2, 0.1]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Restaurant Interior Background with Parallax */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={backgroundIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <ImageWithFallback
                src={backgroundImages[backgroundIndex]}
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* Subtle Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <Particle
            key={`particle-${i}`}
            delay={i * 0.5}
            size={i % 3 === 0 ? "medium" : "small"}
          />
        ))}

        {/* Floating Orbs */}
        {[...Array(4)].map((_, i) => (
          <FloatingOrb
            key={`orb-${i}`}
            delay={i * 2}
            size={i % 2 === 0 ? "medium" : "small"}
            x={150 + i * 300}
            y={250 + i * 150}
          />
        ))}

        {/* Floating Food Icons */}
        <FloatingIcon
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
          x={100}
          y={300}
          size="large"
        />
        <FloatingIcon
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          }
          delay={4}
          x={800}
          y={150}
          size="medium"
        />
        <FloatingIcon
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          }
          delay={8}
          x={600}
          y={500}
          size="large"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-amber-500/20 text-amber-400 text-sm font-semibold rounded-full mb-4 border border-amber-500/30 backdrop-blur-sm"
          >
            Our Signature Dishes
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Culinary
            <span className="text-amber-400"> Masterpieces</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover our most celebrated dishes, each crafted with passion and
            presented as a work of art.
          </motion.p>
        </motion.div>

        {/* Main Carousel with Enhanced Effects */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={galleryImages[currentIndex].url}
                  alt={galleryImages[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="inline-block px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full mb-3 shadow-lg">
                      {galleryImages[currentIndex].category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      {galleryImages[currentIndex].title}
                    </h3>
                    <p className="text-lg text-white/90 max-w-2xl">
                      {galleryImages[currentIndex].description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation Arrows */}
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all duration-300 rounded-full p-3 group border border-white/30 hover:border-amber-500/50 shadow-lg"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-amber-400 group-hover:scale-110 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all duration-300 rounded-full p-3 group border border-white/30 hover:border-amber-500/50 shadow-lg"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-amber-400 group-hover:scale-110 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Enhanced Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-amber-500 scale-125 shadow-lg"
                      : "bg-white/50 hover:bg-white/70 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Thumbnail Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative h-24 md:h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                index === currentIndex
                  ? "ring-4 ring-amber-500 shadow-2xl border-amber-500/70"
                  : "hover:shadow-xl border-white/20 hover:border-amber-500/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              <ImageWithFallback
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2"
                  >
                    <div className="text-white">
                      <h4 className="text-xs font-semibold truncate">
                        {image.title}
                      </h4>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {index === currentIndex && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-3 h-3 bg-amber-500 rounded-full shadow-lg"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl border border-amber-500/30"
          >
            View Full Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Gallery;
