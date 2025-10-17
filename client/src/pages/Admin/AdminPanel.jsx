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
} from "lucide-react";

// Import the Item Menu Manager we just created
import ItemMenuManager from "../../components/ItemMenuManager.jsx";

// Placeholder components for future development
const ReservationManagerComponent = () => (
  <div className="p-8 text-center text-gray-500">
    <BookOpen className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
    <h2 className="text-xl font-semibold">Reservation Manager</h2>
    <p>
      Start here to view, accept, and manage all incoming table reservations.
    </p>
  </div>
);

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

// Define the navigation items
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    // Clear the token and redirect to login
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  const SelectedComponent =
    navItems.find((item) => item.id === selectedView)?.component ||
    ItemMenuManager;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <nav
        className={`flex flex-col flex-shrink-0 bg-gray-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:flex`} // Hidden on mobile initially
      >
        {/* Header */}
        <div
          className={`p-4 flex items-center justify-between h-16 border-b border-gray-700 ${
            isSidebarOpen ? "" : "justify-center"
          }`}
        >
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold tracking-wider">DINI ADMIN</h1>
          ) : (
            <Menu className="w-6 h-6" />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const isSelected = selectedView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedView(item.id)}
                className={`w-full flex items-center p-3 rounded-xl transition-colors duration-150 group 
                                    ${
                                      isSelected
                                        ? "bg-indigo-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isSelected ? "" : "text-gray-400 group-hover:text-white"
                  } flex-shrink-0`}
                />
                <span
                  className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 
                                    ${isSidebarOpen ? "block" : "hidden"}`}
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
              isSidebarOpen ? "" : "justify-center"
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span className={`ml-3 ${isSidebarOpen ? "block" : "hidden"}`}>
              Log Out
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow overflow-hidden p-0 md:p-6">
        <div className="h-full">
          <SelectedComponent />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
