import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getUnreadCount,
  getNotifications,
  markAsRead,
} from "../api/notificationApi";

function Navbar() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const { logout } = useAuth();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await getNotifications();
    setNotifications(res.data);
  };
  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);

      // Update notification locally
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );

      // Decrease unread count safely
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  const fetchCount = async () => {
    try {
      const res = await getUnreadCount();
      setCount(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCount();

    const interval = setInterval(() => {
      fetchCount();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <h2
          className="text-2xl font-semibold tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          🚗 Rentify
        </h2>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <button
            className="px-6 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            onClick={() => navigate("/")}
          >
            Find Vehicle
          </button>

          <button
            className="px-6 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            onClick={() => navigate("/add-listing")}
          >
            Add Listing
          </button>

          <button
            className="px-6 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            onClick={() => navigate("/my-listings")}
          >
            My Listings
          </button>
          <button onClick={() => navigate("/booking-requests")}>
            Requests
          </button>

          <button onClick={() => navigate("/my-bookings")}>My Bookings</button>

          {/* Dark Mode */}
          <button
            className="ml-6 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:scale-105 transition"
            onClick={() => setDark(!dark)}
          >
            {dark ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => {
              setOpen(!open);
              fetchNotifications();
              if (!open) {
                setCount(0);
              }
            }}
            className="relative px-4"
          >
            🔔
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 z-50">
          <h3 className="font-semibold mb-3">Notifications</h3>

          {notifications.length === 0 && (
            <p className="text-sm text-gray-500">No notifications</p>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-2 rounded-lg mb-2 ${
                n.read
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-blue-50 dark:bg-blue-900"
              }`}
            >
              <p className="text-sm">{n.message}</p>

              {!n.read && (
                <button
                  onClick={() => handleMarkAsRead(n.id)}
                  className="text-xs text-blue-600 mt-1 hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
