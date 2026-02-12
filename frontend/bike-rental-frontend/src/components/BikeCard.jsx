function BikeCard({ bike, onBook }) {
  return (
    <div
          className="
        bg-white dark:bg-gray-800
        rounded-2xl overflow-hidden
        shadow-md
        dark:shadow-[0_8px_20px_rgba(0,0,0,0.6)]
        border border-gray-100 dark:border-gray-700
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      "
    >
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
          className="
          mt-4 w-full
          bg-gray-900 text-white
          hover:bg-black
          dark:bg-white dark:text-black
          dark:hover:bg-gray-200
          px-4 py-2 rounded-xl
          font-medium
          shadow-md hover:shadow-xl
          transition duration-200
        "

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
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
};

export default BikeCard;
