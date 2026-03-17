import { FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">

      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-6">

        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border rounded outline-none"
        />

        <div className="relative">
          <FaBell />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-1 rounded-full">
            5
          </span>
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://ui-avatars.com/api/?name=Admin"
            className="w-8 h-8 rounded-full"
          />
          <span>Admin</span>
        </div>

      </div>
    </div>
  );
}

export default Navbar;