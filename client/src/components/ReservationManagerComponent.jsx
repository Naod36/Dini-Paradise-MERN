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
} from "lucide-react";

const API_BASE_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/reservations";

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

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading reservations...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Reservation Management
      </h1>

      {reservations.length === 0 ? (
        <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
          <h2 className="text-xl font-semibold">No Reservations Yet</h2>
          <p>New reservations will appear here automatically.</p>
        </div>
      ) : (
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
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        Confirm
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReservationManagerComponent;
