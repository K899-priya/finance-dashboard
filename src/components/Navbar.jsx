import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaExchangeAlt,
  FaHome,
  FaUserShield,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useStore } from "../store/useStore";

export default function Navbar() {
  const { role, setRole, user, logout } = useStore();
  const navigate = useNavigate();

  const linkStyle =
    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300";

  const activeStyle = "bg-blue-600 text-white shadow";

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-800">

      <h1 className="text-xl font-bold text-blue-400">FinTech</h1>

      <div className="flex gap-4 items-center">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive ? activeStyle : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive ? activeStyle : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaChartLine /> Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive ? activeStyle : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaExchangeAlt /> Transactions
        </NavLink>

        {/* 👤 ROLE SWITCH */}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border ml-4">

          {role === "admin" ? (
            <FaUserShield className="text-green-400 text-lg" />
          ) : (
            <FaUser className="text-blue-400 text-lg" />
          )}

          <select
            value={role}
            onChange={(e) => {
              const selected = e.target.value;

              if (selected === "viewer") {
                const user = localStorage.getItem("viewerUser");

                if (!user) {
                  navigate("/login");
                  return;
                }
              }

              setRole(selected);
            }}
            className="bg-transparent text-white outline-none cursor-pointer text-sm"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* 👤 USER INFO + LOGOUT */}
        {role === "viewer" && user && (
          <div className="flex items-center gap-3 ml-4">

            <div className="text-sm text-gray-300">
              👋 {user.name}
            </div>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
            >
              <FaSignOutAlt /> Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
}