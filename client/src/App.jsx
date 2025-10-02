import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Preloader from "./components/Preloader";

function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setLoading(true);
      setShowContent(false);

      // Preloader runs for 2s, content fades in after that
      const timer = setTimeout(() => {
        setLoading(false);
        setShowContent(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
      setShowContent(true);
    }
  }, [location]);

  return (
    <>
      {loading && location.pathname === "/" && <Preloader />}

      <div
        className={`transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
