import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "./figma/ImageWithFallback";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1743793055911-52e19beba5d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwZGluaW5nfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Elegant restaurant interior",
  },
  {
    url: "https://images.unsplash.com/photo-1750943024048-a4c9912b1425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmclMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gourmet food plating",
  },
  {
    url: "https://images.unsplash.com/photo-1717838206417-c4fe2b9fb043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc1ODE2Njg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Chef cooking in restaurant kitchen",
  },
  {
    url: "https://images.unsplash.com/photo-1689251546710-bf15f2b81c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjByZXN0YXVyYW50JTIwdGVycmFjZSUyMG91dGRvb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzU4MjI2MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Beautiful restaurant terrace",
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [nextIndex, setNextIndex] = useState(0);
  const [clickedThumbnailIndex, setClickedThumbnailIndex] = useState(null);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isChanging) {
        const next = (currentIndex + 1) % heroImages.length;
        setNextIndex(next);
        setClickedThumbnailIndex(next);
        setIsChanging(true);

        setTimeout(() => {
          setCurrentIndex(next);
          setIsChanging(false);
          setClickedThumbnailIndex(null);
        }, 1400);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isChanging]);

  const handleThumbnailClick = (index) => {
    if (index !== currentIndex && !isChanging) {
      setNextIndex(index);
      setClickedThumbnailIndex(index);
      setIsChanging(true);

      setTimeout(() => {
        setCurrentIndex(index);
        setIsChanging(false);
        setClickedThumbnailIndex(null);
      }, 1400);
    }
  };

  //   const nextSlide = () => {
  //     if (!isChanging) {
  //       const next = (currentIndex + 1) % heroImages.length;
  //       setNextIndex(next);
  //       setClickedThumbnailIndex(next);
  //       setIsChanging(true);

  //       setTimeout(() => {
  //         setCurrentIndex(next);
  //         setIsChanging(false);
  //         setClickedThumbnailIndex(null);
  //       }, 1400);
  //     }
  //   };

  //   const prevSlide = () => {
  //     if (!isChanging) {
  //       const next =
  //         currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1;
  //       setNextIndex(next);
  //       setClickedThumbnailIndex(next);
  //       setIsChanging(true);

  //       setTimeout(() => {
  //         setCurrentIndex(next);
  //         setIsChanging(false);
  //         setClickedThumbnailIndex(null);
  //       }, 1400);
  //     }
  //   };

  const getThumbnailProperties = (index) => {
    let relativePos = index - currentIndex;
    if (relativePos < 0) relativePos += heroImages.length;

    const positions = [
      {
        y: 0,
        size: "w-30 h-20",
        opacity: "opacity-100",
        scale: 1.2,
        isCurrent: true,
      },
      {
        y: -80,
        size: "w-24 h-16",
        opacity: "opacity-90",
        scale: 1.0,
        isCurrent: false,
      },
      {
        y: -130,
        size: "w-20 h-12",
        opacity: "opacity-60",
        scale: 0.8,
        isCurrent: false,
      },
      {
        y: 70,
        size: "w-18 h-14",
        opacity: "opacity-70",
        scale: 0.9,
        isCurrent: false,
      },
    ];

    return positions[relativePos] || positions[positions.length + 1];
  };

  const getThumbnailPosition = (index) => {
    const thumbnail = thumbnailRefs.current[index];
    if (!thumbnail) return { x: 0, y: 0, width: 80, height: 64 };

    const rect = thumbnail.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Base hero image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={heroImages[currentIndex].url}
          alt={heroImages[currentIndex].alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Transition image */}
      {isChanging && clickedThumbnailIndex !== null && (
        <motion.div
          initial={() => {
            const pos = getThumbnailPosition(clickedThumbnailIndex);
            return {
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: pos.width,
              height: pos.height,
              borderRadius: "12rem",
              opacity: 0,
              zIndex: 15,
            };
          }}
          animate={{
            left: 0,
            top: 0,
            width: "99vw",
            height: "100vh",
            borderRadius: "0rem",
            opacity: 100,
          }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1.4] }}
          className="overflow-hidden"
        >
          <ImageWithFallback
            src={heroImages[nextIndex].url}
            alt={heroImages[nextIndex].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>
      )}

      {/* Navigation arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-3 group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
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
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-3 group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
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
      </button> */}

      {/* Wheel thumbnails */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.1, delay: 0.1 }}
        className="absolute bottom-8 right-8 z-30"
        style={{ height: "280px", width: "120px" }}
      >
        <div className="relative h-full w-full flex items-center justify-center">
          {heroImages.map((image, index) => {
            const props = getThumbnailProperties(index);
            const isActive = props.isCurrent;
            const isTransitioning = clickedThumbnailIndex === index;

            return (
              <motion.button
                key={index}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                onClick={() => handleThumbnailClick(index)}
                className={`absolute overflow-hidden rounded-xl transition-all duration-700 ${props.size} ${props.opacity}`}
                animate={{
                  y: props.y,
                  scale: props.scale,
                  zIndex: isActive ? 10 : 5,
                }}
                whileHover={{
                  scale: props.scale * 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: props.scale * 0.95 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  y: { duration: 0.7 },
                  scale: { duration: 0.7 },
                }}
                style={{ transformOrigin: "center center" }}
              >
                <div
                  className={`absolute -inset-1 rounded-xl transition-all duration-700 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400/60 to-orange-500/60 blur-sm"
                      : "bg-white/20 blur-sm opacity-0 hover:opacity-100"
                  }`}
                />

                <div
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-700 ${
                    isActive
                      ? "border-white shadow-2xl"
                      : "border-white/40 hover:border-white/70"
                  }`}
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-700 ${
                      isActive
                        ? "bg-gradient-to-t from-black/10 to-transparent"
                        : "bg-black/50 hover:bg-black/30"
                    }`}
                  />

                  {isActive && (
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full shadow-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: -0.3, duration: 1.3 }}
                    />
                  )}

                  {isTransitioning && (
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center text-white px-8"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-3xl md:text-4xl lg:text-5xl mb-4 font-light tracking-wide"
            style={{ textShadow: "2px 2px 20px rgba(0,0,0,0.7)" }}
          >
            Experience Fine Dining
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
            style={{ textShadow: "1px 1px 10px rgba(0,0,0,0.7)" }}
          >
            Where every dish tells a story and every moment becomes a memory
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Reserve a Table
            </motion.button>

            <motion.button
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Menu
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
