import { NavLink } from "react-router-dom";
import { FaChartLine, FaExchangeAlt, FaHome, FaUserShield, FaUser } from "react-icons/fa";
import { useStore } from "../store/useStore";

export default function Navbar() {
  const { role, setRole } = useStore();

  const linkStyle =
    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300";

  const activeStyle = "bg-blue-600 text-white shadow";

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-800">

      <h1 className="text-xl font-bold text-blue-400">
        FinTech
      </h1>

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
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent text-white outline-none cursor-pointer text-sm"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

        </div>

      </div>
    </div>
  );
}