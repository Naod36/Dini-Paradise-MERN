import React from "react";
import { motion } from "framer-motion";

function Reservation() {
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-amber-200 to-pink-200 animate-gradient opacity-90"></div>

      {/* Floating circles */}
      {/* <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div> */}
      <div className="absolute -top-20 -right-10 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl  opacity-30 animate-blob animation-delay-5"></div>
      <div className="absolute -bottom-16 left-1/2 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4"></div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/60 shadow-2xl max-w-5xl mx-auto pb-6 rounded-2xl"
        >
          {/* Header  */}
          <div className="text-center bg-gradient-to-br from-amber-600 to-amber-800 rounded-t-2xl mt-2 py-6 px-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white/90 mb-6 "
            >
              Reserv a<span className="text-amber-400"> Table</span>
            </motion.h2>
          </div>
          {/*  Booking Form  */}
          <form className="p-8 space-y-6">
            {/* Guest Information  */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Guest Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Your Full Name"
                    className="w-full px-4 py-2 rounded-lg shadow-md bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    for="guests"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="4+">More than 4</option>
                  </select>
                </div>
              </div>
            </div>
            {/*  Dates  */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Reservation Detail
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="reservationDate" // <--- CHANGED
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Reservation Date {/* <--- CHANGED LABEL */}
                  </label>
                  <input
                    type="date"
                    id="reservationDate" // <--- CHANGED ID
                    name="reservationDate" // <--- CHANGED NAME
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    for="reservationTime" // <--- CHANGED
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Reservation Time {/* <--- CHANGED LABEL */}
                  </label>
                  <input
                    type="time" // <--- CHANGED TYPE
                    id="reservationTime" // <--- CHANGED ID
                    name="reservationTime" // <--- CHANGED NAME
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            {/* Special Requests  */}
            <div className="space-y-2">
              <label
                for="requests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Special Requests
              </label>
              <textarea
                id="requests"
                name="requests"
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special requirements or preferences..."
              ></textarea>
            </div>

            {/* Submit  */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="agreeTerms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to Hotel Ituze's{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and
                  <a href="#" className="text-blue-600 hover:underline">
                    Cancellation Policy
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-amber-600 w-full hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-calendar-check mr-2"></i> Confirm Booking
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

export default Reservation;
