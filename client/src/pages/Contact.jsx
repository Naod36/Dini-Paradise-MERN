import React from "react";
import BlurText from "../components/BlurText";

function Contact() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Replace normal heading with BlurText */}
          <BlurText
            text="Contact Dini Paradise"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl font-bold text-gray-900 mb-6"
          />
        </div>
      </div>
    </main>
  );
}

export default Contact;
