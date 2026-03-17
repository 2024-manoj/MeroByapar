import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaShoppingCart, 
  FaBox,
  FaMoneyBillWave,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCashRegister,
  FaPrint,
  FaSearch,
  FaPlus,
  FaMinus,
  FaTrash,
  FaCheckCircle,
  FaCreditCard,
  FaMobile,
  FaWallet,
  FaExclamationTriangle,
  FaCog
} from "react-icons/fa";
import ThemeToggle from "../components/Common/ThemeToggle";

function CashierDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pos");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Cart state
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample products
  const [products] = useState([
    { id: 1, name: "Rice (5kg)", price: 450, stock: 125, barcode: "890123456789" },
    { id: 2, name: "Cooking Oil (1L)", price: 220, stock: 8, barcode: "890123456790" },
    { id: 3, name: "Sugar (1kg)", price: 85, stock: 45, barcode: "890123456791" },
    { id: 4, name: "Tea (250g)", price: 120, stock: 32, barcode: "890123456792" },
    { id: 5, name: "Milk (1L)", price: 65, stock: 15, barcode: "890123456793" },
    { id: 6, name: "Bread", price: 45, stock: 22, barcode: "890123456794" },
    { id: 7, name: "Eggs (dozen)", price: 180, stock: 18, barcode: "890123456795" },
    { id: 8, name: "Biscuit Pack", price: 30, stock: 67, barcode: "890123456796" },
  ]);

  // Filter products based on search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.barcode.includes(searchQuery)
  );

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

  // Add to cart
  const addToCart = (product) => {
    if (product.stock <= 0) return;
    
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.quantity < product.stock) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update quantity
  const updateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    const product = products.find(p => p.id === id);
    
    if (!item || !product) return;
    
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      setCart(cart.filter(item => item.id !== id));
    } else if (newQuantity <= product.stock) {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.13; // 13% VAT
  const total = subtotal + tax;

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
    posGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      gap: '24px',
    },
    productsSection: {
      backgroundColor: isDark ? '#1f2937' : 'white',
      padding: '20px',
      borderRadius: '12px',
    },
    cartSection: {
      backgroundColor: isDark ? '#1f2937' : 'white',
      padding: '20px',
      borderRadius: '12px',
      height: 'fit-content',
      position: 'sticky',
      top: '24px',
    },
    searchBox: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: isDark ? '1px solid #374151' : '1px solid #d1d5db',
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      color: isDark ? 'white' : '#111827',
      fontSize: '1rem',
      marginBottom: '20px',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '12px',
    },
    productCard: (inStock) => ({
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      cursor: inStock ? 'pointer' : 'not-allowed',
      opacity: inStock ? 1 : 0.5,
      transition: 'all 0.3s',
    }),
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    qtyButton: {
      padding: '4px 8px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: isDark ? '#4b5563' : '#e5e7eb',
      color: isDark ? 'white' : '#374151',
      cursor: 'pointer',
    },
    paymentMethods: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      marginTop: '16px',
    },
    paymentButton: (active) => ({
      padding: '10px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: active 
        ? (isDark ? '#2563eb' : '#3b82f6')
        : (isDark ? '#374151' : '#f3f4f6'),
      color: active ? 'white' : (isDark ? '#9ca3af' : '#6b7280'),
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
    }),
    checkoutButton: {
      width: '100%',
      padding: '16px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: isDark ? '#059669' : '#10b981',
      color: 'white',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px',
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
    { id: "pos", label: "Point of Sale", icon: <FaCashRegister /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "history", label: "Sales History", icon: <FaShoppingCart /> },
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
          <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Loading POS...</p>
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
          <div style={styles.storeBadge}>Kirana Store</div>
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
              <FaUserCircle size={24} color={isDark ? '#60a5fa' : '#3b82f6'} />
              <div>
                <div style={styles.userName}>Rahul Kumar</div>
                <div style={styles.userRole}>Cashier</div>
              </div>
            </div>

            {showUserMenu && (
              <div style={styles.userMenu}>
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

        {/* POS System */}
        {activeTab === "pos" && (
          <div style={styles.posGrid}>
            {/* Products Section */}
            <div style={styles.productsSection}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: isDark ? 'white' : '#111827' }}>
                Scan or Search Products
              </h2>
              
              <input
                type="text"
                placeholder="🔍 Search by product name or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchBox}
              />

              <div style={styles.productGrid}>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    style={styles.productCard(product.stock > 0)}
                    onClick={() => product.stock > 0 && addToCart(product)}
                  >
                    <div style={{ fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', marginTop: '8px' }}>
                      {formatCurrency(product.price)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#6b7280', marginTop: '4px' }}>
                      Stock: {product.stock}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div style={styles.cartSection}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: isDark ? 'white' : '#111827' }}>
                Current Sale
              </h2>

              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: isDark ? '#9ca3af' : '#6b7280' }}>
                  <FaShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <p>No items in cart</p>
                  <p style={{ fontSize: '0.875rem' }}>Scan or search products to start</p>
                </div>
              ) : (
                <>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {cart.map(item => (
                      <div key={item.id} style={styles.cartItem}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500', color: isDark ? 'white' : '#111827' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#6b7280' }}>
                            {formatCurrency(item.price)} each
                          </div>
                        </div>
                        <div style={styles.quantityControl}>
                          <button 
                            style={styles.qtyButton}
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <FaMinus size={10} />
                          </button>
                          <span style={{ minWidth: '30px', textAlign: 'center', color: isDark ? 'white' : '#111827' }}>
                            {item.quantity}
                          </span>
                          <button 
                            style={styles.qtyButton}
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <FaPlus size={10} />
                          </button>
                          <button 
                            style={{...styles.qtyButton, backgroundColor: '#ef4444', color: 'white', marginLeft: '4px'}}
                            onClick={() => removeFromCart(item.id)}
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Subtotal:</span>
                      <span style={{ color: isDark ? 'white' : '#111827' }}>{formatCurrency(subtotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>VAT (13%):</span>
                      <span style={{ color: isDark ? 'white' : '#111827' }}>{formatCurrency(tax)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.25rem', fontWeight: 'bold' }}>
                      <span style={{ color: isDark ? 'white' : '#111827' }}>Total:</span>
                      <span style={{ color: '#10b981' }}>{formatCurrency(total)}</span>
                    </div>

                    {/* Payment Methods */}
                    <div style={styles.paymentMethods}>
                      <button 
                        style={styles.paymentButton(paymentMethod === 'cash')}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <FaMoneyBillWave size={20} />
                        <span style={{ fontSize: '0.75rem' }}>Cash</span>
                      </button>
                      <button 
                        style={styles.paymentButton(paymentMethod === 'card')}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <FaCreditCard size={20} />
                        <span style={{ fontSize: '0.75rem' }}>Card</span>
                      </button>
                      <button 
                        style={styles.paymentButton(paymentMethod === 'Esewa')}
                        onClick={() => setPaymentMethod('Esewa')}
                      >
                        <FaMobile size={20} />
                        <span style={{ fontSize: '0.75rem' }}>Esewa</span>
                      </button>
                    </div>

                    {/* Checkout Button */}
                    <button style={styles.checkoutButton}>
                      Complete Sale • {formatCurrency(total)}
                    </button>

                    {/* Restrictions Notice */}
                    <p style={{ fontSize: '0.75rem', color: isDark ? '#9ca3af' : '#6b7280', textAlign: 'center', marginTop: '16px' }}>
                      ⚠️ Price editing and discounts require manager approval
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Products View (Read-only for cashier) */}
        {activeTab === "products" && (
          <div style={styles.productsSection}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: isDark ? 'white' : '#111827' }}>
              Product Catalog
            </h2>
            <input
              type="text"
              placeholder="Search products..."
              style={styles.searchBox}
            />
            <div style={styles.productGrid}>
              {products.map(product => (
                <div key={product.id} style={styles.productCard(true)}>
                  <div style={{ fontWeight: 'bold', color: isDark ? 'white' : '#111827' }}>
                    {product.name}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', marginTop: '8px' }}>
                    {formatCurrency(product.price)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: product.stock < 10 ? '#ef4444' : (isDark ? '#9ca3af' : '#6b7280'), marginTop: '4px' }}>
                    Stock: {product.stock}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#9ca3af' : '#6b7280', marginTop: '4px' }}>
                    Barcode: {product.barcode}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#6b7280', textAlign: 'center', marginTop: '20px' }}>
              ℹ️ For price changes or inventory updates, please contact your manager
            </p>
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

export default CashierDashboard;