import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const searchVehicles = (city, fuelType, minPrice, maxPrice) => {
  let url = `/vehicles/search?city=${city}`;

  if (fuelType) url += `&fuelType=${fuelType}`;
  if (minPrice) url += `&minPrice=${minPrice}`;
  if (maxPrice) url += `&maxPrice=${maxPrice}`;

  return API.get(url);
};
