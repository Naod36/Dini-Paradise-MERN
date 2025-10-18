import React, { useState } from "react"; // 1. Import useState
import { motion } from "framer-motion";

const API_BASE_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/reservations";
// 2. Renamed the component for clarity
function ReservationForm() {
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

  // 3. Add state for form data, loading, and messages
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "1",
    reservationDate: "",
    reservationTime: "",
    requests: "",
    isAgreedToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // 4. Create a generic handler for all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 5. Create the function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMessage("Thank you! Your reservation is pending confirmation.");
      setIsError(false);
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        guests: "1",
        reservationDate: "",
        reservationTime: "",
        requests: "",
        isAgreedToTerms: false,
      });
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* ...your background divs... */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-amber-200 to-pink-200 animate-gradient opacity-90"></div>
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
          <div className="text-center bg-gradient-to-br from-amber-600 to-amber-800 rounded-t-2xl mt-2 py-6 px-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white/90 mb-6 "
            >
              Reserve a<span className="text-amber-400"> Table</span>
            </motion.h2>
          </div>

          {/* 6. Wire up the form with the submit handler */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Guest Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* 7. Connect each input to the state */}
                <div>
                  <label
                    htmlFor="fullName"
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
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg shadow-md bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">More q than 4</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Reservation Detail
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="reservationDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    id="reservationDate"
                    name="reservationDate"
                    required
                    value={formData.reservationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reservationTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Reservation Time
                  </label>
                  <input
                    type="time"
                    id="reservationTime"
                    name="reservationTime"
                    required
                    value={formData.reservationTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="requests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Special Requests
              </label>
              <textarea
                id="requests"
                name="requests"
                rows="3"
                placeholder="Any special requirements or preferences..."
                value={formData.requests}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="isAgreedToTerms"
                  type="checkbox"
                  required
                  checked={formData.isAgreedToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to Hotel Ituze's{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Cancellation Policy
                  </a>
                </label>
              </div>

              {/* 8. Add the message display area */}
              {message && (
                <div
                  className={`p-4 rounded-md text-center font-semibold ${
                    isError
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* 9. Update button to show loading state */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-amber-600 w-full hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ...your style tag... */}
      <style>{`
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 8s ease infinite; }
        @keyframes gradientMove { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes blob { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
      `}</style>
    </section>
  );
}

// 10. Update the export to match the new name
export default ReservationForm;
