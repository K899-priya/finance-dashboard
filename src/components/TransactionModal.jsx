import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { FaTimes } from "react-icons/fa";

export default function TransactionModal({ isOpen, onClose, editData }) {
  const { addTransaction, editTransaction } = useStore();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (!isOpen) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(() => {
      if (editData) {
        return editData;
      }
      return {
        date: "",
        amount: "",
        category: "",
        type: "expense",
      };
    });
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (editData) editTransaction(form);
    else addTransaction(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-6 rounded-xl w-[320px] space-y-3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-bold text-center">
          {editData ? "Edit" : "Add"} Transaction
        </h2>

        <input
          type="date"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: +e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select
          className="w-full p-2 bg-gray-800 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
