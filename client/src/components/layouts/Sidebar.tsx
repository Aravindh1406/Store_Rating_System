import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
    {
      name: "Stores",
      path: "/admin/stores",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-lg">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;