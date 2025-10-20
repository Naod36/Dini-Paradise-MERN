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
import ItemMenu from "./pages/ItemMenu";
import AdminPanel from "./pages/Admin/AdminPanel.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    if (isHomeRoute) {
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
  }, [location, isHomeRoute]);

  return (
    <>
      {loading && isHomeRoute && <Preloader />}

      <div
        className={`transition-opacity duration-1000 bg-transparent ${
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
            path="/itemMenu"
            element={
              <Layout>
                <ItemMenu />
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
          {/* --- NEW: Admin Login Route (No Layout) --- */}
          <Route path="/login" element={<AdminLogin />} />

          {/* --- NEW: Protected Admin Route (No Layout) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          {/* --- Catch-all/404 Route (Optional: Add Layout or leave bare) --- */}
          {/* You can add a 404 route here if needed, or let the path="*" handle it */}
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
