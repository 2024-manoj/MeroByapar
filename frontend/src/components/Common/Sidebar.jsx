import { FaStore, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-[280px] h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white p-6 fixed">

      {/* Logo */}
      <div className="flex items-center gap-3 text-2xl font-bold border-b border-gray-700 pb-6">
        <FaStore className="text-blue-500 text-3xl" />
        <span>MeroByapar</span>
      </div>

      {/* Menu */}
      <nav className="mt-8 space-y-2">
        <div className="flex items-center gap-3 p-3 rounded bg-blue-600 cursor-pointer">
          <FaStore /> Dashboard
        </div>

        <div className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 cursor-pointer">
          <FaStore /> Stores
        </div>

        <div className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 cursor-pointer">
          <FaUsers /> Users
        </div>

        <div className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 cursor-pointer">
          <FaChartBar /> Reports
        </div>

        <div className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 cursor-pointer">
          <FaCog /> Settings
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 w-full">
        <div className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer">
          <FaSignOutAlt /> Logout
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;