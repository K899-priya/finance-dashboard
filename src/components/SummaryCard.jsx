export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-gray-400">{title}</h2>
      <p className="text-2xl font-bold mt-2">₹{value}</p>
    </div>
  );
}