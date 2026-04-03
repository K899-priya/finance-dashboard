export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <h2 className="text-gray-400">{title}</h2>
      <p className="text-2xl font-bold mt-2">₹{value}</p>
    </div>
  );
}