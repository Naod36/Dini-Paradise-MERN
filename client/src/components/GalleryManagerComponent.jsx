import React, { useState, useEffect } from "react";
import {
  BarChart2,
  Edit,
  Save,
  Trash2,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
  Upload,
  Loader2,
  Image,
} from "lucide-react";
import { toast } from "react-toastify";

// List of pages from your model's enum
 const API_BASE_URL =
   "https://dini-paradise-backend-akz8.onrender.com/api/images";
// const API_BASE_URL = "http://localhost:5000/api/images";

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
  const [fileUploaded, setFileUploaded] = useState(false);

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
    setMessage({ type: "", content: "" }); // Clear previous messages
  };

  const openEditModal = (asset) => {
    setCurrentItem(asset);
    setModalMode("edit");
    setIsModalOpen(true);
    setMessage({ type: "", content: "" }); // Clear previous messages
  };
  const openDeleteModal = (asset) => {
    setCurrentItem(asset);
    setModalMode("delete");
    setIsModalOpen(true);
    setMessage({ type: "", content: "" }); // Clear previous messages
  };

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

  // --- 1. Update your handleFileUpload ---
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
          ...currentItem,
          src: uploadedImage.url,
          public_id: uploadedImage.public_id, // <-- CAPTURE THIS
        });
        setFileUploaded(true); // <-- SET UPLOAD FLAG
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
      ...currentItem,
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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", content: "" });
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
      const successMessage =
        modalMode === "create"
          ? `Item "${currentItem.name}" successfully created!`
          : `Item "${currentItem.name}" successfully updated!`;

      toast.success(successMessage);
      setMessage({
        type: "success",
        content: "Gallery Item updated successfully!",
      });

      // Refetch data to update the table
      await fetchGallery();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Form Submit Error:", err);
      // Display the detailed error message caught above
      setMessage({ type: "error", content: err.message });

      setError(`Operation failed: ${err.message}`);
      toast.error(`Failed to save item: ${err.message}`);
    } finally {
      setIsSaving(false);
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
      toast.success(`Item "${currentItem.name}" successfully deleted!`);
      // Refetch data to update the table
      await fetchGallery();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Delete Error:", err);
      setError(`Deletion failed: ${err.message}`);
      toast.error(`Failed to delete item: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Render Logic ---
  const renderFormContent = () => (
    <form onSubmit={handleSave} className="space-y-4">
      {/* Key (ONLY for 'create' mode) */}
      {modalMode === "create" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unique Key
          </label>
          <input
            type="text"
            value={currentItem?.key || ""}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, key: e.target.value })
            }
            required
            placeholder="e.g., gallery_img_1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
          <p className="mt-1 text-xs text-gray-500">
            This unique ID cannot be changed later.
          </p>
        </div>
      )}
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
      <fieldset className="border p-4 rounded-lg space-y-4">
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
                {currentItem?.src ? (
                  <>
                    <img
                      src={currentItem.src}
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
                    {currentItem?.src}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image Public ID (from upload)
                  </label>
                  <p className="mt-1 p-2 block w-full text-sm text-gray-600 bg-gray-100 rounded-md border border-gray-300 break-words">
                    {currentItem?.public_id}
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
                    value={currentItem?.src || ""}
                    onChange={(e) => {
                      setCurrentItem({
                        ...currentItem,
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
                    value={currentItem?.public_id || ""}
                    onChange={(e) => {
                      setCurrentItem({
                        ...currentItem,
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
      </fieldset>
      {/* Message Area */}

      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={handleModalClose}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isSaving ? (
            "Saving..."
          ) : modalMode === "create" ? (
            "Create Item"
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderDeleteContent = () => (
    <div className="space-y-4">
      <p className="text-lg text-gray-700">
        Are you sure you want to delete the item:
        <br />{" "}
        <span className="font-semibold text-indigo-600">
          {currentItem?.name}
        </span>
        ?
      </p>
      <p className="text-sm text-gray-500">This action cannot be undone.</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteItem}
          disabled={isSaving}
          className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
        >
          {isSaving ? (
            "Deleting..."
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" /> Confirm Delete
            </>
          )}
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
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={asset.src}
              alt={asset.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow ">
              <h3 className="font-bold text-lg text-gray-800">{asset.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>description:</strong> {asset.description}
              </p>

              <div className="flex justify-end pt-4 mt-auto space-x-3">
                <button
                  onClick={() => openEditModal(asset)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  aria-label={`Edit ${asset.name}`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(asset)}
                  className="text-red-600 hover:text-red-900 transition-colors p-1 rounded-md hover:bg-red-100"
                  aria-label={`Delete ${asset.name}`}
                >
                  <Trash2 className="w- h-6 " />
                </button>
              </div>
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
          onClick={openCreateModal}
          className="p-24 my-8 w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New Item
        </button>

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
