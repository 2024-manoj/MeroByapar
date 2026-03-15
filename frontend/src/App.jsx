import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import CashierDashboard from "./pages/CashierDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Purchase from "./pages/Purchase";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/cashier" element={<CashierDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/purchase" element={<Purchase />} />
    
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;