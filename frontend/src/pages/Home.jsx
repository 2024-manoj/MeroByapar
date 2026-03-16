import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all duration-300">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 shadow-md bg-white dark:bg-black">

        <h1 className="text-2xl font-bold">
          MeroByapar
        </h1>

        <div className="flex items-center gap-6">

          <Link
            to="/login"
            className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-white dark:text-black"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded border border-gray-800 dark:border-white"
          >
            Register
          </Link>

          <ThemeToggle />

        </div>

      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-32 px-6">

        <h2 className="text-5xl font-bold mb-6">
          Business Management Made Simple
        </h2>

        <p className="text-lg max-w-xl mb-10 opacity-80">
          MeroByapar helps you manage products, inventory, sales,
          and users in one simple system. Perfect for stores,
          businesses, and retail management.
        </p>

        <div className="flex gap-6">

          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-gray-800 text-white dark:bg-white dark:text-black"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-gray-800 dark:border-white"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;