import { useState } from "react";
import api from "../api/axios";


function BookingModal({ vehicle, onClose }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [monthly, setMonthly] = useState(false);

  const handleSubmit = async () => {
    await api.post("/api/bookings/request", {
      vehicleId: vehicle.id,
      buyerId: "80d47601-aced-490b-b8b1-48d25ab482b5", // temporary until auth
      fromDate,
      toDate,
      monthlyBooking: monthly
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-96 space-y-4">

        <h3 className="text-lg font-semibold">
          Book {vehicle.title}
        </h3>

        <input
          type="date"
          className="w-full border rounded-xl p-3 dark:bg-gray-700"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded-xl p-3 dark:bg-gray-700"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={monthly}
            onChange={() => setMonthly(!monthly)}
          />
          Monthly Booking
        </label>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-primary text-white py-2 rounded-xl"
          >
            Request Booking
          </button>

          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-2"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default BookingModal;
