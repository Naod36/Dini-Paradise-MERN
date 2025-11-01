import React, { useState, useEffect } from "react"; // 1. Add useEffect
import {
  Menu,
  BarChart2,
  Image,
  Utensils,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  // 2. Add new icons for the reservation list
  Clock,
  Users,
  Mail,
  Phone,
  Loader2,
  Sparkles,
} from "lucide-react";

const API_BASE_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/reservations";
// const API_BASE_URL = "http://localhost:5000/api/reservations";

// --- START: NEW ReservationManagerComponent ---
// 3. Replace the old placeholder with this functional component
const ReservationManagerComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch reservations.");
        }
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []); // Empty dependency array means this runs once when the component mounts
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      // Update local state instantly for better UX
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? data.reservation : r))
      );

      alert(`Reservation ${newStatus.toLowerCase()} successfully!`);
    } catch (err) {
      console.error(err);
      alert("Error updating reservation status.");
    }
  };
  let content;

  if (isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center py-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="mt-2 text-sm font-semibold text-gray-700">
          Loading Reservation
        </span>
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-8 text-center text-red-500">Error: {error}</div>
    );
  } else if (reservations.length === 0) {
    content = (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
        <h2 className="text-xl font-semibold">No Reservations Yet</h2>
        <p>New reservations will appear here automatically.</p>
      </div>
    );
  } else {
    content = (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((res) => (
                <tr key={res._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {res.fullName}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Mail className="w-3 h-3 mr-2" />
                      {res.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-2" />
                      {res.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {new Date(
                        res.reservationDate
                      ).toLocaleDateString()} at {res.reservationTime}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      {res.guests} Guests
                    </div>
                    <div className="text-sm text-red-500/55 flex items-center mt-1">
                      <Sparkles className="w-3 h-3 mr-2 text-gray-500" />
                      {res.requests}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        res.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : res.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleStatusUpdate(res._id, "Confirmed")}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(res._id, "Cancelled")}
                      className="text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg h-full overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Reservation Management
      </h1>
      {content}
    </div>
  );
};
export default ReservationManagerComponent;
