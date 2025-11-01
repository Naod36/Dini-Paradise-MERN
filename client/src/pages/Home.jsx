import React from "react";
import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import Gallery from "../components/Gallery";
import ContactUs from "../components/ContactUs";
import GradualBlur from "gradualblur";
import ReservationForm from "../components/Reservation";

function Home() {
  return (
    <>
      <div>
        <Hero />
        <AboutPreview />

        {/* The Gallery component is now self-sufficient! */}
        <section id="gallery-section">
          <Gallery
            backgroundImage={
              "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            }
            rotationInterval={8000}
          />
        </section>
        <ReservationForm />

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
