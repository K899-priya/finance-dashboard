import { useStore } from "../store/useStore";
import { FaUserShield, FaUser } from "react-icons/fa";

export default function Navbar({ page, setPage }) {
  const { role, setRole } = useStore();

  return (
    <div className="bg-black/30 backdrop-blur p-4 space-y-4">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border">
          {role === "admin" ? (
            <FaUserShield className="text-green-400" />
          ) : (
            <FaUser className="text-blue-400" />
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent text-white outline-none cursor-pointer"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-6 relative">
        <button
          onClick={() => setPage("dashboard")}
          className={`pb-2 transition ${
            page === "dashboard"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setPage("transactions")}
          className={`pb-2 transition ${
            page === "transactions"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Transactions
        </button>
      </div>
    </div>
  );
}
