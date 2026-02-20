import React, { useState, useEffect } from "react";
import API from "../api/axios";

function FilterBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔥 Fetch city suggestions (debounced)
  useEffect(() => {
    if (!city) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await API.get(`/api/vehicles/cities?prefix=${city}`);
        setSuggestions(res.data);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [city]);

  // 🔥 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-6 justify-center">

      {/* 🔥 CITY INPUT WITH AUTOCOMPLETE */}
      <div className="relative">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="
            px-4 py-2 rounded-xl
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
          "
        />

        {showDropdown && suggestions.length > 0 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              absolute z-50 w-full mt-1
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-xl shadow-lg
              max-h-48 overflow-y-auto
            "
          >
            {suggestions.map((s, index) => (
              <div
                key={index}
                onClick={() => {
                  setCity(s);
                  setShowDropdown(false);
                }}
                className="
                  px-4 py-2 cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  text-sm
                "
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fuel Type */}
      <select
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        className="px-4 py-2 rounded-xl border bg-white dark:bg-gray-800 dark:text-white"
      >
        <option value="">All Fuel</option>
        <option value="PETROL">Petrol</option>
        <option value="DIESEL">Diesel</option>
        <option value="ELECTRIC">Electric</option>
        <option value="HYBRID">Hybrid</option>
      </select>

      {/* Min Price */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="px-4 py-2 rounded-xl border bg-white dark:bg-gray-800 dark:text-white"
      />

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="px-4 py-2 rounded-xl border bg-white dark:bg-gray-800 dark:text-white"
      />

      {/* 🔥 SEARCH BUTTON */}
      <button
        onClick={() => onSearch(city, fuelType, minPrice, maxPrice)}
        className="
          px-6 py-2 rounded-xl
          bg-gray-900 text-white
          hover:bg-black
          dark:bg-white dark:text-black
          dark:hover:bg-gray-200
          font-medium
          shadow-md hover:shadow-xl
          transition duration-200
        "
      >
        Search
      </button>
    </div>
  );
}

export default FilterBar;