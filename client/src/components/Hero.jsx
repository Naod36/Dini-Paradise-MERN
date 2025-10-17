import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "./figma/ImageWithFallback";
import smallLogo from "../assets/smallLogo.png";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import GradualBlur from "./GradualBlur";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/site-assets";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [nextIndex, setNextIndex] = useState(0);
  const [clickedThumbnailIndex, setClickedThumbnailIndex] = useState(null);
  const thumbnailRefs = useRef([]);
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  const navigate = useNavigate();
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch assets for the 'home' page
        const response = await fetch(`${API_URL}/page/home`);
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 2. Parse the JSON response
        const data = await response.json();
        console.log(data);
        // 3. Map the fetched data structure to what your component expects
        const formattedImages = data.map((asset) => ({
          url: asset.src,
          alt: asset.alt,
          // key: asset.key,
        }));

        setHeroImages(formattedImages);
      } catch (err) {
        console.error("Failed to fetch hero assets:", err);
        setError(
          `Failed to load hero images. Please ensure the backend is running and the URL is correct. Error: ${err.message}`
        );
        setHeroImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroAssets();
  }, []);
  // Empty dependency array means this runs once on mount

  // ---------------------------------------------

  useEffect(() => {
    if (heroImages.length === 0) return;
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
  }, [currentIndex, isChanging, heroImages.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold text-gray-700 bg-gray-100">
        Loading beautiful assets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-red-500 font-semibold text-center p-4 bg-red-50/50">
        Error: {error}
      </div>
    );
  }

  if (heroImages.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500 font-medium text-center p-4 bg-gray-100">
        No hero images found. Please upload assets for the 'home' page.
      </div>
    );
  }

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
    <div className="relative w-full h-screen overflow-hidden bg-transparent">
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
        className="absolute bottom-8 right-8 z-30 hidden sm:block"
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
      <div className="absolute inset-0 flex items-center justify-center z-20 pt-20 px-8 md:-ml-20 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col md:flex-row items-center md:items-center gap-8 text-center md:text-left"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-40 md:w-72 flex-shrink-0"
          >
            <img
              src={smallLogo}
              alt="Dini Paradise Logo"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col items-center md:items-start">
            <BlurText
              text="Dini Paradise"
              delay={250}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl md:text-4xl lg:text-6xl mb-1 font-marhey font-semibold tracking-wide text-white drop-shadow-[5px_5px_10px_rgba(0,0,0,1)]"
            />
            {/* <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-3xl md:text-4xl lg:text-6xl mb-1 font-marhey font-semibold tracking-wide text-white"
              style={{ textShadow: "5px 5px 2px rgba(0,0,0,1)" }}
            >
              Dini Paradise
            </motion.h2> */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-lg md:text-2xl mb-6 text-white/90 max-w-2xl"
              style={{ textShadow: "1px 1px 10px rgba(0,0,0,0.7)" }}
            >
              A Culinary Journey
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/itemMenu")}
              >
                View Menu
              </motion.button>

              <motion.button
                className="border-2 border-white text-white  hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Gallery
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    //       </div>

    //   <GradualBlur
    //     target="parent"
    //     position="bottom"
    //     height="6rem"
    //     strength={2}
    //     divCount={5}
    //     curve="bezier"
    //     exponential={true}
    //     opacity={1}
    //   />
    // </section>
  );
}

export default Hero;
