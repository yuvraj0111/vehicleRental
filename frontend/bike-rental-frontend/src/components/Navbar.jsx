import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

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

      {/* Dark Mode */}
      <button
        className="ml-6 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:scale-105 transition"
        onClick={() => setDark(!dark)}
      >
        {dark ? "🌙" : "☀️"}
      </button>

    </div>

  </div>
</div>

  );
}

export default Navbar;
