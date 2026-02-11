import { useEffect, useState } from "react";
import api from "../api/axios";



function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get(
        `/api/bookings/my-bookings`
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-2xl font-semibold">My Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings yet.</p>
      )}

      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex justify-between items-center"
        >
          <div className="space-y-2">
            <p className="font-semibold text-lg">
              {b.vehicle.title}
            </p>

            <p className="text-sm text-gray-500">
              {b.fromDate} → {b.toDate}
            </p>

            <p className="text-sm">
              ₹{b.totalPrice}
            </p>
          </div>

          {/* Status Badge */}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              b.status === "APPROVED"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : b.status === "REJECTED"
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
          >
            {b.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;