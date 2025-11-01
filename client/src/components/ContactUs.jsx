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
          className="backdrop-blur-xl bg-white/60 shadow-2xl max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 rounded-2xl"
        >
          <div className="text-center">
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
          <div className="mt-16 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-lg overflow-hidden w-full h-[480px]">
                {/* Map iframe */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1167.917386131958!2d41.862327418297006!3d9.592035085789592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163101c0575d6163%3A0x657fdaebe9f2f5e1!2z4Yuy4YqSIOGNk-GIq-GLs-GLreGLnSBEaW5pIFBhcmFkaXNl!5e1!3m2!1sen!2set!4v1761987243405!5m2!1sen!2set" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                {/* Info card overlay */}
                {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full lg:w-2/3 bg-white/75 rounded-lg shadow-md p-6 flex flex-wrap gap-4">
                  <div className="lg:w-1/2 px-2">
                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                      ADDRESS
                    </h2>
                    <p className="mt-1 text-xs w-full">
                      Photo booth tattooed prism,
                    </p>
                  </div>
                </div>*/}
              </div>
              <form className="my-auto">
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="flex justify-items-start text-sm font-semibold text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="py-2 px-2 mt-2 block w-full rounded-lg border-gray-300 bg-white/20 shadow-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="flex text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="py-2  px-2 mt-2 block w-full rounded-md border-gray-300 bg-white/20 shadow-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <label className="flex text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="flex py-2 px-2 mt-2 w-full rounded-lg border-gray-300 bg-white/20 shadow-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Write us your message..."
                  />

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-amber-600 w-full hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
