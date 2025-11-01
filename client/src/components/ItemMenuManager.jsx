import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Loader2,
  Image,
  Upload,
} from "lucide-react";
import { toast } from "react-toastify";

// The base URL for your menu item API, matching the backend configuration
const API_BASE_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/menu-items";

// Define the available categories based on your Mongoose schema
const CATEGORY_OPTIONS = [
  "Pasta",
  "Pizza",
  "Salad",
  "Dessert",
  "Beverage",
  "Main Dish",
  "Breakfast",
  "Vegan Dish",
  "Fast Food",
  "Seafood",
];

// Utility function to get the admin token from localStorage
const getAuthToken = () => localStorage.getItem("adminToken");

// Custom Modal Component for Create/Edit/Delete actions
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="py-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

// Item Menu Manager Main Component
const ItemMenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending",
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit' or 'delete'
  const [currentItem, setCurrentItem] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  // --- Data Fetching (Read) ---
  const fetchItems = async () => {
    setIsLoading(true);

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch menu items.");
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(
        "Could not load menu items. Check API connection or authentication status."
      );
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // --- Filtering, Searching, and Sorting Logic ---
  const sortedAndFilteredItems = useMemo(() => {
    let workableItems = [...menuItems];

    // 1. Filtering/Searching
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      workableItems = workableItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseSearch) ||
          item.description.toLowerCase().includes(lowerCaseSearch) ||
          item.category.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // 2. Sorting
    if (sortConfig.key) {
      workableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return workableItems;
  }, [menuItems, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp size={16} className="ml-1 inline" />
    ) : (
      <ChevronDown size={16} className="ml-1 inline" />
    );
  };

  // --- CRUD Handlers ---

  const openCreateModal = () => {
    setCurrentItem({
      name: "",
      description: "",
      price: 0,
      category: CATEGORY_OPTIONS[0],
      isPopular: false,
      // Initialize image object to prevent errors
      image: { src: "", public_id: "", alt: "" },
    });
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setCurrentItem(item);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setCurrentItem(item);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Dini_paradise");
    data.append("cloud_name", "dabgmwnvx");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dabgmwnvx/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedImage = await res.json();

      if (uploadedImage.url && uploadedImage.public_id) {
        setCurrentItem({
          ...currentItem, // Spreads all top-level properties (name, price, etc.)
          image: {
            ...currentItem.image, // Spreads all existing image properties (like 'alt')
            src: uploadedImage.url, // <-- **CORRECT** target for the URL
            public_id: uploadedImage.public_id, // <-- **CORRECT** target for the ID
          },
        });
        setFileUploaded(true);
      } else {
        console.error("Cloudinary upload failed:", uploadedImage);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. Create a new handler to clear the image ---
  const handleClearImage = () => {
    setCurrentItem({
      ...currentItem.image,
      src: "",
      public_id: "",
    });
    setFileUploaded(false); // <-- Allow manual input again
    // Also reset the file input field so the user can re-upload the same file
    const fileInput = document.querySelector(".file-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = getAuthToken();
    const method = modalMode === "create" ? "POST" : "PUT";
    const url =
      modalMode === "create"
        ? API_BASE_URL
        : `${API_BASE_URL}/${currentItem._id}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // IMPORTANT: Include token for protected routes
        },
        body: JSON.stringify(currentItem),
      });

      if (!response.ok) {
        let errorMsg = `Server error: ${response.status} ${response.statusText}.`;
        try {
          // Try to parse error data if the server sends JSON
          const errorData = await response.json();
          errorMsg = errorData.msg || errorData.error || errorMsg;
        } catch (e) {
          // Fallback for non-JSON responses (like HTML 404/500 pages)
          console.error("Non-JSON error response received:", e);
          errorMsg = `Operation failed (Status: ${response.status}). The server returned a non-JSON response. Check your admin token or API URL for errors.`;
        }
        throw new Error(errorMsg);
      }
      const successMessage =
        modalMode === "create"
          ? `Menu Item "${currentItem.name}" successfully created!`
          : `Menu Item "${currentItem.name}" successfully updated!`;

      toast.success(successMessage);
      

      // Refetch data to update the table
      await fetchItems();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Form Submit Error:", err);
      // Display the detailed error message caught above
      setError(`Operation failed: ${err.message}`);
      toast.error(`Failed to save Menu item: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!currentItem || !currentItem._id) return;

    setLoading(true);
    setError(null);
    const token = getAuthToken();

    try {
      const response = await fetch(`${API_BASE_URL}/${currentItem._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMsg = `Server error: ${response.status} ${response.statusText}.`;
        try {
          // Try to parse error data if the server sends JSON
          const errorData = await response.json();
          errorMsg = errorData.msg || errorData.error || errorMsg;
        } catch (e) {
          // Fallback for non-JSON responses (like HTML 404/500 pages)
          console.error("Non-JSON error response received:", e);
          errorMsg = `Deletion failed (Status: ${response.status}). The server returned a non-JSON response. Check your admin token or API URL for errors.`;
        }
        throw new Error(errorMsg);
      }
      toast.success(`Menu Item "${currentItem.name}" successfully deleted!`);

      // Refetch data to update the table
      await fetchItems();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Delete Error:", err);
      setError(`Deletion failed: ${err.message}`);
      toast.error(`Failed to delete Menu item: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Renderers for the Modal Content ---

  const renderFormContent = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={currentItem?.name || ""}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, name: e.target.value })
          }
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={currentItem?.description || ""}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, description: e.target.value })
          }
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image Alt Text
        </label>
        <input
          type="text"
          value={currentItem?.image?.alt || ""}
          onChange={(e) =>
            setCurrentItem({
              ...currentItem,
              image: { ...currentItem.image, alt: e.target.value },
            })
          }
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
      </div>

      {/* Price and Category (Side-by-side) */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={currentItem?.price || 0}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                price: parseFloat(e.target.value) || 0,
              })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={currentItem?.category || CATEGORY_OPTIONS[0]}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, category: e.target.value })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border bg-white"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image Details */}
      <fieldset className="border p-3 rounded-lg space-y-3">
        <legend className="text-sm font-semibold text-gray-700 px-1">
          Image Details
        </legend>
        {/* Responsive 2-column grid. Stacks on mobile, splits on large screens. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
          {/* --- COLUMN 1: UPLOAD & PREVIEW --- */}
          <div className="space-y-4">
            {/* Upload Box */}
            <div className="file-upload">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <div
                className={`upload-container relative ${
                  isLoading ? "bg-gray-500" : "bg-indigo-600"
                } p-6 rounded-xl flex flex-col items-center justify-center text-white text-center transition-all`}
              >
                {isLoading ? (
                  <>
                    {/* Improved visible loader */}
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="mt-2 text-sm font-medium">
                      Uploading...
                    </span>
                  </>
                ) : (
                  <>
                    <div className="upload-icon mb-2">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-medium">Click or drag to upload</span>
                    <span className="text-xs text-indigo-100">
                      Replaces the current image
                    </span>
                    <input
                      type="file"
                      className="file-input absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                      disabled={isLoading}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Image Preview */}
            <div className="preview-container">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Preview
              </label>

              <div className="w-full aspect-video bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center relative">
                {currentItem?.image?.src ? (
                  <>
                    <img
                      src={currentItem.image.src}
                      alt="Image preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-gray-500 flex flex-col items-center">
                    <Image className="w-12 h-12 text-gray-400" />
                    <span>No image selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- COLUMN 2: IMAGE DETAILS (INPUTS) --- */}
          <div className="space-y-4 mt-4 lg:mt-0">
            {/* This section now conditionally renders inputs or styled text */}
            {fileUploaded ? (
              <>
                {/* Read-only text display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL (from upload)
                  </label>
                  <p className="mt-1 p-2 block w-full text-sm text-gray-600 bg-gray-100 rounded-md border border-gray-300 break-words">
                    {currentItem.image?.src}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image Public ID (from upload)
                  </label>
                  <p className="mt-1 p-2 block w-full text-sm text-gray-600 bg-gray-100 rounded-md border border-gray-300 break-words">
                    {currentItem.image?.public_id}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFileUploaded(false)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Edit Manually
                </button>
              </>
            ) : (
              <>
                {/* Editable inputs */}
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL (src)
                  </label>
                  <input
                    id="imageUrl"
                    type="url"
                    value={currentItem?.image?.src || ""}
                    onChange={(e) => {
                      setCurrentItem({
                        ...currentItem.image,
                        src: e.target.value,
                      });
                      setFileUploaded(false); // <-- Set to manual mode
                    }}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    placeholder="https://... or upload a file"
                  />
                </div>
                <div>
                  <label
                    htmlFor="publicId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image Public ID
                  </label>
                  <input
                    id="publicId"
                    type="text"
                    value={currentItem?.image?.public_id || ""}
                    onChange={(e) => {
                      setCurrentItem({
                        ...currentItem.image,
                        public_id: e.target.value,
                      });
                      setFileUploaded(false); // <-- Set to manual mode
                    }}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    placeholder="e.g., folder/image_name"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL (src)
          </label>
          <input
            type="url"
            value={currentItem?.image?.src || ""}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                image: { ...currentItem.image, src: e.target.value },
              })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Alt Text
          </label>
          <input
            type="text"
            value={currentItem?.image?.alt || ""}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                image: { ...currentItem.image, alt: e.target.value },
              })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>
        {/* public_id is required by the model but typically managed server-side during image upload. We allow editing it here for full CRUD control */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Public ID
          </label>
          <input
            type="text"
            value={currentItem?.image?.public_id || ""}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                image: { ...currentItem.image, public_id: e.target.value },
              })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div> */}
      </fieldset>

      {/* Is Popular Checkbox */}
      <div className="flex items-center">
        <input
          id="isPopular"
          name="isPopular"
          type="checkbox"
          checked={currentItem?.isPopular || false}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, isPopular: e.target.checked })
          }
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="isPopular"
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          Mark as Popular Item
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors flex items-center"
      >
        {loading
          ? "Saving..."
          : modalMode === "create"
          ? "Create Item"
          : "Save Changes"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );

  const renderDeleteContent = () => (
    <div className="space-y-4">
      <p className="text-lg text-gray-700">
        Are you sure you want to delete the item:{" "}
        <span className="font-semibold text-indigo-600">
          {currentItem?.name}
        </span>
        ?
      </p>
      <p className="text-sm text-gray-500">This action cannot be undone.</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setIsModalOpen(false)}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteItem}
          disabled={loading}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
        >
          {loading ? "Deleting..." : "Confirm Delete"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );

  // --- Main Render ---
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg h-full overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Item Menu Manager
      </h1>

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New Item
        </button>
      </div>

      {/* Error & Loading State */}
      {error && (
        <div
          className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Menu Items Table (Scrollable) */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {/* Table Headers */}
                {[
                  "name",
                  "category",
                  "price",
                  "isPopular",
                  "createdAt",
                  "actions",
                ].map((key) => (
                  <th
                    key={key}
                    onClick={() => key !== "actions" && requestSort(key)}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      key !== "actions"
                        ? "cursor-pointer hover:bg-gray-100 transition-colors"
                        : ""
                    }`}
                  >
                    {key === "name"
                      ? "Name / Description"
                      : key === "category"
                      ? "Category"
                      : key === "price"
                      ? "Price"
                      : key === "isPopular"
                      ? "Popular"
                      : key === "createdAt"
                      ? "Created Date"
                      : "Actions"}
                    {getSortIcon(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAndFilteredItems.length > 0 ? (
                sortedAndFilteredItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-indigo-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={item.image.src}
                            alt={item.image.alt}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/40x40/9CA3AF/FFFFFF?text=DINI";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.isPopular ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded-full hover:bg-indigo-100"
                          aria-label={`Edit ${item.name}`}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="text-red-600 hover:text-red-900 transition-colors p-1 rounded-full hover:bg-red-100"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        <span className="mt-2 text-sm font-semibold text-gray-700">
                          Loading Menu List...
                        </span>
                      </div>
                    ) : (
                      "No menu items found matching your criteria."
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT / DELETE MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "create"
            ? "Create New Menu Item"
            : modalMode === "edit"
            ? `Edit: ${currentItem?.name}`
            : `Delete Item`
        }
      >
        {modalMode === "delete" ? renderDeleteContent() : renderFormContent()}
      </Modal>
    </div>
  );
};

export default ItemMenuManager;
