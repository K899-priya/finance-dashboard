import { useStore } from "../store/useStore";
import SummaryCard from "../components/SummaryCard";
import { useMarketData } from "../hooks/useMarketData";
import MarketChart from "../components/MarketChart";
import { BalanceChart, CategoryChart } from "../components/Charts";
import { FaChartLine } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { role, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "viewer" && !user) {
      navigate("/login");
    }
  }, [navigate, role, user]);

  const { transactions } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const balanceData = [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t, i, arr) => ({
      date: t.date,
      balance: arr
        .slice(0, i + 1)
        .reduce(
          (acc, cur) =>
            cur.type === "income" ? acc + cur.amount : acc - cur.amount,
          0,
        ),
    }));

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const categoryData = Object.keys(categoryMap).map((k) => ({
    name: k,
    value: categoryMap[k],
  }));

  const highestCategory = [...categoryData].sort(
    (a, b) => b.value - a.value,
  )[0];

  const { data: marketData, loading } = useMarketData();

  const latest =
    marketData.length > 0 ? marketData[marketData.length - 1] : null;

  const prev = marketData.length > 1 ? marketData[marketData.length - 2] : null;

  const change = latest && prev ? latest.price - prev.price : 0;

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expense" value={expense} />
      </div>

      <div className="bg-blue-500/10 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
          <FaChartLine /> Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 p-4 rounded-xl">
            Highest Category
            <p className="text-lg font-bold">{highestCategory?.name || "--"}</p>
          </div>

          <div className="bg-red-500/10 p-4 rounded-xl">
            Total Expense
            <p className="text-lg font-bold">₹{expense}</p>
          </div>

          <div className="bg-green-500/10 p-4 rounded-xl">
            Savings
            <p className="text-lg font-bold">₹{balance}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-lg border border-white/10">
        <h3 className="text-lg text-green-400 font-semibold">
          LPG / Energy Price Trend
        </h3>

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-6 w-24 bg-gray-700 rounded"></div>
            <div className="h-40 bg-gray-800 rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-white">
                {latest ? `₹${latest.price.toFixed(2)}` : "--"}
              </p>

              <p className={change >= 0 ? "text-green-400" : "text-red-400"}>
                {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}
              </p>
            </div>

            <MarketChart data={marketData} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl shadow-lg">
          <h3 className="text-lg mb-2 text-gray-300">Balance Trend</h3>
          <BalanceChart data={balanceData} />
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-lg mb-2 text-gray-300">Spending Breakdown</h3>
          <CategoryChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}
