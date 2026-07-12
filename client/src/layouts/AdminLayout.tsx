import { Outlet } from "react-router-dom";

import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;