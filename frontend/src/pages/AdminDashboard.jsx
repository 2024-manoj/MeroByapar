import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaStore, 
  FaUsers, 
  FaChartLine, 
  FaCog,
  FaBox,
  FaShoppingCart,
  FaBell,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave,
  FaDownload,
  FaPlus,
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaFileAlt,
  FaExclamationTriangle
} from "react-icons/fa";
import ThemeToggle from "../components/Common/ThemeToggle"; // Fixed import path

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, stores, users, reports, settings
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Sample data
  const [stats, setStats] = useState({
    totalStores: 25,
    activeStores: 18,
    totalUsers: 156,
    totalRevenue: 285000,
    totalProducts: 1250,
    pendingOrders: 8
  });

  const [stores, setStores] = useState([
    { id: 1, name: "Kirana Store", owner: "Ram Sharma", location: "Kathmandu", revenue: 45000, status: "active", products: 250, joined: "2024-01-15", email: "ram@kirana.com", phone: "9841234567" },
    { id: 2, name: "Electronics Hub", owner: "Shyam Prasad", location: "Lalitpur", revenue: 0, status: "inactive", products: 0, joined: "2024-02-20", email: "shyam@electronics.com", phone: "9842345678" },
    { id: 3, name: "Fashion Point", owner: "Sita Devi", location: "Bhaktapur", revenue: 32000, status: "active", products: 180, joined: "2024-01-10", email: "sita@fashion.com", phone: "9843456789" },
    { id: 4, name: "Medical Store", owner: "Hari Bahadur", location: "Pokhara", revenue: 28000, status: "active", products: 320, joined: "2024-02-01", email: "hari@medical.com", phone: "9844567890" },
    { id: 5, name: "Book Center", owner: "Gita Sharma", location: "Kathmandu", revenue: 15000, status: "active", products: 420, joined: "2024-01-25", email: "gita@books.com", phone: "9845678901" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@merobyapar.com", role: "admin", status: "active", lastLogin: "2024-03-17 10:30 AM", stores: 25 },
    { id: 2, name: "Ram Sharma", email: "ram@kirana.com", role: "manager", status: "active", lastLogin: "2024-03-17 09:15 AM", stores: 1 },
    { id: 3, name: "Shyam Prasad", email: "shyam@electronics.com", role: "manager", status: "inactive", lastLogin: "2024-03-10 02:30 PM", stores: 1 },
    { id: 4, name: "Sita Devi", email: "sita@fashion.com", role: "manager", status: "active", lastLogin: "2024-03-16 04:45 PM", stores: 1 },
    { id: 5, name: "Hari Bahadur", email: "hari@medical.com", role: "manager", status: "active", lastLogin: "2024-03-17 08:20 AM", stores: 1 },
    { id: 6, name: "Gita Sharma", email: "gita@books.com", role: "manager", status: "active", lastLogin: "2024-03-16 11:10 AM", stores: 1 },
    { id: 7, name: "Rahul Kumar", email: "rahul@cashier.com", role: "cashier", status: "active", lastLogin: "2024-03-17 08:45 AM", stores: 2 },
  ]);

  const [reports, setReports] = useState([
    { id: 1, name: "Monthly Sales Report", date: "March 2024", type: "sales", size: "2.5 MB", downloads: 45 },
    { id: 2, name: "Inventory Summary", date: "March 2024", type: "inventory", size: "1.8 MB", downloads: 32 },
    { id: 3, name: "User Activity Log", date: "March 2024", type: "users", size: "3.2 MB", downloads: 28 },
    { id: 4, name: "Revenue Analysis", date: "Q1 2024", type: "revenue", size: "4.1 MB", downloads: 56 },
    { id: 5, name: "Store Performance", date: "March 2024", type: "stores", size: "2.9 MB", downloads: 39 },
  ]);

  // Check for dark mode
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

    // Simulate loading
    setTimeout(() => setLoading(false), 1000);

    return () => observer.disconnect();
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear all storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Redirect to login
    navigate('/login');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: isDark ? '#111827' : '#f3f4f6',
    },
    sidebar: {
      width: '280px',
      backgroundColor: isDark ? '#1f2937' : 'white',
      borderRight: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
    },
    sidebarHeader: {
      padding: '24px',
      borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: isDark ? 'white' : '#111827',
    },
    navMenu: {
      padding: '16px',
    },
    navItem: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '4px',
      cursor: 'pointer',
      backgroundColor: active 
        ? (isDark ? '#374151' : '#f3f4f6')
        : 'transparent',
      color: active 
        ? (isDark ? '#60a5fa' : '#2563eb')
        : (isDark ? '#9ca3af' : '#6b7280'),
      transition: 'all 0.3s',
    }),
    mainContent: {
      flex: 1,
      marginLeft: '280px',
      padding: '24px',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      backgroundColor: isDark ? '#1f2937' : 'white',
      borderRadius: '12px',
      marginBottom: '24px',
      boxShadow: isDark ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
    },
    pageTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: isDark ? 'white' : '#111827',
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      position: 'relative',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: '8px',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
    },
    userName: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: isDark ? 'white' : '#111827',
    },
    userRole: {
      fontSize: '0.75rem',
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    userMenu: {
      position: 'absolute',
      top: '100%',
      right: '0',
      marginTop: '8px',
      width: '200px',
      backgroundColor: isDark ? '#1f2937' : 'white',
      borderRadius: '8px',
      boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
      border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
      zIndex: 50,
    },
    userMenuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      cursor: 'pointer',
      color: isDark ? '#d1d5db' : '#374151',
      transition: 'all 0.3s',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '24px',
    },
    statCard: {
      backgroundColor: isDark ? '#1f2937' : 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: isDark ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
    },
    tableContainer: {
      backgroundColor: isDark ? '#1f2937' : 'white',
      padding: '20px',
      borderRadius: '12px',
      overflow: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      color: isDark ? '#9ca3af' : '#6b7280',
      borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    td: {
      padding: '12px',
      borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
      color: isDark ? '#d1d5db' : '#374151',
    },
    statusBadge: (status) => ({
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: status === 'active' 
        ? (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
        : (isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'),
      color: status === 'active' ? '#10b981' : '#ef4444',
    }),
    button: {
      padding: '6px 12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: isDark ? '#1f2937' : 'white',
      padding: '32px',
      borderRadius: '12px',
      maxWidth: '400px',
      width: '90%',
    },
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "stores", label: "Stores", icon: <FaStore /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "reports", label: "Reports", icon: <FaFileAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '3px solid ' + (isDark ? '#374151' : '#e5e7eb'),
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>MeroByapar</div>
        </div>
        
        <div style={styles.navMenu}>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={styles.navItem(activeTab === item.id)}
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Bar with User Menu and Logout */}
        <div style={styles.topBar}>
          <h1 style={styles.pageTitle}>
            {navItems.find(item => item.id === activeTab)?.label}
          </h1>
          
          <div style={styles.userSection}>
            <div style={styles.themeButton} 
            onClick={() => {}}>
                <ThemeToggle />
              </div>
            
            
            <div 
              style={styles.userInfo}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUserCircle size={24} color={isDark ? '#60a5fa' : '#3b82f6'} />
              <div>
                <div style={styles.userName}>Admin User</div>
                <div style={styles.userRole}>Super Admin</div>
              </div>
            </div>

            {showUserMenu && (
              <div style={styles.userMenu}>
                <div 
                  style={styles.userMenuItem}
                  onClick={() => {
                    setActiveTab('settings');
                    setShowUserMenu(false);
                  }}
                >
                  <FaCog size={14} />
                  Settings
                </div>
                <div 
                  style={{...styles.userMenuItem, color: '#ef4444'}}
                  onClick={() => {
                    setShowUserMenu(false);
                    setShowLogoutModal(true);
                  }}
                >
                  <FaSignOutAlt size={14} />
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        {activeTab === "dashboard" && (
          <div>
            {/* Stats Grid */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Total Stores</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{stats.totalStores}</p>
                  </div>
                  <FaStore size={40} color={isDark ? '#60a5fa' : '#3b82f6'} />
                </div>
              </div>
              
              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Active Stores</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{stats.activeStores}</p>
                  </div>
                  <FaCheckCircle size={40} color="#10b981" />
                </div>
              </div>

              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Total Users</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{stats.totalUsers}</p>
                  </div>
                  <FaUsers size={40} color="#8b5cf6" />
                </div>
              </div>

              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Revenue</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <FaMoneyBillWave size={40} color="#f59e0b" />
                </div>
              </div>
            </div>

            {/* Recent Stores */}
            <div style={styles.tableContainer}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: isDark ? 'white' : '#111827' }}>
                Recent Stores
              </h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Store Name</th>
                    <th style={styles.th}>Owner</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.slice(0, 4).map(store => (
                    <tr key={store.id}>
                      <td style={styles.td}>{store.name}</td>
                      <td style={styles.td}>{store.owner}</td>
                      <td style={styles.td}>
                        <span style={styles.statusBadge(store.status)}>
                          {store.status === 'active' ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
                          {store.status}
                        </span>
                      </td>
                      <td style={styles.td}>{formatCurrency(store.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "stores" && (
          <div style={styles.tableContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>
                All Stores
              </h3>
              <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white'}}>
                <FaPlus /> Add Store
              </button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Store Name</th>
                  <th style={styles.th}>Owner</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Products</th>
                  <th style={styles.th}>Revenue</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stores.map(store => (
                  <tr key={store.id}>
                    <td style={styles.td}>#{store.id}</td>
                    <td style={styles.td}>{store.name}</td>
                    <td style={styles.td}>{store.owner}</td>
                    <td style={styles.td}>{store.email}</td>
                    <td style={styles.td}>{store.phone}</td>
                    <td style={styles.td}>{store.location}</td>
                    <td style={styles.td}>{store.products}</td>
                    <td style={styles.td}>{formatCurrency(store.revenue)}</td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(store.status)}>
                        {store.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={{...styles.button, backgroundColor: isDark ? '#374151' : '#f3f4f6', marginRight: '8px'}}>
                        <FaEye size={12} />
                      </button>
                      <button style={{...styles.button, backgroundColor: isDark ? '#374151' : '#f3f4f6'}}>
                        <FaEdit size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "users" && (
          <div style={styles.tableContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>
                User Management
              </h3>
              <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white'}}>
                <FaPlus /> Add User
              </button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Stores</th>
                  <th style={styles.th}>Last Login</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: user.role === 'admin' 
                          ? (isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.1)')
                          : user.role === 'manager'
                            ? (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
                            : (isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'),
                        color: user.role === 'admin' 
                          ? (isDark ? '#60a5fa' : '#3b82f6')
                          : user.role === 'manager'
                            ? '#10b981'
                            : '#f59e0b',
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={styles.td}>{user.stores}</td>
                    <td style={styles.td}>{user.lastLogin}</td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={{...styles.button, backgroundColor: isDark ? '#374151' : '#f3f4f6', marginRight: '8px'}}>
                        <FaEdit size={12} />
                      </button>
                      <button style={{...styles.button, backgroundColor: isDark ? '#991b1b' : '#fee2e2', color: '#ef4444'}}>
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reports" && (
          <div style={styles.tableContainer}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', color: isDark ? 'white' : '#111827' }}>
              Available Reports
            </h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Report Name</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Size</th>
                  <th style={styles.th}>Downloads</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => (
                  <tr key={report.id}>
                    <td style={styles.td}>{report.name}</td>
                    <td style={styles.td}>{report.date}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                        color: isDark ? '#60a5fa' : '#3b82f6',
                      }}>
                        {report.type}
                      </span>
                    </td>
                    <td style={styles.td}>{report.size}</td>
                    <td style={styles.td}>{report.downloads}</td>
                    <td style={styles.td}>
                      <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white'}}>
                        <FaDownload /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={styles.tableContainer}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', color: isDark ? 'white' : '#111827' }}>
              System Settings
            </h3>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              {/* General Settings */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', color: isDark ? 'white' : '#111827' }}>
                  General Settings
                </h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: isDark ? '#d1d5db' : '#374151' }}>System Name</span>
                    <input 
                      type="text" 
                      value="MeroByapar" 
                      style={{ 
                        padding: '8px 12px', 
                        borderRadius: '6px', 
                        border: isDark ? '1px solid #374151' : '1px solid #d1d5db',
                        backgroundColor: isDark ? '#374151' : 'white',
                        color: isDark ? 'white' : '#111827',
                      }} 
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: isDark ? '#d1d5db' : '#374151' }}>Admin Email</span>
                    <input 
                      type="email" 
                      value="admin@merobyapar.com" 
                      style={{ 
                        padding: '8px 12px', 
                        borderRadius: '6px', 
                        border: isDark ? '1px solid #374151' : '1px solid #d1d5db',
                        backgroundColor: isDark ? '#374151' : 'white',
                        color: isDark ? 'white' : '#111827',
                      }} 
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', color: isDark ? 'white' : '#111827' }}>
                  Security Settings
                </h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: isDark ? '#d1d5db' : '#374151' }}>Two-Factor Authentication</span>
                    <input type="checkbox" checked />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: isDark ? '#d1d5db' : '#374151' }}>Session Timeout (minutes)</span>
                    <input 
                      type="number" 
                      value="30" 
                      style={{ 
                        padding: '8px 12px', 
                        borderRadius: '6px', 
                        border: isDark ? '1px solid #374151' : '1px solid #d1d5db',
                        backgroundColor: isDark ? '#374151' : 'white',
                        color: isDark ? 'white' : '#111827',
                        width: '80px',
                      }} 
                    />
                  </div>
                </div>
              </div>

              <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white', padding: '12px'}}>
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={styles.modal} onClick={() => setShowLogoutModal(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <FaExclamationTriangle size={48} color="#f59e0b" style={{ margin: '0 auto 16px', display: 'block' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: isDark ? 'white' : '#111827' }}>
              Confirm Logout
            </h3>
            <p style={{ textAlign: 'center', marginBottom: '24px', color: isDark ? '#9ca3af' : '#6b7280' }}>
              Are you sure you want to logout?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowLogoutModal(false)}
                style={{...styles.button, flex: 1, backgroundColor: isDark ? '#374151' : '#f3f4f6', padding: '12px'}}
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                style={{...styles.button, flex: 1, backgroundColor: '#ef4444', color: 'white', padding: '12px'}}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;