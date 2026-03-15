import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      alert(res.data.message || "Login successful!");
      // optionally save token, redirect, etc.
      // localStorage.setItem("token", res.data.token);
      // navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 transition-all duration-300">

      <ThemeToggle />

      {/* Login Box */}
      <div className="w-96 p-8 rounded-xl shadow-lg transition-all duration-300
        bg-black text-white 
        dark:bg-white dark:text-black">

        <h2 className="text-3xl font-bold mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 text-black outline-none"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 text-black outline-none"
            required
          />

          <div className="flex justify-between text-sm">

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>

            <span className="cursor-pointer opacity-70 hover:opacity-100">
              Forgot password?
            </span>

          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-gray-800 text-white dark:bg-black dark:text-white hover:opacity-90"
          >
            Login Now
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Signup now
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;