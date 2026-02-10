import { useState } from "react";
import axios from "axios";

function AddListing() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fuelType: "",
    type: "",
    engineCc: "",
    city: "",
    pricePerDay: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/vehicles", {
        ...form,
        pricePerDay: Number(form.pricePerDay),
        engineCc: form.engineCc ? Number(form.engineCc) : null
      });

      alert("Vehicle added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding vehicle");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Vehicle</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />

        <select name="type" onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="BIKE">Bike</option>
          <option value="CAR">Car</option>
        </select>

        <select name="fuelType" onChange={handleChange} required>
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
          onChange={handleChange}
        />

        <input name="city" placeholder="City" onChange={handleChange} required />

        <input
          name="pricePerDay"
          type="number"
          placeholder="Price Per Day"
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
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "auto"
  }
};

export default AddListing;
