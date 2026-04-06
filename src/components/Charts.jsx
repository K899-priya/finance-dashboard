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

        <XAxis
          dataKey="date"
          stroke="#9ca3af"
          tick={{ fontSize: 12 }}
        />

        <YAxis
          stroke="#9ca3af"
          tick={{ fontSize: 12 }}
        />

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
          isAnimationActive={true}
          animationDuration={1200}
          style={{ filter: "drop-shadow(0 0 6px #3b82f6)" }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryChart({ data }) {
  const colors = ["#38bdf8", "#22c55e", "#f97316"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}