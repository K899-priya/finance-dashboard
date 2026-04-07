import { NavLink } from "react-router-dom";
import { FaChartLine, FaExchangeAlt, FaHome } from "react-icons/fa";

export default function Navbar() {
  const linkStyle =
    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300";

  const activeStyle = "bg-blue-600 text-white shadow";

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-800">

      <h1 className="text-xl font-bold text-blue-400">
        Finance Dashboard
      </h1>

      
      <div className="flex gap-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-400 hover:text-white"}`
          }
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-400 hover:text-white"}`
          }
        >
          <FaChartLine /> Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-400 hover:text-white"}`
          }
        >
          <FaExchangeAlt /> Transactions
        </NavLink>

      </div>
    </div>
  );
}