import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <Link to="/">Category</Link>
      <Link to="/product">Product</Link>
      <Link to="/purchase">Purchase</Link>
      <Link to="/sale">Sale</Link>
      <Link to="/store">Store</Link>
      <Link to="/supplier">Supplier</Link>
      <Link to="/user">User</Link>
    </nav>
  );
}

export default Navbar;