import { useEffect, useState } from "react";
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
} from "recharts";

export default function BalanceChart({ data }) {
  const [animatedData, setAnimatedData] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedData((prev) => {
        const next = [...prev];

        const last = next[next.length - 1];

        const newPoint = {
          date: new Date().toLocaleTimeString(),
          balance: last.balance + (Math.random() * 2000 - 1000), 
        };

        next.push(newPoint);

        if (next.length > 8) next.shift(); 

        return next;
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, []);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={500} height={300} data={animatedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="date" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />

        <defs>
          <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={false}
          animationDuration={2000}
          isAnimationActive={true}
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
