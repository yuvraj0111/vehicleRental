import api from "../api/axios";
export const searchVehicles = (city, fuelType, minPrice, maxPrice) => {
  let url = `/api/vehicles/search?city=${city}`;

  if (fuelType) url += `&fuelType=${fuelType}`;
  if (minPrice) url += `&minPrice=${minPrice}`;
  if (maxPrice) url += `&maxPrice=${maxPrice}`;

  return api.get(url);
};

export const updateAvailability = (vehicleId, available) => {
  return API.put(`/vehicles/${vehicleId}/availability?available=${available}`);
};