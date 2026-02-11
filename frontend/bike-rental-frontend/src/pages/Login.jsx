import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow w-96 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          F
          className="w-full border p-3 rounded-xl bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
        />

        <button className="w-full bg-black text-white py-3 rounded-xl">
          Login
        </button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-black dark:text-white font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
