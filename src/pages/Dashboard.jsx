import { useStore } from "../store/useStore";
import SummaryCard from "../components/SummaryCard";
import { BalanceChart, CategoryChart } from "../components/Charts";
import { FaChartLine, FaWallet, FaMoneyBillWave } from "react-icons/fa";

export default function Dashboard() {
  const { transactions } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const balanceData = transactions.map((t, i) => ({
    date: t.date,
    balance: transactions
      .slice(0, i + 1)
      .reduce(
        (acc, cur) =>
          cur.type === "income" ? acc + cur.amount : acc - cur.amount,
        0
      ),
  }));

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const categoryData = Object.keys(categoryMap).map((k) => ({
    name: k,
    value: categoryMap[k],
  }));

  const highestCategory = [...categoryData].sort(
    (a, b) => b.value - a.value
  )[0];

  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expense" value={expense} />
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
          <FaChartLine /> Insights
        </h2>

        <div className="flex flex-col md:flex-row gap-6 text-gray-300">
          <p className="flex items-center gap-2">
            <FaWallet className="text-yellow-400" />
            Highest Spending:
            <span className="text-white font-medium">
              {highestCategory?.name || "N/A"}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-red-400" />
            Total Expenses:
            <span className="text-white font-medium">
              ₹{expense}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-400" />
            Savings:
            <span className="text-green-400 font-medium">
              ₹{balance}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl shadow-lg">
          <h3 className="text-lg mb-2 text-gray-300">
            Balance Trend
          </h3>
          <BalanceChart data={balanceData} />
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-lg mb-2 text-gray-300">
            Spending Breakdown
          </h3>
          <CategoryChart data={categoryData} />
        </div>

      </div>
    </div>
  );
}