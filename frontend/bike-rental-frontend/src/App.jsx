import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddListing from "./pages/AddListing";
import Navbar from "./components/Navbar";
import MyListings from "./pages/MyListings";

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/my-listings" element={<MyListings />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}


export default App;
