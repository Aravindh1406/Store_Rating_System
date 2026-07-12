import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-16 bg-white shadow flex justify-between items-center px-8">
      <h1 className="text-2xl font-bold text-blue-600">
        Store Rating System
      </h1>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">
            {user?.role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;