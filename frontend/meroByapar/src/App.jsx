import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/users" element={<Users />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;