import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import axios from "axios";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("You must accept the terms & conditions!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert(res.data.message || "Registration successful!");
      // optionally redirect to login page
      // navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 transition-all duration-300">

      <ThemeToggle />

      {/* Register Box */}
      <div className="w-96 p-8 rounded-xl shadow-lg transition-all duration-300
        bg-black text-white 
        dark:bg-white dark:text-black">

        <h2 className="text-3xl font-bold mb-6">
          Registration
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 text-black outline-none"
            required
          />

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
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 text-black outline-none"
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 text-black outline-none"
            required
          />

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            I accept terms & conditions
          </label>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-gray-800 text-white dark:bg-black dark:text-white hover:opacity-90"
          >
            Register Now
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login now
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;