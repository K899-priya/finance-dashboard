import { useState } from "react";
import { useStore } from "../store/useStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Cell,
  Pie,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";

export function BalanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

        <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />

        <Tooltip
          contentStyle={{
            backgroundColor: "#111827",
            border: "1px solid #374151",
            borderRadius: "10px",
            color: "#fff",
          }}
          labelStyle={{ color: "#9ca3af" }}
        />

        <Area
          type="monotone"
          dataKey="balance"
          stroke="none"
          fill="url(#balanceGradient)"
        />

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 4, fill: "#3b82f6" }}
          activeDot={{ r: 6 }}
          animationDuration={1200}
          style={{ filter: "drop-shadow(0 0 6px #3b82f6)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const { filterCategory, setFilterCategory } = useStore();

  const COLORS = [
    "#38bdf8",
    "#22c55e",
    "#f97316",
    "#a78bfa",
    "#f43f5e",
  ];

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="w-full h-85 flex flex-col items-center gap-4">
      
      
      <div className="relative w-full h-65">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  onClick={() =>
                    setFilterCategory(
                      filterCategory === entry.name
                        ? "all"
                        : entry.name
                    )
                  }
                  style={{
                    cursor: "pointer",
                    filter:
                      activeIndex === index ||
                      filterCategory === entry.name
                        ? "drop-shadow(0 0 10px #38bdf8)"
                        : "none",
                    transform:
                      activeIndex === index ? "scale(1.05)" : "scale(1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-xl font-bold text-white">₹{total}</p>
        </div>
      </div>

     
      <div className="flex flex-wrap justify-center gap-3">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setFilterCategory(
                filterCategory === item.name ? "all" : item.name
              )
            }
            className={`flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer border ${
              filterCategory === item.name
                ? "border-blue-400 bg-blue-400/10"
                : "border-gray-600"
            }`}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}