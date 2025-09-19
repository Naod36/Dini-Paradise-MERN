import React from "react";
import { motion } from "framer-motion";

function ContactUs() {
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
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-amber-200 to-pink-200 animate-gradient opacity-40"></div>

      {/* Floating circles */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 -right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-200"></div>
      <div className="absolute -bottom-16 left-1/2 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-lg opacity-30 animate-blob animation-delay-400"></div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/40 shadow-2xl rounded-2xl p-10"
        >
          <div className="text-center mb-8">
            <motion.span
              variants={itemVariants}
              className="z-30 inline-block px-4 py-2 bg-amber-100 text-amber-800 text-lg font-semibold rounded-full mb-4"
            >
              Contact Us
            </motion.span>
            <p className="mt-3 text-lg text-gray-600">
              Have questions? Let’s talk. We usually respond within 24 hours.
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 justify-between place-items-center">
            <div className="flex flex-row space-x-6">
              <div className="flex flex-col">
                <div>
                  <label className="flex justify-items-start text-sm font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="py-2 px-2 mt-2 block w-full rounded-lg border-gray-300 bg-white/30 shadow-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="flex mt-6 text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="py-2 px-2 mt-2 block w-full rounded-md border-gray-300 bg-white/80 shadow-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="flex text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="flex py-2 px-2 mt-2 w-fit rounded-lg border-gray-300 bg-white/80 shadow-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Write your message..."
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Extra Tailwind Animations */}
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </section>
  );
}

export default ContactUs;
