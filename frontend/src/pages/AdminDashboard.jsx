import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStore, FaUsers, FaChartLine, FaCog, FaBox,
  FaMoneyBillWave, FaEye, FaEdit, FaTrash,
  FaCheckCircle, FaTimesCircle, FaDownload, FaPlus,
  FaUserCircle, FaSignOutAlt, FaTachometerAlt,
  FaFileAlt, FaExclamationTriangle, FaTimes, FaSave
} from "react-icons/fa";
import ThemeToggle from "../components/Common/ThemeToggle";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Modal states
  const [modal, setModal] = useState({ type: null, data: null }); // type: 'addStore'|'editStore'|'viewStore'|'addUser'|'editUser'|'viewUser'|'deleteUser'|'deleteStore'
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const [settingsData, setSettingsData] = useState({ systemName: "MeroByapar", adminEmail: "admin@merobyapar.com", sessionTimeout: 30, twoFactor: true });

  const [stats] = useState({ totalStores: 25, activeStores: 18, totalUsers: 156, totalRevenue: 285000, totalProducts: 1250, pendingOrders: 8 });

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
    { id: 5, name: "Rahul Kumar", email: "rahul@cashier.com", role: "cashier", status: "active", lastLogin: "2024-03-17 08:45 AM", stores: 2 },
  ]);

  const [reports] = useState([
    { id: 1, name: "Monthly Sales Report", date: "March 2024", type: "sales", size: "2.5 MB", downloads: 45 },
    { id: 2, name: "Inventory Summary", date: "March 2024", type: "inventory", size: "1.8 MB", downloads: 32 },
    { id: 3, name: "User Activity Log", date: "March 2024", type: "users", size: "3.2 MB", downloads: 28 },
    { id: 4, name: "Revenue Analysis", date: "Q1 2024", type: "revenue", size: "4.1 MB", downloads: 56 },
    { id: 5, name: "Store Performance", date: "March 2024", type: "stores", size: "2.9 MB", downloads: 39 },
  ]);

  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setTimeout(() => setLoading(false), 800);
    return () => observer.disconnect();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => { localStorage.removeItem("token"); sessionStorage.removeItem("token"); navigate("/login"); };

  const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);

  const openModal = (type, data = {}) => { setModal({ type, data }); setFormData(data); };
  const closeModal = () => { setModal({ type: null, data: null }); setFormData({}); };

  // Store actions
  const handleSaveStore = () => {
    if (!formData.name || !formData.owner || !formData.email) { showToast("Please fill all required fields", "error"); return; }
    if (modal.type === "addStore") {
      setStores(prev => [...prev, { ...formData, id: prev.length + 1, revenue: 0, products: 0, joined: new Date().toISOString().split("T")[0], status: "active" }]);
      showToast("Store added successfully!");
    } else {
      setStores(prev => prev.map(s => s.id === formData.id ? { ...s, ...formData } : s));
      showToast("Store updated successfully!");
    }
    closeModal();
  };

  const handleDeleteStore = () => {
    setStores(prev => prev.filter(s => s.id !== modal.data.id));
    showToast("Store deleted successfully!");
    closeModal();
  };

  const handleToggleStoreStatus = (id) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s));
    showToast("Store status updated!");
  };

  // User actions
  const handleSaveUser = () => {
    if (!formData.name || !formData.email) { showToast("Please fill all required fields", "error"); return; }
    if (modal.type === "addUser") {
      setUsers(prev => [...prev, { ...formData, id: prev.length + 1, status: "active", lastLogin: "Never", stores: 0 }]);
      showToast("User added successfully!");
    } else {
      setUsers(prev => prev.map(u => u.id === formData.id ? { ...u, ...formData } : u));
      showToast("User updated successfully!");
    }
    closeModal();
  };

  const handleDeleteUser = () => {
    setUsers(prev => prev.filter(u => u.id !== modal.data.id));
    showToast("User deleted successfully!");
    closeModal();
  };

  // Download report
  const handleDownload = (report) => {
    const content = `Report: ${report.name}\nDate: ${report.date}\nType: ${report.type}\nSize: ${report.size}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${report.name}.txt`; a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloading ${report.name}...`);
  };

  const handleSaveSettings = () => showToast("Settings saved successfully!");

  const c = (light, dark) => isDark ? dark : light;

  const s = {
    container: { display: "flex", minHeight: "100vh", backgroundColor: c("#f3f4f6", "#111827"), fontFamily: "'Segoe UI', sans-serif" },
    sidebar: { width: "260px", backgroundColor: c("white", "#1f2937"), borderRight: `1px solid ${c("#e5e7eb","#374151")}`, position: "fixed", height: "100vh", overflowY: "auto", zIndex: 10 },
    sidebarHeader: { padding: "24px", borderBottom: `1px solid ${c("#e5e7eb","#374151")}` },
    logo: { fontSize: "1.4rem", fontWeight: "800", color: c("#111827", "white"), letterSpacing: "-0.5px" },
    badge: { fontSize: "0.75rem", color: "#3b82f6", background: "rgba(59,130,246,0.1)", padding: "2px 8px", borderRadius: "99px", marginTop: "6px", display: "inline-block" },
    navItem: (active) => ({ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "8px", marginBottom: "3px", cursor: "pointer", backgroundColor: active ? (isDark ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.08)") : "transparent", color: active ? "#3b82f6" : c("#6b7280","#9ca3af"), fontWeight: active ? "600" : "400", transition: "all 0.2s", fontSize: "0.9rem" }),
    main: { flex: 1, marginLeft: "260px", padding: "24px" },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", backgroundColor: c("white","#1f2937"), borderRadius: "12px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
    pageTitle: { fontSize: "1.3rem", fontWeight: "700", color: c("#111827","white") },
    userSection: { display: "flex", alignItems: "center", gap: "12px", position: "relative" },
    userInfo: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "8px 12px", borderRadius: "8px", backgroundColor: c("#f3f4f6","#374151") },
    userMenu: { position: "absolute", top: "calc(100% + 8px)", right: 0, width: "180px", backgroundColor: c("white","#1f2937"), borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", border: `1px solid ${c("#e5e7eb","#374151")}`, zIndex: 50, overflow: "hidden" },
    userMenuItem: (red) => ({ display: "flex", alignItems: "center", gap: "8px", padding: "11px 16px", cursor: "pointer", color: red ? "#ef4444" : c("#374151","#d1d5db"), fontSize: "0.875rem" }),
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "16px", marginBottom: "24px" },
    statCard: (accent) => ({ backgroundColor: c("white","#1f2937"), padding: "20px", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", borderLeft: `4px solid ${accent}` }),
    tableWrap: { backgroundColor: c("white","#1f2937"), padding: "20px", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", overflowX: "auto", marginBottom: "20px" },
    th: { textAlign: "left", padding: "10px 12px", color: c("#6b7280","#9ca3af"), borderBottom: `1px solid ${c("#e5e7eb","#374151")}`, fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" },
    td: { padding: "12px", borderBottom: `1px solid ${c("#f3f4f6","#374151")}`, color: c("#374151","#d1d5db"), fontSize: "0.875rem" },
    badge_status: (s) => ({ padding: "3px 10px", borderRadius: "99px", fontSize: "0.78rem", fontWeight: "600", backgroundColor: s === "active" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: s === "active" ? "#10b981" : "#ef4444" }),
    btn: (color, text="white") => ({ padding: "7px 14px", borderRadius: "7px", border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600", backgroundColor: color, color: text, display: "inline-flex", alignItems: "center", gap: "5px", transition: "opacity 0.2s" }),
    iconBtn: (color="#f3f4f6", text="#374151") => ({ padding: "6px 10px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: isDark ? "#374151" : color, color: isDark ? "#d1d5db" : text, display: "inline-flex", alignItems: "center" }),
    modal: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalBox: (w="460px") => ({ backgroundColor: c("white","#1f2937"), borderRadius: "14px", width: w, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }),
    modalHeader: { padding: "20px 24px", borderBottom: `1px solid ${c("#e5e7eb","#374151")}`, display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "1.1rem", fontWeight: "700", color: c("#111827","white") },
    modalBody: { padding: "24px" },
    modalFooter: { padding: "16px 24px", borderTop: `1px solid ${c("#e5e7eb","#374151")}`, display: "flex", justifyContent: "flex-end", gap: "10px" },
    input: { width: "100%", padding: "10px 12px", borderRadius: "8px", border: `1px solid ${c("#d1d5db","#4b5563")}`, backgroundColor: c("white","#374151"), color: c("#111827","white"), fontSize: "0.9rem", outline: "none", boxSizing: "border-box" },
    label: { fontSize: "0.82rem", fontWeight: "600", color: c("#374151","#d1d5db"), marginBottom: "5px", display: "block" },
    formGroup: { marginBottom: "14px" },
    toast: (type) => ({ position: "fixed", bottom: "24px", right: "24px", padding: "12px 20px", borderRadius: "10px", backgroundColor: type === "success" ? "#10b981" : "#ef4444", color: "white", fontWeight: "600", fontSize: "0.9rem", zIndex: 2000, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", animation: "slideUp 0.3s ease" }),
    select: { width: "100%", padding: "10px 12px", borderRadius: "8px", border: `1px solid ${c("#d1d5db","#4b5563")}`, backgroundColor: c("white","#374151"), color: c("#111827","white"), fontSize: "0.9rem", outline: "none" },
    viewRow: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${c("#f3f4f6","#374151")}` },
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "stores", label: "Stores", icon: <FaStore /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "reports", label: "Reports", icon: <FaFileAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  if (loading) return (
    <div style={{ ...s.container, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 44, height: 44, border: "3px solid #e5e7eb", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: c("#6b7280","#9ca3af") }}>Loading dashboard...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );

  return (
    <div style={s.container}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}} tr:hover td{background:${isDark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.01)"}}`}</style>

      {/* Toast */}
      {toast && <div style={s.toast(toast.type)}>{toast.msg}</div>}

      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.sidebarHeader}>
          <div style={s.logo}>MeroByapar</div>
          <span style={s.badge}>Super Admin</span>
        </div>
        <div style={{ padding: "12px" }}>
          {navItems.map(item => (
            <div key={item.id} style={s.navItem(activeTab === item.id)} onClick={() => setActiveTab(item.id)}>
              {item.icon} {item.label}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${c("#e5e7eb","#374151")}`, margin: "12px 0", padding: "12px 0" }}>
            <div style={s.navItem(false)} onClick={() => setShowLogoutModal(true)}>
              <FaSignOutAlt /> Logout
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={s.main}>
        {/* Topbar */}
        <div style={s.topBar}>
          <h1 style={s.pageTitle}>{navItems.find(i => i.id === activeTab)?.label}</h1>
          <div style={s.userSection}>
            <ThemeToggle />
            <div style={s.userInfo} onClick={() => setShowUserMenu(!showUserMenu)}>
              <FaUserCircle size={22} color="#3b82f6" />
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: "600", color: c("#111827","white") }}>Admin User</div>
                <div style={{ fontSize: "0.72rem", color: c("#6b7280","#9ca3af") }}>Super Admin</div>
              </div>
            </div>
            {showUserMenu && (
              <div style={s.userMenu}>
                <div style={s.userMenuItem(false)} onClick={() => { setActiveTab("settings"); setShowUserMenu(false); }}><FaCog size={13} /> Settings</div>
                <div style={s.userMenuItem(true)} onClick={() => { setShowUserMenu(false); setShowLogoutModal(true); }}><FaSignOutAlt size={13} /> Logout</div>
              </div>
            )}
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div>
            <div style={s.statsGrid}>
              {[
                { label: "Total Stores", value: stats.totalStores, icon: <FaStore size={32} />, accent: "#3b82f6" },
                { label: "Active Stores", value: stats.activeStores, icon: <FaCheckCircle size={32} />, accent: "#10b981" },
                { label: "Total Users", value: stats.totalUsers, icon: <FaUsers size={32} />, accent: "#8b5cf6" },
                { label: "Revenue", value: formatCurrency(stats.totalRevenue), icon: <FaMoneyBillWave size={32} />, accent: "#f59e0b" },
              ].map((card, i) => (
                <div key={i} style={s.statCard(card.accent)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ color: c("#6b7280","#9ca3af"), fontSize: "0.8rem", marginBottom: "4px" }}>{card.label}</p>
                      <p style={{ fontSize: "1.7rem", fontWeight: "800", color: c("#111827","white") }}>{card.value}</p>
                    </div>
                    <div style={{ color: card.accent, opacity: 0.7 }}>{card.icon}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.tableWrap}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ fontWeight: "700", color: c("#111827","white") }}>Recent Stores</h3>
                <button style={s.btn("#3b82f6")} onClick={() => setActiveTab("stores")}>View All →</button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr><th style={s.th}>Store</th><th style={s.th}>Owner</th><th style={s.th}>Status</th><th style={s.th}>Revenue</th></tr></thead>
                <tbody>
                  {stores.slice(0, 4).map(store => (
                    <tr key={store.id}>
                      <td style={s.td}>{store.name}</td>
                      <td style={s.td}>{store.owner}</td>
                      <td style={s.td}><span style={s.badge_status(store.status)}>{store.status}</span></td>
                      <td style={s.td}>{formatCurrency(store.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STORES TAB */}
        {activeTab === "stores" && (
          <div style={s.tableWrap}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontWeight: "700", color: c("#111827","white") }}>All Stores ({stores.length})</h3>
              <button style={s.btn("#3b82f6")} onClick={() => openModal("addStore", { name:"", owner:"", email:"", phone:"", location:"", status:"active" })}>
                <FaPlus size={11} /> Add Store
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>
                {["#","Name","Owner","Email","Phone","Location","Revenue","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}
              </tr></thead>
              <tbody>
                {stores.map(store => (
                  <tr key={store.id}>
                    <td style={s.td}>#{store.id}</td>
                    <td style={{ ...s.td, fontWeight: "600" }}>{store.name}</td>
                    <td style={s.td}>{store.owner}</td>
                    <td style={s.td}>{store.email}</td>
                    <td style={s.td}>{store.phone}</td>
                    <td style={s.td}>{store.location}</td>
                    <td style={s.td}>{formatCurrency(store.revenue)}</td>
                    <td style={s.td}>
                      <span style={{ ...s.badge_status(store.status), cursor: "pointer" }} onClick={() => handleToggleStoreStatus(store.id)}>
                        {store.status}
                      </span>
                    </td>
                    <td style={s.td}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button style={s.iconBtn()} title="View" onClick={() => openModal("viewStore", store)}><FaEye size={12} /></button>
                        <button style={s.iconBtn()} title="Edit" onClick={() => openModal("editStore", store)}><FaEdit size={12} /></button>
                        <button style={{ ...s.iconBtn(), backgroundColor: isDark ? "#7f1d1d" : "#fee2e2", color: "#ef4444" }} title="Delete" onClick={() => openModal("deleteStore", store)}><FaTrash size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div style={s.tableWrap}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontWeight: "700", color: c("#111827","white") }}>User Management ({users.length})</h3>
              <button style={s.btn("#3b82f6")} onClick={() => openModal("addUser", { name:"", email:"", role:"cashier", status:"active" })}>
                <FaPlus size={11} /> Add User
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>
                {["Name","Email","Role","Last Login","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}
              </tr></thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td style={{ ...s.td, fontWeight: "600" }}>{user.name}</td>
                    <td style={s.td}>{user.email}</td>
                    <td style={s.td}>
                      <span style={{ padding: "3px 8px", borderRadius: "5px", fontSize: "0.78rem", fontWeight: "600",
                        backgroundColor: user.role === "admin" ? "rgba(59,130,246,0.1)" : user.role === "manager" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                        color: user.role === "admin" ? "#3b82f6" : user.role === "manager" ? "#10b981" : "#f59e0b"
                      }}>{user.role}</span>
                    </td>
                    <td style={s.td}>{user.lastLogin}</td>
                    <td style={s.td}><span style={s.badge_status(user.status)}>{user.status}</span></td>
                    <td style={s.td}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button style={s.iconBtn()} title="Edit" onClick={() => openModal("editUser", user)}><FaEdit size={12} /></button>
                        <button style={{ ...s.iconBtn(), backgroundColor: isDark ? "#7f1d1d" : "#fee2e2", color: "#ef4444" }} title="Delete" onClick={() => openModal("deleteUser", user)}><FaTrash size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          <div style={s.tableWrap}>
            <h3 style={{ fontWeight: "700", color: c("#111827","white"), marginBottom: "20px" }}>Available Reports</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>
                {["Report Name","Date","Type","Size","Downloads","Action"].map(h => <th key={h} style={s.th}>{h}</th>)}
              </tr></thead>
              <tbody>
                {reports.map(report => (
                  <tr key={report.id}>
                    <td style={{ ...s.td, fontWeight: "600" }}>{report.name}</td>
                    <td style={s.td}>{report.date}</td>
                    <td style={s.td}><span style={{ padding: "3px 8px", borderRadius: "5px", backgroundColor: "rgba(59,130,246,0.1)", color: "#3b82f6", fontSize: "0.78rem", fontWeight: "600" }}>{report.type}</span></td>
                    <td style={s.td}>{report.size}</td>
                    <td style={s.td}>{report.downloads}</td>
                    <td style={s.td}>
                      <button style={s.btn("#3b82f6")} onClick={() => handleDownload(report)}>
                        <FaDownload size={11} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div style={{ ...s.tableWrap, maxWidth: "600px" }}>
            <h3 style={{ fontWeight: "700", color: c("#111827","white"), marginBottom: "24px" }}>System Settings</h3>
            <div style={s.formGroup}>
              <label style={s.label}>System Name</label>
              <input style={s.input} value={settingsData.systemName} onChange={e => setSettingsData(p => ({ ...p, systemName: e.target.value }))} />
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Admin Email</label>
              <input style={s.input} type="email" value={settingsData.adminEmail} onChange={e => setSettingsData(p => ({ ...p, adminEmail: e.target.value }))} />
            </div>
            <div style={{ borderTop: `1px solid ${c("#e5e7eb","#374151")}`, margin: "20px 0" }} />
            <h4 style={{ fontWeight: "700", color: c("#111827","white"), marginBottom: "16px" }}>Security</h4>
            <div style={{ ...s.formGroup, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ ...s.label, margin: 0 }}>Two-Factor Authentication</label>
              <div style={{ position: "relative", width: "44px", height: "24px", backgroundColor: settingsData.twoFactor ? "#3b82f6" : c("#d1d5db","#4b5563"), borderRadius: "12px", cursor: "pointer", transition: "background 0.3s" }} onClick={() => setSettingsData(p => ({ ...p, twoFactor: !p.twoFactor }))}>
                <div style={{ position: "absolute", top: "3px", left: settingsData.twoFactor ? "23px" : "3px", width: "18px", height: "18px", backgroundColor: "white", borderRadius: "50%", transition: "left 0.3s" }} />
              </div>
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Session Timeout (minutes)</label>
              <input style={{ ...s.input, width: "100px" }} type="number" value={settingsData.sessionTimeout} onChange={e => setSettingsData(p => ({ ...p, sessionTimeout: e.target.value }))} />
            </div>
            <button style={{ ...s.btn("#3b82f6"), marginTop: "8px", padding: "11px 24px" }} onClick={handleSaveSettings}>
              <FaSave size={13} /> Save Settings
            </button>
          </div>
        )}
      </div>

      {/* ===== MODALS ===== */}

      {/* View Store */}
      {modal.type === "viewStore" && (
        <div style={s.modal} onClick={closeModal}>
          <div style={s.modalBox()} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}><span style={s.modalTitle}>Store Details</span><button style={{ background: "none", border: "none", cursor: "pointer", color: c("#6b7280","#9ca3af") }} onClick={closeModal}><FaTimes /></button></div>
            <div style={s.modalBody}>
              {[["Store Name", modal.data.name], ["Owner", modal.data.owner], ["Email", modal.data.email], ["Phone", modal.data.phone], ["Location", modal.data.location], ["Revenue", formatCurrency(modal.data.revenue)], ["Products", modal.data.products], ["Status", modal.data.status], ["Joined", modal.data.joined]].map(([k, v]) => (
                <div key={k} style={s.viewRow}><span style={{ color: c("#6b7280","#9ca3af"), fontSize: "0.85rem" }}>{k}</span><span style={{ color: c("#111827","white"), fontWeight: "600", fontSize: "0.9rem" }}>{v}</span></div>
              ))}
            </div>
            <div style={s.modalFooter}><button style={s.btn(c("#f3f4f6","#374151"), c("#374151","white"))} onClick={closeModal}>Close</button></div>
          </div>
        </div>
      )}

      {/* Add/Edit Store */}
      {(modal.type === "addStore" || modal.type === "editStore") && (
        <div style={s.modal} onClick={closeModal}>
          <div style={s.modalBox()} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}><span style={s.modalTitle}>{modal.type === "addStore" ? "Add New Store" : "Edit Store"}</span><button style={{ background: "none", border: "none", cursor: "pointer", color: c("#6b7280","#9ca3af") }} onClick={closeModal}><FaTimes /></button></div>
            <div style={s.modalBody}>
              {[["name","Store Name *","text"],["owner","Owner Name *","text"],["email","Email *","email"],["phone","Phone","text"],["location","Location","text"]].map(([field, label, type]) => (
                <div key={field} style={s.formGroup}>
                  <label style={s.label}>{label}</label>
                  <input style={s.input} type={type} value={formData[field] || ""} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))} />
                </div>
              ))}
              <div style={s.formGroup}>
                <label style={s.label}>Status</label>
                <select style={s.select} value={formData.status || "active"} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={s.modalFooter}>
              <button style={s.btn(c("#f3f4f6","#374151"), c("#374151","white"))} onClick={closeModal}>Cancel</button>
              <button style={s.btn("#3b82f6")} onClick={handleSaveStore}><FaSave size={12} /> {modal.type === "addStore" ? "Add Store" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Store */}
      {modal.type === "deleteStore" && (
        <div style={s.modal} onClick={closeModal}>
          <div style={s.modalBox("380px")} onClick={e => e.stopPropagation()}>
            <div style={s.modalBody}>
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <FaExclamationTriangle size={44} color="#ef4444" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontWeight: "700", color: c("#111827","white"), marginBottom: "8px" }}>Delete Store?</h3>
                <p style={{ color: c("#6b7280","#9ca3af"), marginBottom: "24px" }}>Are you sure you want to delete <strong style={{ color: c("#111827","white") }}>{modal.data?.name}</strong>? This cannot be undone.</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={{ ...s.btn(c("#f3f4f6","#374151"), c("#374151","white")), flex: 1, justifyContent: "center" }} onClick={closeModal}>Cancel</button>
                  <button style={{ ...s.btn("#ef4444"), flex: 1, justifyContent: "center" }} onClick={handleDeleteStore}><FaTrash size={11} /> Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User */}
      {(modal.type === "addUser" || modal.type === "editUser") && (
        <div style={s.modal} onClick={closeModal}>
          <div style={s.modalBox()} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}><span style={s.modalTitle}>{modal.type === "addUser" ? "Add New User" : "Edit User"}</span><button style={{ background: "none", border: "none", cursor: "pointer", color: c("#6b7280","#9ca3af") }} onClick={closeModal}><FaTimes /></button></div>
            <div style={s.modalBody}>
              {[["name","Full Name *","text"],["email","Email *","email"]].map(([field, label, type]) => (
                <div key={field} style={s.formGroup}>
                  <label style={s.label}>{label}</label>
                  <input style={s.input} type={type} value={formData[field] || ""} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))} />
                </div>
              ))}
              <div style={s.formGroup}>
                <label style={s.label}>Role</label>
                <select style={s.select} value={formData.role || "cashier"} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Status</label>
                <select style={s.select} value={formData.status || "active"} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={s.modalFooter}>
              <button style={s.btn(c("#f3f4f6","#374151"), c("#374151","white"))} onClick={closeModal}>Cancel</button>
              <button style={s.btn("#3b82f6")} onClick={handleSaveUser}><FaSave size={12} /> {modal.type === "addUser" ? "Add User" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User */}
      {modal.type === "deleteUser" && (
        <div style={s.modal} onClick={closeModal}>
          <div style={s.modalBox("380px")} onClick={e => e.stopPropagation()}>
            <div style={s.modalBody}>
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <FaExclamationTriangle size={44} color="#ef4444" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontWeight: "700", color: c("#111827","white"), marginBottom: "8px" }}>Delete User?</h3>
                <p style={{ color: c("#6b7280","#9ca3af"), marginBottom: "24px" }}>Are you sure you want to delete <strong style={{ color: c("#111827","white") }}>{modal.data?.name}</strong>?</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={{ ...s.btn(c("#f3f4f6","#374151"), c("#374151","white")), flex: 1, justifyContent: "center" }} onClick={closeModal}>Cancel</button>
                  <button style={{ ...s.btn("#ef4444"), flex: 1, justifyContent: "center" }} onClick={handleDeleteUser}><FaTrash size={11} /> Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={s.modal} onClick={() => setShowLogoutModal(false)}>
          <div style={s.modalBox("360px")} onClick={e => e.stopPropagation()}>
            <div style={s.modalBody}>
              <div style={{ textAlign: "center" }}>
                <FaExclamationTriangle size={44} color="#f59e0b" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontWeight: "700", color: c("#111827","white"), marginBottom: "8px" }}>Confirm Logout</h3>
                <p style={{ color: c("#6b7280","#9ca3af"), marginBottom: "24px" }}>Are you sure you want to logout?</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={{ ...s.btn(c("#f3f4f6","#374151"), c("#374151","white")), flex: 1, justifyContent: "center" }} onClick={() => setShowLogoutModal(false)}>Cancel</button>
                  <button style={{ ...s.btn("#ef4444"), flex: 1, justifyContent: "center" }} onClick={handleLogout}><FaSignOutAlt size={12} /> Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
