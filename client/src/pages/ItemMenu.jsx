import { useState, useRef, useEffect } from "react"; // 1. Import useRef
import { ChevronLeft, ChevronRight } from "@deemlol/next-icons";
// 2. Import the custom hook
import { useHorizontalScroll } from "../script/useHorizontalScroll";
import ImageWithFallback from "../components/figma/ImageWithFallback";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
// const background = [
//   "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1ODEzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
// ];
const API_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/site-assets";
export default function ItemMenu() {
  // --- STATE MANAGEMENT ---
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const scrollRef = useHorizontalScroll(40, !isLoading);
  const [background, setBackground] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBgAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch assets for the 'home' page
        const response = await fetch(`${API_URL}/page/itemMenu`);
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 2. Parse the JSON response
        const data = await response.json();

        // 3. Map the fetched data structure to what your component expects
        const formattedImages = data.map((asset) => ({
          url: asset.src,
          alt: asset.alt,
          // key: asset.key,
        }));

        setBackground(formattedImages);
      } catch (err) {
        console.error("Failed to fetch hero assets:", err);
        setError(
          `Failed to load hero images. Please ensure the backend is running and the URL is correct. Error: ${err.message}`
        );
        setBackground([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBgAssets();
  }, []);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Fetch from your new API endpoint!
        const response = await fetch(
          "https://dini-paradise-backend-akz8.onrender.com/api/menu-items"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu data.");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []); // Empty array means this effect runs once when the component mounts
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold text-gray-700 bg-gray-100">
        Loading beautiful assets...
      </div>
    );
  }
  // --- RENDER LOGIC ---
  if (isLoading) {
    return <div className="text-center mt-48">Loading menu...</div>;
  }

  if (error) {
    return <div className="text-center mt-48 text-red-500">Error: {error}</div>;
  }

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularItems = menuItems.filter((item) => item.isPopular);

  // Also, use the scrollRef for the navigation buttons
  // Note: We don't need a separate ref, the one from the hook is sufficient

  // ... (categories and filteredItems logic remains the same) ...

  // Refactor the slide functions to use the scrollRef
  const slideLeft = () => {
    // Check if the ref has a current element
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 500;
    }
  };

  return (
    // 1. MAIN WRAPPER: Make it 'relative' to contain the absolute children.
    // We'll add a base dark color and ensure it takes at least the full screen height.
    // 'overflow-hidden' is good practice to contain the animated blobs.
    <div className="">
      {/* 2. BACKGROUND LAYER: Positioned absolutely to fill the parent. */}
      {/* 'z-0' places this layer at the very back. */}
      <div className="relative w-full h-auto bg-gradient-to-t from-orange-800 via-orange-600 to-orange-300">
        <div className="absolute  inset-0 ">
          <motion.div className="absolute inset-0 top-6 w-full h-auto">
            <AnimatePresence mode="wait">
              <motion.div
                // key={}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <ImageWithFallback
                  src={background}
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          {/* --- Paste All Your Background Elements Here --- */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/30" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* 3. CONTENT LAYER: Positioned relatively with a higher z-index. */}
        {/* 'z-10' places this layer on top of the background (z-0). */}
        {/* I've added a text color class for readability against the dark background. */}
        <div className="relative z-10 p-6 max-w-6xl mx-auto text-gray-200">
          {/* --- All Your Original Content Goes Here --- */}
          {/* Popular Items Scroll */}
          <h2 className="text-xl font-semibold mb-4 text-white">Popular</h2>
          <div className="relative flex items-center">
            <button
              onClick={slideLeft}
              // Adjusted button style for dark mode
              className="absolute left-1/3 -bottom-7 transform -translate-y-1/2 z-10 bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all duration-300 rounded-full p-3 group border border-white/30 hover:border-amber-500/50 shadow-lg"
            >
              <svg
                className="w-4 h-4 text-white group-hover:text-amber-400 group-hover:scale-110 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>{" "}
            </button>
            <button
              onClick={slideRight}
              // Adjusted button style for dark mode
              className="absolute right-1/3 -bottom-7 transform -translate-y-1/2 z-10 bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all duration-300 rounded-full p-3 group border border-white/30 hover:border-amber-500/50 shadow-lg"
            >
              <svg
                className="w-4 h-4 text-white group-hover:text-amber-400 group-hover:scale-110 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>{" "}
            </button>

            <div
              ref={scrollRef}
              className="mt-12 flex overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide gap-4 mb-10 pb-2 w-full"
            >
              {popularItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  // Adjusted card style for dark mode
                  className="min-w-[160px] bg-gray-800 text-white rounded-lg shadow cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="w-full h-28 object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-amber-500 font-bold text-sm">
                      Birr {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex flex-col items-center">
        <div className="mt-6 w-full max-w-lg ">
          {/* pushes below navbar */}
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // Adjusted input style for dark mode
            className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg mb-6 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              // Adjusted button styles for dark mode
              className={`px-4 py-2 rounded-full border border-gray-600 transition-all ${
                selectedCategory === cat
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-gray-700 hover:bg-amber-600/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* All Items Grid */}
      <h2 className="text-xl font-semibold p-6 mb-4">All Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="relative group rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
          >
            <img
              src={item.image.src}
              alt={item.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-amber-600 font-bold">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No items found.</p>
      )}

      {/* Modal Popup */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full flex flex-col md:flex-row">
            {/* Left: Image */}
            <div className="md:w-1/2">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              />
            </div>
            {/* Right: Details */}
            <div className="p-6 md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">{selectedItem.name}</h3>
              <p className="text-gray-700 mb-4">{selectedItem.description}</p>
              <p className="text-amber-600 font-bold text-xl mb-6">
                ${selectedItem.price.toFixed(2)}
              </p>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
