import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CaseLawTrends({ similarCases, graphData }) {
  const [filter, setFilter] = useState(5);

  const originalData = graphData;

  const currentYear = new Date().getFullYear();
  const filteredData = originalData.filter(
    (d) => d.year >= currentYear - filter + 1
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Case Law Trends</h2>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={filter}
          onChange={(e) => setFilter(Number(e.target.value))}
        >
          <option value={5}>Last 5 Years</option>
          <option value={10}>Last 10 Years</option>
          <option value={15}>Last 15 Years</option>
          <option value={50}>All 50 Years</option>
        </select>
      </div>

      <div className="h-72 p-4 bg-gray-100 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3 className="mt-4 text-lg font-semibold">Key Case Laws Cited</h3>
      <ul className="mt-2 list-disc pl-6 text-gray-800">
        {similarCases.slice(0, 2).map((caseItem) => (
          <li key={caseItem.id} className="font-semibold text-blue-600">
            <span className="font-bold">{caseItem.caseName}</span> -{" "}
            {caseItem.summary.split(".")[0]}.
          </li>
        ))}
      </ul>
    </div>
  );
}
