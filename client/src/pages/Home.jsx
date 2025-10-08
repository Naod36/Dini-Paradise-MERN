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
        <Gallery
         backgroundImage={"/abstract-geometric-pattern.png"}
        images={[
          {
            src: "/modern-architecture-cityscape.png",
            name: "Modern Architecture",
            description: "Contemporary urban design showcasing innovative building structures",
            alt: "Modern architecture cityscape",
          },
          {
            src: "/serene-mountain-lake.png",
            name: "Mountain Serenity",
            description: "Peaceful alpine lake surrounded by majestic peaks",
            alt: "Serene mountain lake",
          },
          {
            src: "/vibrant-urban-cityscape.png",
            name: "Urban Energy",
            description: "Dynamic city life captured in vibrant colors and movement",
            alt: "Vibrant urban cityscape",
          },
          {
            src: "/minimalist-design.png",
            name: "Minimalist Elegance",
            description: "Clean lines and simplicity in modern design aesthetics",
            alt: "Minimalist design",
          },
        ]}
        rotationInterval={4000}
        
        />
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
