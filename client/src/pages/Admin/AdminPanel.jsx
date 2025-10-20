import React, { useState } from "react";
import { useEffect } from "react";

import {
  Menu,
  BarChart2,
  Image,
  Utensils,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  X, // Added for a close button
} from "lucide-react";

// Import the Item Menu Manager we just created
import ItemMenuManager from "../../components/ItemMenuManager.jsx";
import ReservationManagerComponent from "../../components/ReservationManagerComponent.jsx";

// Placeholder components for future development (no changes here)
// const ReservationManagerComponent = () => (
//   <div className="p-8 text-center text-gray-500">
//     <BookOpen className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
//     <h2 className="text-xl font-semibold">Reservation Manager</h2>
//     <p>
//       Start here to view, accept, and manage all incoming table reservations.
//     </p>
//   </div>
// );

const AssetManagerComponent = () => (
  <div className="p-8 text-center text-gray-500">
    <BarChart2 className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
    <h2 className="text-xl font-semibold">Site Asset Management</h2>
    <p>
      comming soon... section for managing site-wide files, documents, and
      configuration data.
    </p>
  </div>
);

const GalleryManagerComponent = () => (
  <div className="p-8 text-center text-gray-500">
    <Image className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
    <h2 className="text-xl font-semibold">Gallery Management</h2>
    <p>
      comming soon... section to upload, organize, and delete images for your
      site's public galleries.
    </p>
  </div>
);

// Define the navigation items (no changes here)
const navItems = [
  {
    id: "menu",
    name: "Item Menu Management",
    icon: Utensils,
    component: ItemMenuManager,
  },
  {
    id: "reservations",
    name: "Reservation Management",
    icon: BookOpen,
    component: ReservationManagerComponent,
  },
  {
    id: "gallery",
    name: "Gallery Management",
    icon: Image,
    component: GalleryManagerComponent,
  },
  {
    id: "assets",
    name: "Site Asset Management",
    icon: BarChart2,
    component: AssetManagerComponent,
  },
];

const AdminPanel = () => {
  const [selectedView, setSelectedView] = useState("menu");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For desktop
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // For mobile
  // ✅ Ensure proper layout on initial load
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Tailwind's md breakpoint
      setIsSidebarOpen(!isMobile); // closed on mobile, open on desktop
      setIsMobileNavOpen(false);
    };

    // Run once on mount
    handleResize();

    // Optional: update on resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  const handleNavItemClick = (id) => {
    setSelectedView(id);
    setIsMobileNavOpen(false); // Close mobile nav on selection
  };

  const SelectedComponent =
    navItems.find((item) => item.id === selectedView)?.component ||
    ItemMenuManager;
  ReservationManagerComponent;
  // Determine sidebar class strings to behave differently on mobile/md+
  const sidebarClass = `fixed inset-y-0 left-0 z-50 flex flex-col flex-shrink-0 bg-gray-800 text-white transform transition-all duration-300 ease-in-out relative 
    ${isMobileNavOpen ? "translate-x-0 w-64" : "w-16 translate-x-0"} 
    md:${isSidebarOpen ? "translate-x-0 w-64" : "w-20"}
  `;

  const pageWrapperClass = "flex-1 flex flex-col overflow-hidden"; // IMPORTANT:

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- START: Sidebar --- */}

      <nav className={`${sidebarClass} flex flex-col justify-between`}>
        {/* Header */}
        <div
          className={`p-4 flex items-center justify-between hover:bg-gray-700 h-16 border-b border-gray-700
  ${isSidebarOpen || isMobileNavOpen ? "" : "justify-center"}`}
        >
          {isSidebarOpen || isMobileNavOpen ? (
            <h1 className="text-xl font-bold tracking-wider">DINI ADMIN</h1>
          ) : (
            <Menu className="fixed  w-6 h-6" />
          )}

          <button
            onClick={() =>
              window.innerWidth < 768
                ? setIsMobileNavOpen(!isMobileNavOpen)
                : setIsSidebarOpen(!isSidebarOpen)
            }
            className="p-2 ml-4  rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen || isMobileNavOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div
          className={`flex-grow overflow-y-auto ${
            isSidebarOpen || isMobileNavOpen
              ? "p-4 space-y-2 justify-start"
              : "p-2 flex flex-col items-center justify-center space-y-2"
          }`}
        >
          {navItems.map((item) => {
            const isSelected = selectedView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`w-full flex items-center p-3 rounded-xl transition-colors duration-150 group
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isSelected ? "" : "text-gray-400 group-hover:text-white"
                  }`}
                />
                {/* show label only when sidebar is expanded on md+, or always on mobile when overlay open */}
                <span
                  className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300
    ${isSidebarOpen || isMobileNavOpen ? "block" : "hidden"}`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center p-3 rounded-xl text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors ${
              isSidebarOpen ? "" : "md:justify-center"
            }`}
          >
            <LogOut className="fixed w-5 h-5" />
            <span
              className={`ml-8  ${
                isSidebarOpen || isMobileNavOpen ? "block" : "hidden"
              }`}
            >
              Log Out
            </span>
          </button>
        </div>
      </nav>

      {/* --- END: Sidebar --- */}

      {/* --- START: Overlay for Mobile --- */}
      {isMobileNavOpen && (
        <div
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          aria-hidden="true"
        ></div>
      )}

      {/* --- END: Overlay --- */}

      <div className={pageWrapperClass}>
        {/* --- Mobile Header --- */}
        {/* <header className="flex items-center justify-between p-4 bg-white border-b md:hidden">
          <h1 className="text-lg font-semibold text-gray-800">
            {navItems.find((item) => item.id === selectedView)?.name ||
              "Admin Panel"}
          </h1>
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 text-gray-600 rounded-md hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header> */}

        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto p-0 md:p-6">
          <div className="h-full ">
            <SelectedComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
