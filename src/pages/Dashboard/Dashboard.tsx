import Layout from "../../app/components/Layout/Layout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const stats = [
  { label: "Total Leads Created", value: 124 },
  { label: "Leads In Progress", value: 38 },
  { label: "Leads Converted", value: 72 },
  { label: "Leads Rejected", value: 14 },
  { label: "Total Earnings", value: "₹85,000" },
  { label: "Pending Payout", value: "₹12,500" },
];
const conversionData = [
  { name: "Converted", value: 72 },
  { name: "In Progress", value: 38 },
  { name: "Rejected", value: 14 },
];
const leadsData = [
  { name: "Mon", leads: 12 },
  { name: "Tue", leads: 18 },
  { name: "Wed", leads: 9 },
  { name: "Thu", leads: 22 },
  { name: "Fri", leads: 17 },
  { name: "Sat", leads: 25 },
  { name: "Sun", leads: 14 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export const Dashboard = () => {
  return (
    <Layout headerTitle="Dashboard">
      <div className="p-6 space-y-8">
        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item) => (
            <div key={item.label} className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-sm text-gray-500">{item.label}</p>
              <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* ===== CHARTS SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              Leads per Day / Week / Month
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Ratio */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Conversion Ratio</h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {conversionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                Converted
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                In Progress
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                Rejected
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
