import React, { useState, useEffect } from "react";
import {
  BarChart2,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Upload,
  Loader2,
  Image,
} from "lucide-react";
import { toast } from "react-toastify";

// List of pages from your model's enum
const pageOptions = [
  "home",
  "about",
  "gallery",
  "itemmenu",
  "contact",
  "global",
];

const AssetManagerComponent = () => {
  const [assets, setAssets] = useState([]);
  const [selectedPage, setSelectedPage] = useState("home"); // Default to 'home'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [formData, setFormData] = useState({ src: "", public_id: "", alt: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [message, setMessage] = useState({ type: "", content: "" });
  const [fileUploaded, setFileUploaded] = useState(false);

  // Fetch assets when the selectedPage changes
  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("adminToken"); // Get auth token
        const response = await fetch(
          `https://dini-paradise-backend-akz8.onrender.com/api/site-assets/page/${selectedPage}`,
          {
            headers: {
              // Add authorization if your route is protected
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch assets.");
        }
        const data = await response.json();
        setAssets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, [selectedPage]);

  // --- Modal and Form Handlers ---

  const handleEditClick = (asset) => {
    setEditingAsset(asset);
    setFormData({
      src: asset.src,
      public_id: asset.public_id,
      alt: asset.alt,
    });
    setIsModalOpen(true);
    setMessage({ type: "", content: "" }); // Clear previous messages
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAsset(null);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        setEditingAsset({
          ...editingAsset,
          src: uploadedImage.url,
          public_id: uploadedImage.public_id, // <-- CAPTURE THIS
        });
        console.log(uploadedImage.url);
        console.log("curent", currentItem.src);

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
    setEditingAsset({
      ...editingAsset,
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

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `https://dini-paradise-backend-akz8.onrender.com/api/site-assets/${editingAsset.key}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingAsset),
        }
      );

      const updatedAsset = await response.json();

      if (!response.ok) {
        throw new Error(updatedAsset.msg || "Failed to save asset.");
      }

      toast.success(`Image ${editingAsset.key} successfully updated!`);

      // Update the asset in the local state for instant feedback
      setAssets(
        assets.map((asset) =>
          asset.key === updatedAsset.key ? updatedAsset : asset
        )
      );
      setMessage({
        type: "success",
        content: "Asset updated successfully!",
      });

      // Close modal after a short delay
      setTimeout(() => {
        handleModalClose();
      }, 1500);
    } catch (err) {
      setMessage({ type: "error", content: err.message });
      toast.error(`Failed to Update Image: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // --- Render Logic ---

  let content;
  if (isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center py-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="mt-2 text-sm font-semibold text-gray-700">
          Loading Page Assets
        </span>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center p-8 text-red-500">Error: {error}</div>
    );
  } else if (assets.length === 0) {
    content = (
      <div className="text-center p-8 text-gray-500">
        No assets found for this page.
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={asset.src}
              alt={asset.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-800">{asset.key}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Alt:</strong> {asset.alt}
              </p>
              <p className="text-xs text-gray-500 mt-2 break-all">
                <strong>Public ID:</strong> {asset.public_id}
              </p>
              <div className="flex justify-end pt-4 space-x-3 mt-auto">
                <button
                  onClick={() => handleEditClick(asset)}
                  className=" flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Asset
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Site Asset Management
        </h1>

        {/* Page Selector */}
        <div className="mb-6 max-w-sm">
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
        </div>

        {/* Asset List */}
        {content}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm overflow-y-auto"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6 transform transition-all duration-300 scale-100 max-h-screen overflow-y-auto my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                Edit Asset: {editingAsset?.key}
              </h2>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form
              onSubmit={handleSave}
              className="space-y-4 py-4 max-h-[80vh] overflow-y-auto"
            >
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
                            <span className="font-medium">
                              Click or drag to upload
                            </span>
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
                        {editingAsset?.src ? (
                          <>
                            <img
                              src={editingAsset.src}
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
                            {editingAsset?.src}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Image Public ID (from upload)
                          </label>
                          <p className="mt-1 p-2 block w-full text-sm text-gray-600 bg-gray-100 rounded-md border border-gray-300 break-words">
                            {editingAsset?.public_id}
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
                            value={editingAsset?.src || ""}
                            onChange={(e) => {
                              setEditingAsset({
                                ...editingAsset,
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
                            value={editingAsset?.public_id || ""}
                            onChange={(e) => {
                              setEditingAsset({
                                ...editingAsset,
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
              {/* <div>
                <label
                  htmlFor="src"
                  className="block text-sm font-medium text-gray-700"
                >
                  Source (URL)
                </label>
                <input
                  type="text"
                  name="src"
                  id="src"
                  value={formData.src}
                  onChange={handleFormChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="public_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Public ID
                </label>
                <input
                  type="text"
                  name="public_id"
                  id="public_id"
                  value={formData.public_id}
                  onChange={handleFormChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="alt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alt Text
                </label>
                <input
                  type="text"
                  name="alt"
                  id="alt"
                  value={formData.alt}
                  onChange={handleFormChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div> */}

              {/* Message Area */}
              {message.content && (
                <div
                  className={`flex items-center p-3 rounded-md ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 mr-2" />
                  )}
                  {message.content}
                </div>
              )}

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
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetManagerComponent;
