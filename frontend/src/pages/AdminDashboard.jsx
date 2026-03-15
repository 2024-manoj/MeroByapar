import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="p-10 w-full">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

    </div>
  );
}

export default AdminDashboard;