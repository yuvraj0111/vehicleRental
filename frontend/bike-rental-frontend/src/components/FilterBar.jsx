import { useState } from "react";

function FilterBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    if (city) {
      onSearch(city, fuelType, minPrice, maxPrice);
    }
  };

  return (
<div className="mt-10 mb-8">

      <input
        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <select
        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition"
        onChange={(e) => setFuelType(e.target.value)}
      >
        <option value="">All Fuel</option>
        <option value="PETROL">Petrol</option>
        <option value="DIESEL">Diesel</option>
        <option value="ELECTRIC">Electric</option>
        <option value="HYBRID">Hybrid</option>
      </select>

      <input
        type="number"
        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition"
        placeholder="Min ₹"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition"

        placeholder="Max ₹"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition font-medium"
      >
        Search
      </button>
    </div>
  );
}


export default FilterBar;
