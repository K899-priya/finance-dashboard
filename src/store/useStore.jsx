import { create } from "zustand";

const saved = JSON.parse(localStorage.getItem("transactions")) || [
  {
    id: 1,
    date: "2026-03-02",
    amount: 1200,
    category: "Food",
    type: "expense",
  },
  {
    id: 2,
    date: "2026-03-03",
    amount: 800,
    category: "Travel",
    type: "expense",
  },
  {
    id: 3,
    date: "2026-03-01",
    amount: 5000,
    category: "Salary",
    type: "income",
  },
];

export const useStore = create((set) => ({
  role: "admin",
  transactions: saved,

  setRole: (role) => set({ role }),

  filterCategory: "all",

  setFilterCategory: (category) => set({ filterCategory: category }),

  addTransaction: (tx) =>
    set((state) => {
      const updated = [...state.transactions, { ...tx, id: Date.now() }];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  editTransaction: (updatedTx) =>
    set((state) => {
      const updated = state.transactions.map((t) =>
        t.id === updatedTx.id ? updatedTx : t,
      );
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((t) => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),
}));
