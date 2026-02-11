import { useState } from "react";
import api from "../api/axios";

function AddListing() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fuelType: "",
    type: "",
    engineCc: "",
    city: "",
    pricePerDay: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/vehicles", {
        ...form,
        pricePerDay: Number(form.pricePerDay),
        engineCc: form.engineCc ? Number(form.engineCc) : null,
      });

      alert("Vehicle added successfully!");
      // Clear form
      setForm({
        title: "",
        description: "",
        fuelType: "",
        type: "",
        engineCc: "",
        city: "",
        pricePerDay: ""
          });
    } catch (err) {
      console.error(err);
      alert("Error adding vehicle");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Vehicle</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          className="w-full border border-gray-300 
             bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="w-full border border-gray-300 
             bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Description"
          onChange={handleChange}
        />

        <select
          name="type"
          onChange={handleChange}
          className="w-full border bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             p-3 rounded-xl"
          required
        >
          <option value="">Select Type</option>
          <option value="BIKE">Bike</option>
          <option value="CAR">Car</option>
        </select>

        <select
          name="fuelType"
          onChange={handleChange}
          className="w-full border bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             p-3 rounded-xl"
          required
        >
          <option value="">Select Fuel</option>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
          <option value="ELECTRIC">Electric</option>
          <option value="HYBRID">Hybrid</option>
        </select>

        <input
          name="engineCc"
          type="number"
          placeholder="Engine CC"
          className="w-full border border-gray-300 
             bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          className="w-full border border-gray-300 
             bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleChange}
          required
        />

        <input
          name="pricePerDay"
          type="number"
          placeholder="Price Per Day"
          className="w-full border border-gray-300 
             bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleChange}
          required
        />

        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "auto",
  },
};

export default AddListing;
