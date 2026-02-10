import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import BikeCard from "../components/BikeCard";
import { searchVehicles } from "../services/api";

function Home() {
  const [bikes, setBikes] = useState([]);

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
      <FilterBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bikes.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px"
  }
};

export default Home;
