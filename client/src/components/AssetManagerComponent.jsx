import React, { useState, useEffect } from "react";
import {
  BarChart2,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
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
  const [message, setMessage] = useState({ type: "", content: "" });

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
          body: JSON.stringify(formData),
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
    content = <div className="text-center p-8">Loading assets...</div>;
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
      <div className="p-4 md:p-6 bg-gray-50 h-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center p-4 border-b">
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
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
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
              </div>

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
