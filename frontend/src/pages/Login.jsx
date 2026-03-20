import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/Common/ThemeToggle";
import { useState, useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // fixed: removed axios, fixed URL from /api/auth/login to /api/login
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Login failed!");
        return;
      }

      // Save token and user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      const role = data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "manager") navigate("/manager/dashboard");
      else if (role === "cashier") navigate("/cashier/dashboard");
      else navigate("/");

    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#111827" : "#f3f4f6",
      transition: "all 0.3s",
      position: "relative",
    },
    themeTogglePosition: {
      position: "absolute",
      top: "20px",
      right: "20px",
      zIndex: 10,
    },
    card: {
      width: "384px",
      padding: "32px",
      borderRadius: "12px",
      boxShadow: isDark
        ? "0 10px 25px rgba(0,0,0,0.3)"
        : "0 10px 25px rgba(0,0,0,0.1)",
      backgroundColor: isDark ? "#111827" : "white",
      color: isDark ? "white" : "#111827",
      animation: "fadeIn 0.5s ease-out",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "24px",
      textAlign: "center",
    },
    formGroup: { marginBottom: "16px" },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: isDark ? "1px solid #4b5563" : "1px solid #d1d5db",
      backgroundColor: isDark ? "#374151" : "#f9fafb",
      color: isDark ? "white" : "#111827",
      fontSize: "1rem",
      outline: "none",
      transition: "all 0.3s",
      boxSizing: "border-box",
    },
    options: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      fontSize: "0.9rem",
    },
    rememberMe: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    forgotPassword: {
      color: isDark ? "#60a5fa" : "#3b82f6",
      textDecoration: "underline",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: isDark ? "white" : "#1f2937",
      color: isDark ? "#111827" : "white",
      fontSize: "1rem",
      fontWeight: "600",
      border: "none",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
      transition: "all 0.3s",
      marginBottom: "16px",
    },
    signupText: {
      textAlign: "center",
      fontSize: "0.9rem",
      marginTop: "16px",
    },
    signupLink: {
      color: isDark ? "#60a5fa" : "#3b82f6",
      textDecoration: "underline",
      fontWeight: "600",
      marginLeft: "5px",
    },
    errorMessage: {
      backgroundColor: isDark
        ? "rgba(239,68,68,0.2)"
        : "rgba(239,68,68,0.1)",
      border: isDark ? "1px solid #f87171" : "1px solid #ef4444",
      color: isDark ? "#f87171" : "#ef4444",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "16px",
      textAlign: "center",
    },
  };

  const focusStyle = (e) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.3)";
  };
  const blurStyle = (e) => {
    e.target.style.borderColor = isDark ? "#4b5563" : "#d1d5db";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={styles.container}>
      <div style={styles.themeTogglePosition}>
        <ThemeToggle />
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>

          <div style={styles.options}>
            <label style={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" style={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login Now"}
          </button>

          <p style={styles.signupText}>
            Don't have an account?
            <Link to="/register" style={styles.signupLink}>
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
