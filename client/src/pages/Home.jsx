import React from "react";
import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import Gallery from "../components/Gallery";
import ContactUs from "../components/ContactUs";

function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Gallery />
      <ContactUs />
    </>
  );
}

export default Home;
