import { Link } from "react-router-dom";
import ThemeToggle from "../components/Common/ThemeToggle";
import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode on component mount
  useEffect(() => {
    // Check if dark class exists on html element
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Initial check
    checkDarkMode();

    // Create an observer to watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      alert(res.data.message || "Login successful!");
      
      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }
      
      // Redirect to dashboard or home
      // navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Inline styles with dark mode support
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#111827' : '#f3f4f6', // Dynamic based on dark mode
      transition: 'all 0.3s',
      position: 'relative',
    },
    themeTogglePosition: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 10,
    },
    card: {
      width: '384px',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: isDark ? '0 10px 25px rgba(0, 0, 0, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      backgroundColor: isDark ? '#111827' : 'white',
      color: isDark ? 'white' : '#111827',
      animation: 'fadeIn 0.5s ease-out',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '24px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '16px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      color: isDark ? 'white' : '#111827',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
    },
    options: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      fontSize: '0.9rem',
    },
    rememberMe: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    checkbox: {
      width: '16px',
      height: '16px',
      cursor: 'pointer',
      accentColor: isDark ? '#60a5fa' : '#3b82f6', // Changes with theme
    },
    forgotPassword: {
      color: isDark ? '#60a5fa' : '#3b82f6',
      textDecoration: 'underline',
      opacity: 0.8,
      transition: 'opacity 0.3s',
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: isDark ? 'white' : '#1f2937',
      color: isDark ? '#111827' : 'white',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.7 : 1,
      transition: 'all 0.3s',
      marginBottom: '16px',
    },
    signupText: {
      textAlign: 'center',
      fontSize: '0.9rem',
      marginTop: '16px',
    },
    signupLink: {
      color: isDark ? '#60a5fa' : '#3b82f6',
      textDecoration: 'underline',
      fontWeight: '600',
      marginLeft: '5px',
    },
    errorMessage: {
      backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
      border: isDark ? '1px solid #f87171' : '1px solid #ef4444',
      color: isDark ? '#f87171' : '#ef4444',
      padding: '10px',
      borderRadius: '6px',
      marginBottom: '16px',
      textAlign: 'center',
    },
  };

  // Add keyframes for animation
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Theme Toggle */}
      <div style={styles.themeTogglePosition}>
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        {/* Error Message */}
        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Options Row */}
          <div style={styles.options}>
            <label style={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" style={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                if (isDark) {
                  e.target.style.backgroundColor = '#f3f4f6'; // Dark mode hover
                } else {
                  e.target.style.backgroundColor = '#374151'; // Light mode hover
                }
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = isDark ? 'white' : '#1f2937';
                e.target.style.transform = 'none';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login Now'}
          </button>

          {/* Signup Link */}
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