import { FaHome, FaBox, FaUsers, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-6">MeroByapar</h1>

      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center gap-2">
            <FaHome /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/products" className="flex items-center gap-2">
            <FaBox /> Products
          </Link>
        </li>

        <li>
          <Link to="/users" className="flex items-center gap-2">
            <FaUsers /> Users
          </Link>
        </li>

        <li>
          <Link to="/sales" className="flex items-center gap-2">
            <FaShoppingCart /> Sales
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;