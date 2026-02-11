
function BikeCard({ bike, onBook }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">

      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>

      <div className="p-5">
        <h3 className="font-semibold text-lg">{bike.title}</h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {bike.type} • {bike.fuelType}
        </p>

        <p className="mt-4 font-semibold text-lg">
          ₹{bike.pricePerDay}
          <span className="text-sm text-gray-500 font-normal"> / day</span>
        </p>
        <button
          className="mt-4 w-full bg-primary text-white py-2 rounded-xl hover:opacity-90 transition"
          onClick={() => onBook(bike)}
        >
          Request Booking
        </button>

      </div>
    </div>
  );
}



const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    width: "250px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  }
};

export default BikeCard;
