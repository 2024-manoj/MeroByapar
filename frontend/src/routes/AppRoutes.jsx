import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Features from "../pages/Features";
import AdminDashboard from "../pages/AdminDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import CashierDashboard from "../pages/CashierDashboard";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      <Route path="/cashier/dashboard" element={<CashierDashboard />} />

    </Routes>
  );
}

export default AppRoutes;