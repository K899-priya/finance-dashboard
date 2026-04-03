import { useState } from "react";
import { useStore } from "../store/useStore";
import CategoryBadge from "../components/CategoryBadge";
import TransactionModal from "../components/TransactionModal";
import { motion as _motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Transactions() {
  const { transactions, role, deleteTransaction } = useStore();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("date");

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  let filtered = transactions.filter((t) => {
    return (
      t.category.toLowerCase().includes(search.toLowerCase()) &&
      (type === "all" || t.type === type)
    );
  });

  filtered.sort((a, b) => {
    if (sort === "amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="p-6">

      {role === "admin" && (
        <button
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
        >
          <FaPlus /> Add Transaction
        </button>
      )}

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search category..."
          className="p-2 rounded bg-gray-800 text-white border"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 rounded bg-gray-800 text-white border"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="p-2 rounded bg-gray-800 text-white border"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Type</th>
              {role === "admin" && <th className="p-3">Action</th>}
            </tr>
          </thead>

          {filtered.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No transactions found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filtered.map((t) => (
                <_motion.tr
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">{t.date}</td>
                  <td className="p-3">₹{t.amount}</td>
                  <td className="p-3">
                    <CategoryBadge category={t.category} />
                  </td>
                  <td className="p-3 capitalize">{t.type}</td>

                  {role === "admin" && (
                    <td className="p-3">
                      <div className="flex justify-center gap-4 text-lg">
                        <button
                          onClick={() => {
                            setEditData(t);
                            setShowModal(true);
                          }}
                          className="text-yellow-400 hover:text-yellow-500"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  )}
                </_motion.tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <TransactionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditData(null);
        }}
        editData={editData}
      />
    </div>
  );
}