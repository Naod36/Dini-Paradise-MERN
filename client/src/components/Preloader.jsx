import React, { useEffect, useState } from "react";
import logo from "../assets/smallLogo.png"; // adjust path if needed

const Preloader = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500); // start fade after 1.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-[9999] transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Logo in the center */}
        <img
          src={logo}
          alt="Logo"
          className="w-28 ml-3 h-auto z-10 animate-pulse"
        />

        {/* Spinning circles behind the logo */}
        <div className="absolute flex items-center justify-center">
          <div className="w-36 h-36 border-4 border-transparent text-amber-500/50 text-4xl animate-spin flex items-center justify-center border-t-amber-400/50 rounded-full">
            <div className="w-32 h-32 border-4 border-transparent text-amber-700 text-2xl animate-spin flex items-center justify-center border-t-amber-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
