import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export function BalanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} key={data.length}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="balance"
          stroke="url(#gradient)"
          strokeWidth={3}
          dot={{ r: 5 }}
          animationDuration={2000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryChart({ data }) {
  const colors = ["#38bdf8", "#22c55e", "#f97316"];

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" outerRadius={100}>
        {data.map((_, i) => (
          <Cell key={i} fill={colors[i % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
