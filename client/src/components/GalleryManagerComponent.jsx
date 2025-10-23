import React, { useState, useEffect } from "react";
import {
  BarChart2,
  Edit,
  Save,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

// List of pages from your model's enum
const API_BASE_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/images";

const getAuthToken = () => localStorage.getItem("adminToken");

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

const GalleryManagerComponent = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedPage, setSelectedPage] = useState("home"); // Default to 'home'
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit' or 'delete'
  const [currentItem, setCurrentItem] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [formData, setFormData] = useState({ src: "", public_id: "", alt: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ type: "", content: "" });

  // Fetch gallery when the selectedPage changes

  const fetchGallery = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken"); // Get auth token
      const response = await fetch(API_BASE_URL, {
        headers: {
          // Add authorization if your route is protected
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Gallery.");
      }
      const data = await response.json();
      setGallery(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGallery();
  }, []);

  // --- Modal and Form Handlers ---
  const openCreateModal = () => {
    setCurrentItem({
      name: "",
      description: "",
      src: "",
      public_id: "",
      alt: "",
    });
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openEditModal = (asset) => {
    setCurrentItem(asset);
    setModalMode("edit");
    setIsModalOpen(true);
  };
  const openDeleteModal = (asset) => {
    setCurrentItem(asset);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  // const handleEditClick = (asset) => {
  //   setEditingGallery(asset);
  //   setFormData({
  //     name: asset.name,
  //     description: asset.description,
  //     src: asset.src,
  //     public_id: asset.public_id,
  //     alt: asset.alt,
  //   });
  //   setIsModalOpen(true);
  //   setMessage({ type: "", content: "" }); // Clear previous messages
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingGallery(null);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // setMessage({ type: "", content: "" });
    setError(null);
    const token = getAuthToken();

    const method = modalMode === "create" ? "POST" : "PUT";
    const url =
      modalMode === "create"
        ? API_BASE_URL
        : `${API_BASE_URL}/${currentItem.key}`;

    try {
      // const token = localStorage.getItem("adminToken");
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentItem),
      });

      // const updatedAsset = await response.json();

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

      // Refetch data to update the table
      await fetchGallery();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Form Submit Error:", err);
      // Display the detailed error message caught above
      setError(`Operation failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!currentItem || !currentItem.key) return;

    setLoading(true);
    setError(null);
    const token = getAuthToken();

    try {
      const response = await fetch(`${API_BASE_URL}/${currentItem.key}`, {
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

      // Refetch data to update the table
      await fetchGallery();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Delete Error:", err);
      setError(`Deletion failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Render Logic ---
  const renderFormContent = () => (
    <form onSubmit={handleSave} className="space-y-4">
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
      {/* Image Details */}
      <fieldset className="border p-3 rounded-lg space-y-3">
        <legend className="text-sm font-semibold text-gray-700 px-1">
          Image Details
        </legend>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL (src)
          </label>
          <input
            type="url"
            value={currentItem?.src || ""}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                src: e.target.value,
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
            value={currentItem?.alt || ""}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                alt: e.target.value,
              })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>
        {/* public_id is required by the model but typically managed server-side during image upload. We allow editing it here for full CRUD control */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Public ID
          </label>
          <input
            type="text"
            value={currentItem?.public_id || ""}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                public_id: e.target.value,
              })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>
      </fieldset>
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

  let content;
  if (isLoading) {
    content = <div className="text-center p-8">Loading gallery...</div>;
  } else if (error) {
    content = (
      <div className="text-center p-8 text-red-500">Error: {error}</div>
    );
  } else if (gallery.length === 0) {
    content = (
      <div className="text-center p-8 text-gray-500">
        No gallery found for this page.
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((asset) => (
          <div
            key={asset._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={asset.src}
              alt={asset.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">{asset.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>description:</strong> {asset.description}
              </p>
              {/* <p className="text-xs text-gray-500 mt-2 break-all">
                <strong>Public ID:</strong> {asset.public_id}
              </p> */}
              <button
                onClick={() => openEditModal(asset)}
                className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                aria-label={`Edit ${asset.name}`}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Image
              </button>
              {/* <button
                onClick={() => openEditModal(asset)}
                className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded-full hover:bg-indigo-100"
                aria-label={`Edit ${asset.name}`}
              >
                <Edit size={18} />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg h-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Gallery Management
        </h1>
        <button
          // onClick={openCreateModal}
          className="p-24 my-8 w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New Item
        </button>
        {/* Page Selector */}
        {/* <div className="mb-6 max-w-sm">
          <label
            htmlFor="page-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Page
          </label>
          <select
            id="page-select"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </option>
            ))}
          </select>
        </div> */}

        {/* Asset List */}
        {content}
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

      {/* Edit Modal */}
    </>
  );
};

export default GalleryManagerComponent;
