import { useEffect, useState } from "react";
import api from "../api/axios";


function MyListings() {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const fetchVehicles = async () => {
    const res = await api.get(
      `/api/vehicles/my-listings`
    );
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const deleteVehicle = async (id) => {
    await api.delete(`/api/vehicles/${id}`);
    fetchVehicles();
  };

  const handleEditChange = (e) => {
    setEditingVehicle({
      ...editingVehicle,
      [e.target.name]: e.target.value
    });
  };

  const saveEdit = async () => {
    await api.put(
      `/api/vehicles/${editingVehicle.id}`,
      {
        ...editingVehicle,
        pricePerDay: Number(editingVehicle.pricePerDay),
        engineCc: editingVehicle.engineCc
          ? Number(editingVehicle.engineCc)
          : null
      }
    );

    setEditingVehicle(null);
    fetchVehicles();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Listings</h2>

      {vehicles.map((v) => (
        <div key={v.id} style={styles.card}>
          <h3>{v.title}</h3>
          <p>{v.type} | {v.fuelType}</p>
          <p>₹{v.pricePerDay}</p>

          <button onClick={() => setEditingVehicle(v)}>Edit</button>
          <button onClick={() => deleteVehicle(v.id)}>Delete</button>
        </div>
      ))}

      {editingVehicle && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Edit Vehicle</h3>

            <input
              name="title"
              value={editingVehicle.title}
              onChange={handleEditChange}
              placeholder="Title"
            />

            <textarea
              name="description"
              value={editingVehicle.description || ""}
              onChange={handleEditChange}
              placeholder="Description"
            />

            <select
              name="type"
              value={editingVehicle.type}
              onChange={handleEditChange}
            >
              <option value="BIKE">Bike</option>
              <option value="CAR">Car</option>
            </select>

            <select
              name="fuelType"
              value={editingVehicle.fuelType}
              onChange={handleEditChange}
            >
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electric</option>
              <option value="HYBRID">Hybrid</option>
            </select>

            <input
              name="engineCc"
              type="number"
              value={editingVehicle.engineCc || ""}
              onChange={handleEditChange}
              placeholder="Engine CC"
            />

            <input
              name="city"
              value={editingVehicle.city}
              onChange={handleEditChange}
              placeholder="City"
            />

            <input
              name="pricePerDay"
              type="number"
              value={editingVehicle.pricePerDay}
              onChange={handleEditChange}
              placeholder="Price Per Day"
            />

            <div style={{ marginTop: "15px" }}>
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingVehicle(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default MyListings;
