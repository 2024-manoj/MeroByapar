import Sidebar from "../components/Sidebar";

function CashierDashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="p-10 w-full">
        <h1 className="text-3xl font-bold">Cashier Dashboard</h1>
      </div>

    </div>
  );
}

export default CashierDashboard;