export default function CategoryBadge({ category }) {
  const colors = {
    Food: "bg-red-500",
    Travel: "bg-blue-500",
    Salary: "bg-green-500",
  };

  return (
    <span className={`px-2 py-1 rounded text-white text-sm ${colors[category] || "bg-gray-500"}`}>
      {category}
    </span>
  );
}