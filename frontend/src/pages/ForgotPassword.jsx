import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ThemeToggle from "../components/Common/ThemeToggle";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode on component mount
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Step 1: Send reset code to email
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!email) {
      setError("Email is required!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - replace with actual API
      // const res = await axios.post(
      //   "http://localhost:5000/api/auth/forgot-password",
      //   { email }
      // );

      // Mock success for testing
      setTimeout(() => {
        setSuccess("Verification code sent to your email!");
        setStep(2);
        setResendTimer(60); // Start 60 second timer for resend
        setLoading(false);
      }, 1500);

      // Uncomment for actual API
      // setSuccess(res.data.message || "Verification code sent to your email!");
      // setStep(2);
      // setResendTimer(60);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send code. Please try again.");
      setLoading(false);
    }
  };

  // Resend code
  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setSuccess("New verification code sent!");
        setResendTimer(60);
        setLoading(false);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code.");
      setLoading(false);
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!code || code.length < 6) {
      setError("Please enter a valid 6-digit code!");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setSuccess("Code verified successfully!");
        setStep(3);
        setLoading(false);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code!");
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setSuccess("Password reset successful! Redirecting to login...");
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
        
        setLoading(false);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password!");
      setLoading(false);
    }
  };

  // Go back to previous step
  const goBack = () => {
    setError("");
    setSuccess("");
    setStep(step - 1);
  };

  // Inline styles with dark mode support
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#111827' : '#f3f4f6',
      transition: 'all 0.3s',
      position: 'relative',
      padding: '20px',
    },
    themeTogglePosition: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 10,
    },
    card: {
      width: '450px',
      maxWidth: '100%',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: isDark ? '0 10px 25px rgba(0, 0, 0, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      backgroundColor: isDark ? '#1f2937' : 'white',
      color: isDark ? 'white' : '#111827',
      animation: 'fadeIn 0.5s ease-out',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '8px',
      textAlign: 'center',
      color: isDark ? 'white' : '#111827',
    },
    subtitle: {
      fontSize: '0.95rem',
      textAlign: 'center',
      marginBottom: '32px',
      opacity: 0.7,
      color: isDark ? '#d1d5db' : '#4b5563',
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '32px',
      position: 'relative',
    },
    stepItem: {
      flex: 1,
      textAlign: 'center',
      position: 'relative',
    },
    stepCircle: (active, completed) => ({
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: completed 
        ? '#10b981' 
        : active 
          ? (isDark ? '#3b82f6' : '#2563eb')
          : (isDark ? '#4b5563' : '#e5e7eb'),
      color: completed || active ? 'white' : (isDark ? '#9ca3af' : '#6b7280'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 8px',
      fontWeight: 'bold',
      fontSize: '16px',
      transition: 'all 0.3s',
      border: active ? '2px solid ' + (isDark ? '#93c5fd' : '#bfdbfe') : 'none',
    }),
    stepLabel: (active) => ({
      fontSize: '14px',
      fontWeight: active ? '600' : '400',
      color: active 
        ? (isDark ? '#93c5fd' : '#2563eb')
        : (isDark ? '#9ca3af' : '#6b7280'),
    }),
    stepLine: {
      position: 'absolute',
      top: '20px',
      left: 'calc(50% + 20px)',
      right: 'calc(50% + 20px)',
      height: '2px',
      backgroundColor: isDark ? '#4b5563' : '#e5e7eb',
      zIndex: 0,
    },
    formGroup: {
      marginBottom: '24px',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '10px',
      border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      color: isDark ? 'white' : '#111827',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: isDark ? '#60a5fa' : '#2563eb',
      boxShadow: isDark ? '0 0 0 3px rgba(96, 165, 250, 0.3)' : '0 0 0 3px rgba(37, 99, 235, 0.2)',
    },
    codeInput: {
      textAlign: 'center',
      fontSize: '1.8rem',
      letterSpacing: '12px',
      fontFamily: 'monospace',
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '10px',
      backgroundColor: isDark ? '#2563eb' : '#1f2937',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.7 : 1,
      transition: 'all 0.3s',
      marginBottom: '12px',
    },
    secondaryButton: {
      width: '100%',
      padding: '14px',
      borderRadius: '10px',
      backgroundColor: 'transparent',
      color: isDark ? '#60a5fa' : '#4b5563',
      fontSize: '1rem',
      fontWeight: '500',
      border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s',
      marginBottom: '12px',
    },
    backLink: {
      textAlign: 'center',
      fontSize: '0.95rem',
      marginTop: '16px',
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    loginLink: {
      color: isDark ? '#60a5fa' : '#2563eb',
      textDecoration: 'underline',
      fontWeight: '600',
      marginLeft: '8px',
      cursor: 'pointer',
    },
    errorMessage: {
      backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(254, 226, 226, 0.5)',
      border: isDark ? '1px solid #ef4444' : '1px solid #f87171',
      color: isDark ? '#fca5a5' : '#b91c1c',
      padding: '14px',
      borderRadius: '10px',
      marginBottom: '24px',
      textAlign: 'center',
      fontSize: '0.95rem',
      fontWeight: '500',
    },
    successMessage: {
      backgroundColor: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(220, 252, 231, 0.5)',
      border: isDark ? '1px solid #22c55e' : '1px solid #4ade80',
      color: isDark ? '#86efac' : '#166534',
      padding: '14px',
      borderRadius: '10px',
      marginBottom: '24px',
      textAlign: 'center',
      fontSize: '0.95rem',
      fontWeight: '500',
    },
    resendText: {
      textAlign: 'center',
      fontSize: '0.9rem',
      marginTop: '16px',
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    resendLink: {
      color: isDark ? '#60a5fa' : '#2563eb',
      cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
      fontWeight: '600',
      marginLeft: '8px',
      opacity: resendTimer > 0 ? 0.5 : 1,
    },
    emailDisplay: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'center',
      fontSize: '0.95rem',
      color: isDark ? '#d1d5db' : '#4b5563',
      wordBreak: 'break-all',
    },
  };

  // Add keyframes for animation
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
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

      {/* Main Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        
        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          <div style={styles.stepItem}>
            <div style={styles.stepCircle(step === 1, step > 1)}>1</div>
            <div style={styles.stepLabel(step === 1)}>Email</div>
          </div>
          <div style={styles.stepItem}>
            <div style={styles.stepCircle(step === 2, step > 2)}>2</div>
            <div style={styles.stepLabel(step === 2)}>Verify</div>
          </div>
          <div style={styles.stepItem}>
            <div style={styles.stepCircle(step === 3, step > 3)}>3</div>
            <div style={styles.stepLabel(step === 3)}>Reset</div>
          </div>
        </div>

        {/* Error Message */}
        {error && <div style={styles.errorMessage}>{error}</div>}

        {/* Success Message */}
        {success && <div style={styles.successMessage}>{success}</div>}

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <p style={styles.subtitle}>Enter your email to receive a verification code</p>
            <div style={styles.formGroup}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
                onFocus={(e) => {
                  e.target.style.borderColor = isDark ? '#60a5fa' : '#2563eb';
                  e.target.style.boxShadow = isDark ? '0 0 0 3px rgba(96, 165, 250, 0.3)' : '0 0 0 3px rgba(37, 99, 235, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>

            <p style={styles.backLink}>
              Remember your password?
              <Link to="/login" style={styles.loginLink}>
                Login
              </Link>
            </p>
          </form>
        )}

        {/* Step 2: Code Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <p style={styles.subtitle}>
              We've sent a 6-digit code to
            </p>
            <div style={styles.emailDisplay}>
              {email}
            </div>

            <div style={styles.formGroup}>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                style={{...styles.input, ...styles.codeInput}}
                maxLength="6"
                required
                disabled={loading}
                onFocus={(e) => {
                  e.target.style.borderColor = isDark ? '#60a5fa' : '#2563eb';
                  e.target.style.boxShadow = isDark ? '0 0 0 3px rgba(96, 165, 250, 0.3)' : '0 0 0 3px rgba(37, 99, 235, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={loading || code.length < 6}
              onMouseEnter={(e) => {
                if (!loading && code.length === 6) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              style={styles.secondaryButton}
              onClick={goBack}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              ← Back to Email
            </button>

            <div style={styles.resendText}>
              Didn't receive code?
              <span
                style={styles.resendLink}
                onClick={resendTimer === 0 ? handleResendCode : null}
              >
                {resendTimer > 0 ? ` Resend in ${resendTimer}s` : ' Resend Code'}
              </span>
            </div>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <p style={styles.subtitle}>Create a new password</p>
            
            <div style={styles.formGroup}>
              <input
                type="password"
                placeholder="New password (min. 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
                onFocus={(e) => {
                  e.target.style.borderColor = isDark ? '#60a5fa' : '#2563eb';
                  e.target.style.boxShadow = isDark ? '0 0 0 3px rgba(96, 165, 250, 0.3)' : '0 0 0 3px rgba(37, 99, 235, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  ...styles.input,
                  borderColor: newPassword && confirmPassword && newPassword !== confirmPassword 
                    ? (isDark ? '#ef4444' : '#dc2626') 
                    : (isDark ? '#4b5563' : '#d1d5db')
                }}
                required
                disabled={loading}
                onFocus={(e) => {
                  e.target.style.borderColor = isDark ? '#60a5fa' : '#2563eb';
                  e.target.style.boxShadow = isDark ? '0 0 0 3px rgba(96, 165, 250, 0.3)' : '0 0 0 3px rgba(37, 99, 235, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = newPassword && confirmPassword && newPassword !== confirmPassword 
                    ? (isDark ? '#ef4444' : '#dc2626')
                    : (isDark ? '#4b5563' : '#d1d5db');
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <button
              type="button"
              style={styles.secondaryButton}
              onClick={goBack}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              ← Back to Code
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;