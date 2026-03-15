import Sidebar from "../components/Sidebar";

function ManagerDashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="p-10 w-full">
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
      </div>

    </div>
  );
}

export default ManagerDashboard;