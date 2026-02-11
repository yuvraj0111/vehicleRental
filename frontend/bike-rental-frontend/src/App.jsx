import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddListing from "./pages/AddListing";
import Navbar from "./components/Navbar";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
import BookingRequests from "./pages/BookingRequests";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainApp() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {user && <Navbar />}

      <div className="max-w-7xl mx-auto px-6">
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-listing"
            element={
              <ProtectedRoute>
                <AddListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking-requests"
            element={
              <ProtectedRoute>
                <BookingRequests />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;
