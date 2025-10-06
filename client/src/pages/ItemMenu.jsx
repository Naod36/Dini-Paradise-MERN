import { useState, useRef } from "react"; // 1. Import useRef
import { ChevronLeft, ChevronRight } from "@deemlol/next-icons";
// 2. Import the custom hook
import { useHorizontalScroll } from "../script/useHorizontalScroll";

const menuItems = [
  {
    id: 1,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 2,
    name: "Spaghetti Carbonara",
    category: "Pasta",
    price: 10.99,
    description: "Classic Roman dish with eggs, cheese, pancetta, and pepper.",
    image: "https://via.placeholder.com/400x250?text=Carbonara",
    popular: false,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 8.99,
    description: "Tomato, mozzarella, and fresh basil.",
    image: "https://via.placeholder.com/400x250?text=Margherita",
    popular: true,
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 9.99,
    description: "Topped with mozzarella and spicy pepperoni.",
    image: "https://via.placeholder.com/400x250?text=Pepperoni",
    popular: false,
  },
  {
    id: 5,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 6,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 7,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 8,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 9,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 10,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 11,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 12,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 13,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
  {
    id: 14,
    name: "Lasagna",
    category: "Pasta",
    price: 12.99,
    description: "Layers of pasta, cheese, and rich tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc1ODE2NjY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true,
  },
];

export default function ItemMenu() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

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

  const popularItems = menuItems.filter((item) => item.popular);

  const scrollRef = useHorizontalScroll(40);

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
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="mt-24">
        {" "}
        {/* pushes below navbar */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCategory === cat
                ? "bg-amber-500 text-white shadow-md"
                : "bg-gray-100 hover:bg-amber-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Popular Items Scroll */}
      <h2 className="text-xl font-semibold mb-4">Popular</h2>
      <div className="relative flex items-center">
        <button
          onClick={slideLeft}
          className="absolute left-0 z-10 p-3 bg-white rounded-full shadow-lg opacity-50 transition-opacity hover:opacity-100 hidden md:block" // Style for button
        >
          <ChevronLeft size={30} className="text-amber-500" />
        </button>

        <div
          // 3. Attach the ref from the custom hook and buttons logic
          ref={scrollRef}
          // Removed the `id="slider"` since we are using a ref now.
          // Note: `scroll` class is not a standard Tailwind class,
          // `overflow-x-auto` or `overflow-x-scroll` are correct.
          className="flex overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide gap-4 mb-10 pb-2 w-full"
        >
          {popularItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="min-w-[160px] bg-white  rounded-lg shadow cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-amber-600 font-bold text-sm">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Right Chevron Button */}
        <button
          onClick={slideRight}
          className="absolute right-0 z-10 p-3 bg-white rounded-full shadow-lg opacity-50 transition-opacity hover:opacity-100 hidden md:block" // Style for button
        >
          <ChevronRight size={30} className="text-amber-500" />
        </button>
      </div>

      {/* All Items Grid */}
      <h2 className="text-xl font-semibold mb-4">All Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="relative group rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
          >
            <img
              src={item.image}
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
