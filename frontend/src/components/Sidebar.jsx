import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-xl font-bold mb-6">MeroByapar</h1>

      <ul className="space-y-4">

        <li>
          <Link to="/admin">Admin Dashboard</Link>
        </li>

        <li>
          <Link to="/manager">Manager Dashboard</Link>
        </li>

        <li>
          <Link to="/cashier">Cashier Dashboard</Link>
        </li>

        <li>
          <Link to="/login">Logout</Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;