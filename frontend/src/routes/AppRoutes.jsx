import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Common/ProtectedRoute";
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

      {/* Public pages — anyone can visit */}
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected — admin only */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected — manager only */}
      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute role="manager">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected — cashier only */}
      <Route
        path="/cashier/dashboard"
        element={
          <ProtectedRoute role="cashier">
            <CashierDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unauthorized page */}
      <Route
        path="/unauthorized"
        element={
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <h1 style={{ fontSize: "4rem", marginBottom: "16px" }}>403</h1>
            <h2 style={{ marginBottom: "12px" }}>Access Denied</h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              You don't have permission to view this page.
            </p>
            <a
              href="/login"
              style={{
                padding: "10px 24px",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Go to Login
            </a>
          </div>
        }
      />

      {/* 404 page */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <h1 style={{ fontSize: "4rem", marginBottom: "16px" }}>404</h1>
            <h2 style={{ marginBottom: "12px" }}>Page Not Found</h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              The page you're looking for doesn't exist.
            </p>
            <a
              href="/"
              style={{
                padding: "10px 24px",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Go Home
            </a>
          </div>
        }
      />

    </Routes>
  );
}

export default AppRoutes;
