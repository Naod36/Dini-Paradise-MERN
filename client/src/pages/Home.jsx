import React from "react";
import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import Gallery from "../components/Gallery";
import ContactUs from "../components/ContactUs";
import GradualBlur from "gradualblur";

function Home() {
  return (
    <>
      <div>
        <Hero />
        <AboutPreview />
        <Gallery />
        <ContactUs />
        <GradualBlur
          position="bottom"
          height="6rem"
          strength={1}
          target="page"
          className="custom-blur-overlay"
        />
      </div>
    </>
  );
}

export default Home;
