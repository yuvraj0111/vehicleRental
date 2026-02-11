import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Signup() {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await signup(name, email, password);
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow w-96 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded-xl dark:bg-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl dark:bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl dark:bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
          Create Account
        </button>
      </form>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

export default Signup;
