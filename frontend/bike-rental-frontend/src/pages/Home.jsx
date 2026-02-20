import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import BikeCard from "../components/BikeCard";
import { searchVehicles } from "../services/api";
import BookingModal from "../components/BookingModal";

function Home() {
  const [bikes, setBikes] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSearch = async (city, fuelType, minPrice, maxPrice) => {
    try {
      const res = await searchVehicles(city, fuelType, minPrice, maxPrice);
      setBikes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* 🔥 FilterBar will now include autocomplete */}
      <FilterBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bikes.map((bike) => (
          <BikeCard
            key={bike.id}
            bike={bike}
            onBook={setSelectedVehicle}
          />
        ))}

        {selectedVehicle && (
          <BookingModal
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </div>
    </>
  );
}

export default Home;