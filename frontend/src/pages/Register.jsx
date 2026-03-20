import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/Common/ThemeToggle";
import { useState, useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!termsAccepted) {
      setError("You must accept the terms & conditions!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    try {
      // fixed: removed axios, fixed URL from /api/auth/register to /api/register
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Registration failed!");
        return;
      }

      alert("Registered successfully! Please login.");
      navigate("/login");

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
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      fontSize: "0.9rem",
      cursor: "pointer",
      gap: "8px",
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
    loginText: {
      textAlign: "center",
      fontSize: "0.9rem",
      marginTop: "16px",
    },
    loginLink: {
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
    passwordHint: {
      fontSize: "0.8rem",
      marginTop: "4px",
      opacity: 0.7,
      color: isDark ? "#9ca3af" : "#6b7280",
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
        <h2 style={styles.title}>Create Account</h2>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>

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
              placeholder="Create password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
            <div style={styles.passwordHint}>Use at least 6 characters</div>
          </div>

          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                ...styles.input,
                borderColor:
                  password && confirmPassword && password !== confirmPassword
                    ? isDark ? "#f87171" : "#ef4444"
                    : isDark ? "#4b5563" : "#d1d5db",
              }}
              required
              disabled={loading}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>

          <label style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              disabled={loading}
            />
            <span>I accept the terms & conditions</span>
          </label>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Register Now"}
          </button>

          <p style={styles.loginText}>
            Already have an account?
            <Link to="/login" style={styles.loginLink}>
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
