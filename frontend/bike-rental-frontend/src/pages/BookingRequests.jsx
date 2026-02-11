import { useEffect, useState } from "react";
import api from "../api/axios";


function SellerRequests() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get(
        `/api/bookings/seller-requests`
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const approveBooking = async (id) => {
    try {
      await api.put(`/api/bookings/${id}/approve`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectBooking = async (id) => {
    try {
      await api.put(`/api/bookings/${id}/reject`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-2xl font-semibold">
        Booking Requests
      </h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">
          No booking requests yet.
        </p>
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
              Buyer: {b.buyer.name}
            </p>

            <p className="text-sm text-gray-500">
              {b.fromDate} → {b.toDate}
            </p>

            <p className="font-medium">
              ₹{b.totalPrice}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">

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

            {b.status === "PENDING" && (
              <div className="flex gap-3">
                <button
                  onClick={() => approveBooking(b.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectBooking(b.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SellerRequests;
