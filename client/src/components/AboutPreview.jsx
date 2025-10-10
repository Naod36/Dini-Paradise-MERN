import React from "react";
import { motion } from "framer-motion";

function AboutPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-10 overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-0" />

      <div className="relative z-10 ">
        {/* Animated gradient background overlay */}
        <div className="absolute inset-y-full bg-gradient-to-r from-blue-200 via-amber-200 to-pink-200 animate-gradient opacity-40"></div>

        {/* Floating circles */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 -right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-200"></div>
        <div className="absolute -bottom-16 left-1/2 w-72 h-72 bg-amber-300 rounded-full mix-blend-overlay filter blur-lg opacity-30 animate-blob animation-delay-400"></div>

        <div className="relative max-w-7xl mx-auto my-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left side - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.span
                  variants={itemVariants}
                  className="z-30 inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4"
                >
                  Our Story
                </motion.span>
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold text-black mb-6"
                >
                  A Culinary
                  <span className="text-amber-600"> Journey</span>
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  Since 2020, Dini Paradise has been crafting exceptional dining
                  experiences that blend traditional flavors with modern
                  innovation. Our passion for culinary excellence and warm
                  hospitality has made us a beloved destination for food lovers.
                </motion.p>
              </div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Passion-Driven
                    </h3>
                    <p className="text-gray-600">
                      Every dish is prepared with love and attention to detail,
                      using only the finest ingredients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Community Focused
                    </h3>
                    <p className="text-gray-600">
                      We're proud to be part of our local community, bringing
                      people together through great food and genuine
                      hospitality.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  Learn More About Us
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right side - Images */}
            <motion.div variants={imageVariants} className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Main image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="col-span-2 h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 text-amber-600 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <p className="text-amber-700 font-medium">
                        Restaurant Interior
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Small images */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-8 h-8 text-orange-600 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <p className="text-orange-700 text-sm font-medium">
                        Our Menu
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-32 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-amber-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-8 h-8 text-yellow-600 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-yellow-700 text-sm font-medium">
                        Our Team
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-amber-800 font-bold text-2xl">4+</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-orange-800 font-bold text-lg">★</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
