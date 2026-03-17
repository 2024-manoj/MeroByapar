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
  FaPlus,
  FaUserTie,
  FaTruck,
  FaFileInvoice,
  FaExclamationTriangle,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaClipboardList,
  FaPercent
} from "react-icons/fa";
import ThemeToggle from "../components/Common/ThemeToggle";

function ManagerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Sample data for manager
  const [stats, setStats] = useState({
    totalProducts: 1250,
    lowStock: 23,
    totalSales: 456,
    todayRevenue: 45000,
    pendingOrders: 8,
    totalCustomers: 89
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Rice (5kg)", price: 450, stock: 125, category: "Groceries", status: "active", sales: 45 },
    { id: 2, name: "Cooking Oil", price: 220, stock: 8, category: "Groceries", status: "low", sales: 32 },
    { id: 3, name: "Smartphone", price: 15000, stock: 15, category: "Electronics", status: "active", sales: 12 },
    { id: 4, name: "T-Shirt", price: 800, stock: 45, category: "Clothing", status: "active", sales: 28 },
    { id: 5, name: "Paracetamol", price: 50, stock: 3, category: "Medical", status: "critical", sales: 67 },
    { id: 6, name: "Notebook", price: 60, stock: 120, category: "Stationery", status: "active", sales: 89 },
  ]);

  const [cashiers, setCashiers] = useState([
    { id: 1, name: "Rahul Kumar", email: "rahul@store.com", status: "active", shift: "Morning", sales: 45, lastActive: "2024-03-17" },
    { id: 2, name: "Priya Singh", email: "priya@store.com", status: "active", shift: "Evening", sales: 38, lastActive: "2024-03-17" },
    { id: 3, name: "Amit Sharma", email: "amit@store.com", status: "inactive", shift: "Morning", sales: 0, lastActive: "2024-03-15" },
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "Nepal Trading", contact: "9851234567", email: "info@nepaltrading.com", pendingOrders: 2, performance: "good" },
    { id: 2, name: "Kathmandu Distributors", contact: "9842345678", email: "info@ktmdistributors.com", pendingOrders: 1, performance: "excellent" },
    { id: 3, name: "Himalayan Supplies", contact: "9867890123", email: "info@himalayansupplies.com", pendingOrders: 3, performance: "average" },
  ]);

  const [recentSales, setRecentSales] = useState([
    { id: 1, customer: "Walk-in Customer", items: 3, total: 1250, payment: "cash", time: "10:30 AM", cashier: "Rahul" },
    { id: 2, customer: "Ram Sharma", items: 5, total: 3450, payment: "card", time: "11:15 AM", cashier: "Priya" },
    { id: 3, customer: "Sita Devi", items: 2, total: 890, payment: "upi", time: "12:00 PM", cashier: "Rahul" },
    { id: 4, customer: "Hari Bahadur", items: 8, total: 5670, payment: "cash", time: "01:30 PM", cashier: "Priya" },
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

    setTimeout(() => setLoading(false), 1000);

    return () => observer.disconnect();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
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
    storeBadge: {
      fontSize: '0.875rem',
      color: isDark ? '#9ca3af' : '#6b7280',
      marginTop: '4px',
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
      gap: '12px',
      position: 'relative',
    },
    themeButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: '8px',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      transition: 'all 0.3s',
      minWidth: '40px',
      height: '40px',
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
      marginBottom: '20px',
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
    statusBadge: (status) => {
      let color = '';
      let bgColor = '';
      
      if (status === 'active' || status === 'good' || status === 'excellent') {
        color = '#10b981';
        bgColor = isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)';
      } else if (status === 'low' || status === 'average') {
        color = '#f59e0b';
        bgColor = isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)';
      } else if (status === 'critical' || status === 'inactive') {
        color = '#ef4444';
        bgColor = isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)';
      }
      
      return {
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: bgColor,
        color: color,
      };
    },
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
    warningCard: {
      backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
      border: isDark ? '1px solid #f59e0b' : '1px solid #f59e0b',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
    },
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "sales", label: "Sales", icon: <FaShoppingCart /> },
    { id: "cashiers", label: "Cashiers", icon: <FaUsers /> },
    { id: "suppliers", label: "Suppliers", icon: <FaTruck /> },
    { id: "reports", label: "Reports", icon: <FaChartLine /> },
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
          <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Loading manager dashboard...</p>
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
          <div style={styles.storeBadge}>Store: Kirana Store</div>
        </div>
        
        <div style={styles.navMenu}>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={styles.navItem(activeTab === item.id)}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <h1 style={styles.pageTitle}>
            {navItems.find(item => item.id === activeTab)?.label}
          </h1>
          
          <div style={styles.userSection}>
            {/* Theme Toggle Button */}
            <div 
              style={styles.themeButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
              }}
            >
              <ThemeToggle />
            </div>

            {/* User Button */}
            <div 
              style={styles.userInfo}
              onClick={() => setShowUserMenu(!showUserMenu)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
              }}
            >
              <FaUserTie size={24} color={isDark ? '#60a5fa' : '#3b82f6'} />
              <div>
                <div style={styles.userName}>Ram Sharma</div>
                <div style={styles.userRole}>Store Manager</div>
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

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div>
            {/* Low Stock Warning */}
            {stats.lowStock > 0 && (
              <div style={styles.warningCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaExclamationTriangle size={24} color="#f59e0b" />
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>
                      Low Stock Alert
                    </h3>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                      {stats.lowStock} products are running low. Restock soon!
                    </p>
                  </div>
                  <button style={{...styles.button, backgroundColor: '#f59e0b', color: 'white', marginLeft: 'auto'}}>
                    View Details
                  </button>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Total Products</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{stats.totalProducts}</p>
                  </div>
                  <FaBox size={40} color={isDark ? '#60a5fa' : '#3b82f6'} />
                </div>
                <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.75rem', marginTop: '8px' }}>
                  {stats.lowStock} low stock items
                </p>
              </div>
              
              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Today's Revenue</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{formatCurrency(stats.todayRevenue)}</p>
                  </div>
                  <FaMoneyBillWave size={40} color="#10b981" />
                </div>
                <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.75rem', marginTop: '8px' }}>
                  +12% from yesterday
                </p>
              </div>

              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Total Sales</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{stats.totalSales}</p>
                  </div>
                  <FaShoppingCart size={40} color="#8b5cf6" />
                </div>
              </div>

              <div style={styles.statCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>Customers</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>{stats.totalCustomers}</p>
                  </div>
                  <FaUsers size={40} color="#f59e0b" />
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div style={styles.tableContainer}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: isDark ? 'white' : '#111827' }}>
                Recent Sales
              </h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Time</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Items</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Payment</th>
                    <th style={styles.th}>Cashier</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map(sale => (
                    <tr key={sale.id}>
                      <td style={styles.td}>{sale.time}</td>
                      <td style={styles.td}>{sale.customer}</td>
                      <td style={styles.td}>{sale.items}</td>
                      <td style={styles.td}>{formatCurrency(sale.total)}</td>
                      <td style={styles.td}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                          color: isDark ? '#60a5fa' : '#3b82f6',
                        }}>
                          {sale.payment}
                        </span>
                      </td>
                      <td style={styles.td}>{sale.cashier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div style={styles.tableContainer}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: isDark ? 'white' : '#111827' }}>
                  Active Cashiers
                </h3>
                {cashiers.filter(c => c.status === 'active').map(cashier => (
                  <div key={cashier.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb' }}>
                    <div>
                      <div style={{ fontWeight: '500', color: isDark ? 'white' : '#111827' }}>{cashier.name}</div>
                      <div style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#6b7280' }}>{cashier.shift} shift</div>
                    </div>
                    <span style={styles.statusBadge('active')}>Active</span>
                  </div>
                ))}
              </div>

              <div style={styles.tableContainer}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: isDark ? 'white' : '#111827' }}>
                  Pending Orders
                </h3>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb' }}>
                    <div>
                      <div style={{ fontWeight: '500', color: isDark ? 'white' : '#111827' }}>Order #{1000 + i}</div>
                      <div style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#6b7280' }}>2 items • {formatCurrency(1500 + i * 500)}</div>
                    </div>
                    <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white'}}>
                      Process
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div style={styles.tableContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>
                Product Inventory
              </h3>
              <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white'}}>
                <FaPlus /> Add Product
              </button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Sales</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td style={styles.td}>{product.name}</td>
                    <td style={styles.td}>{product.category}</td>
                    <td style={styles.td}>{formatCurrency(product.price)}</td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: product.stock < 10 ? 'bold' : 'normal', color: product.stock < 10 ? '#ef4444' : 'inherit' }}>
                        {product.stock}
                      </span>
                    </td>
                    <td style={styles.td}>{product.sales}</td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(product.status)}>
                        {product.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={{...styles.button, backgroundColor: isDark ? '#374151' : '#f3f4f6', marginRight: '8px'}}>
                        <FaEdit size={12} /> Edit
                      </button>
                      <button style={{...styles.button, backgroundColor: isDark ? '#374151' : '#f3f4f6'}}>
                        <FaEye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cashiers Tab */}
        {activeTab === "cashiers" && (
          <div style={styles.tableContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>
                Cashier Management
              </h3>
              <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white'}}>
                <FaPlus /> Add Cashier
              </button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Shift</th>
                  <th style={styles.th}>Today's Sales</th>
                  <th style={styles.th}>Last Active</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cashiers.map(cashier => (
                  <tr key={cashier.id}>
                    <td style={styles.td}>{cashier.name}</td>
                    <td style={styles.td}>{cashier.email}</td>
                    <td style={styles.td}>{cashier.shift}</td>
                    <td style={styles.td}>{cashier.sales}</td>
                    <td style={styles.td}>{cashier.lastActive}</td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(cashier.status)}>
                        {cashier.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={{...styles.button, backgroundColor: isDark ? '#374151' : '#f3f4f6', marginRight: '8px'}}>
                        <FaEdit size={12} />
                      </button>
                      <button style={{...styles.button, backgroundColor: isDark ? '#374151' : '#f3f4f6'}}>
                        <FaEye size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Suppliers Tab */}
        {activeTab === "suppliers" && (
          <div style={styles.tableContainer}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', color: isDark ? 'white' : '#111827' }}>
              Supplier Management
            </h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Supplier</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Pending Orders</th>
                  <th style={styles.th}>Performance</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(supplier => (
                  <tr key={supplier.id}>
                    <td style={styles.td}>{supplier.name}</td>
                    <td style={styles.td}>{supplier.contact}</td>
                    <td style={styles.td}>{supplier.email}</td>
                    <td style={styles.td}>{supplier.pendingOrders}</td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(supplier.performance)}>
                        {supplier.performance}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={{...styles.button, backgroundColor: isDark ? '#2563eb' : '#3b82f6', color: 'white'}}>
                        Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Logout Modal */}
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

export default ManagerDashboard;