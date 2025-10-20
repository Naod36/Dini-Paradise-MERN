"use client";

import { useState, useEffect, useRef } from "react";
import ImageWithFallback from "./figma/ImageWithFallback";
import { cn } from "../lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// The props `backgroundImage` and `rotationInterval` are kept, but `images` is removed.
export default function Gallery({
  backgroundImage,
  rotationInterval = 4000,
  className,
}) {
  // State for images, loading, and errors
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [currentMainImage, setCurrentMainImage] = useState(0);
  const [tiltAngles, setTiltAngles] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mainImageRef = useRef(null);

  // Fetch images from your API when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Your backend is running on port 5000
<<<<<<< HEAD
        const response = await fetch("https://dini-paradise-backend-akz8.onrender.com/api/images");
=======
        // const response = await fetch("http://localhost:5000/api/images");

        const response = await fetch(
          "https://dini-paradise-backend-akz8.onrender.com/api/images"
        );
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []); // Empty dependency array means this runs once on mount

  // This interval effect now depends on `images.length`
  useEffect(() => {
    if (images.length === 0) return; // Don't start interval if no images

    const interval = setInterval(() => {
      setCurrentMainImage((prev) => (prev + 1) % images.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [images.length, rotationInterval]);

  const nextSlide = () => {
    setCurrentMainImage((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentMainImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentMainImage(index);
  };

  // --- The rest of your event handlers (handleMouseMove, etc.) remain the same ---
  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const maxTilt = 15;
    setTiltAngles({
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
    });
  };
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTiltAngles({ rotateX: 0, rotateY: 0 });
  };
  // --- End of unchanged handlers ---

  // --- Conditional Rendering ---
  if (isLoading) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-black">
        <p className="text-2xl text-white">Loading Gallery...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-black">
        <p className="text-2xl text-red-500">Error: {error}</p>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-black">
        <p className="text-2xl text-white">No images in the gallery yet.</p>
      </section>
    );
  }

  // Get current image only if images array is not empty
  const currentImage = images[currentMainImage];
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
    <section
      className={cn(
        "relative min-h-screen py-20 w-full bg-gradient-to-b from-gray-900/50 via-gray-700/25 to-black/40 overflow-hidden",
        className
      )}
    >
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/30" />

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-float rounded-full bg-gradient-to-br from-blue-500/90 to-purple-500/20 blur-3xl" />
          <div
            className="absolute top-1/2 right-1/6 h-40 w-40 animate-float-delayed rounded-full bg-gradient-to-br from-pink-500/90 to-orange-500/80 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 h-36 w-36 animate-float rounded-full bg-gradient-to-br from-cyan-500/90 to-teal-500/90 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 h-28 w-28 animate-float-delayed rounded-full bg-gradient-to-br from-yellow-500/20 to-red-500/20 blur-3xl"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.2) 1px, transparent 1px)
            `,
          backgroundSize: "100px 80px",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
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
          {/* <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover our most celebrated dishes, each crafted with passion and
            presented as a work of art.
          </motion.p> */}
        </motion.div>

        <div className="relative flex flex-col gap-4 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative h-96 md:h-[500px] w-full max-w-4xl"
              style={{ perspective: "1000px" }}
            >
              <div
                ref={mainImageRef}
                className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl border-2 border-amber-500/30 backdrop-blur-sm"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: isHovering
                    ? `rotateX(${tiltAngles.rotateX}deg) rotateY(${tiltAngles.rotateY}deg) scale(0.95)`
                    : "rotateX(0deg) rotateY(0deg) scale(1)",
                  transition: "transform 0.4s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute inset-0 transition duration-1000 ease-out",
                      currentMainImage === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-110 pointer-events-none"
                    )}
                  >
                    <ImageWithFallback
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt || `Featured image ${index + 1}`}
                      fill
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}

                {/* Ensure currentImage exists before trying to access its properties */}
                {currentImage && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8">
                    <motion.div
                      key={currentMainImage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xl font-semibold rounded-full mb-3 shadow-lg">
                        {currentImage.name}
                      </span>
                      <p className="text-lg text-white/90">
                        {currentImage.description}
                      </p>
                    </motion.div>
                  </div>
                )}
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
          <div className="absolute z-20 bottom-64 left-1/2 transform -translate-x-1/2 md:flex space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 hidden">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentMainImage
                    ? "bg-amber-500 scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/70 hover:scale-110"
                }`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          {/* <div className="items-center"> */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 "
          >
            {images.map((image, index) => (
              <motion.div
                key={images._id || index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative h-24 md:h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 items-end ${
                  index === currentMainImage
                    ? "ring-1 ring-amber-500 shadow-2xl border-amber-500/70"
                    : "hover:shadow-xl border-white/20 hover:border-amber-500/50"
                }`}
                onClick={() => goToSlide(index)}
              >
                <ImageWithFallback
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                          {image.name}
                        </h4>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {index === currentMainImage && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-3 h-3 bg-amber-500 rounded-full shadow-lg"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
          {/* </div> */}
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
      </div>
    </section>
  );
}
