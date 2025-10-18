import React, { useState } from "react";
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
      This section is for managing site-wide files, documents, and configuration
      data.
    </p>
  </div>
);

const GalleryManagerComponent = () => (
  <div className="p-8 text-center text-gray-500">
    <Image className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
    <h2 className="text-xl font-semibold">Gallery Management</h2>
    <p>
      Start here to upload, organize, and delete images for your site's public
      galleries.
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- START: Sidebar --- */}
      <nav
        className={`fixed inset-y-0 left-0 z-50 flex flex-col flex-shrink-0 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
          ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"}
          ${isSidebarOpen ? "w-64" : "md:w-20"}`}
      >
        {/* Header */}
        <div
          className={`p-4 flex items-center justify-between h-16 border-b border-gray-700 ${
            isSidebarOpen ? "" : "md:justify-center"
          }`}
        >
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold tracking-wider">DINI ADMIN</h1>
          ) : (
            <div className="hidden md:block">
              {" "}
              {/* Only show Menu icon on collapsed desktop */}
              <Menu className="w-6 h-6" />
            </div>
          )}

          {/* Desktop Collapse/Expand Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors hidden md:block"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="p-1 text-gray-400 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
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
                <span
                  className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 
                    ${isSidebarOpen ? "block" : "md:hidden"}`}
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
            <LogOut className="w-5 h-5" />
            <span className={`ml-3 ${isSidebarOpen ? "block" : "md:hidden"}`}>
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

      <div className="flex-1 flex flex-col">
        {/* --- START: Mobile Header --- */}
        <header className="flex items-center justify-between p-4 bg-white border-b md:hidden">
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
        </header>
        {/* --- END: Mobile Header --- */}

        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto p-0 md:p-6">
          <div className="h-full">
            <SelectedComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
