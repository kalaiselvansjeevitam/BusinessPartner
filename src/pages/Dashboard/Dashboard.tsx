import { useEffect, useState } from "react";
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

import { Loader } from "lucide-react";

import {
  getconversionRatioPieChart,
  getDashboardSummaryValues,
  getLeadsRegistraionsCountForLineChart,
} from "../../app/core/api/api.services";

import type { DashboardValue, LeadsChartItem } from "../../app/lib/types";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export const Dashboard = () => {
  /* ---------- API ---------- */

  const { mutateAsync: DashboardSummaryValues } = getDashboardSummaryValues();

  const { mutateAsync: LeadsRegistraionsCountForLineChart } =
    getLeadsRegistraionsCountForLineChart();

  const { mutateAsync: conversionRatioPieChart } = getconversionRatioPieChart();

  /* ---------- STATES ---------- */

  const [summaryLoading, setSummaryLoading] = useState(false);

  const [lineChartLoading, setLineChartLoading] = useState(false);

  const [pieChartLoading, setPieChartLoading] = useState(false);

  const [chartType, setChartType] = useState<"day" | "week" | "month">("day");

  /* ---------- SUMMARY ---------- */

  const [summaryData, setSummaryData] = useState<DashboardValue | null>(null);

  /* ---------- LINE CHART ---------- */

  const [lineChartData, setLineChartData] = useState<{
    day: LeadsChartItem[];
    week: LeadsChartItem[];
    month: LeadsChartItem[];
  }>({
    day: [],
    week: [],
    month: [],
  });

  /* ---------- PIE CHART ---------- */

  const [conversionData, setConversionData] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  /* ---------- FETCH SUMMARY ---------- */

  const fetchSummary = async () => {
    try {
      setSummaryLoading(true);

      const res = await DashboardSummaryValues();

      setSummaryData(res.data);
    } catch (error) {
      console.error("Summary API Error", error);
    } finally {
      setSummaryLoading(false);
    }
  };

  /* ---------- FETCH LINE CHART ---------- */

  const fetchLineChart = async () => {
    try {
      setLineChartLoading(true);

      const res = await LeadsRegistraionsCountForLineChart();

      setLineChartData(res.data);
    } catch (error) {
      console.error("Line Chart API Error", error);
    } finally {
      setLineChartLoading(false);
    }
  };

  /* ---------- FETCH PIE CHART ---------- */

  const fetchPieChart = async () => {
    try {
      setPieChartLoading(true);

      const res = await conversionRatioPieChart();

      setConversionData(res.data);
    } catch (error) {
      console.error("Pie Chart API Error", error);
    } finally {
      setPieChartLoading(false);
    }
  };

  /* ---------- INITIAL LOAD ---------- */

  useEffect(() => {
    fetchSummary();
    fetchLineChart();
    fetchPieChart();
  }, []);

  /* ---------- STATS ---------- */

  const stats = [
    {
      label: "Total Leads Created",
      value: summaryData?.total_leads_created ?? 0,
    },
    {
      label: "Leads In Progress",
      value: summaryData?.leads_in_progress ?? 0,
    },
    {
      label: "Leads Converted",
      value: summaryData?.leads_converted ?? 0,
    },
    {
      label: "Leads Rejected",
      value: summaryData?.leads_rejected ?? 0,
    },
    {
      label: "Total Earnings",
      value: `₹${summaryData?.total_earnings ?? 0}`,
    },
    {
      label: "Pending Payout",
      value: `₹${summaryData?.pending_payout ?? 0}`,
    },
  ];

  return (
    <Layout headerTitle="Dashboard">
      <div className="p-6 space-y-8">
        {/* ===== STATS CARDS ===== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaryLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-5 h-28 flex items-center justify-center"
                >
                  <Loader className="w-5 h-5 animate-spin" />
                </div>
              ))
            : stats.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl shadow-sm p-5"
                >
                  <p className="text-sm text-gray-500">{item.label}</p>

                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                    {item.value}
                  </h3>
                </div>
              ))}
        </div>

        {/* ===== CHARTS ===== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ===== LINE CHART ===== */}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Leads Chart</h3>

              <select
                value={chartType}
                onChange={(e) =>
                  setChartType(e.target.value as "day" | "week" | "month")
                }
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="day">Per Day</option>

                <option value="week">Per Week</option>

                <option value="month">Per Month</option>
              </select>
            </div>

            <div className="h-64">
              {lineChartLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData[chartType]}>
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
              )}
            </div>
          </div>

          {/* ===== PIE CHART ===== */}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Conversion Ratio</h3>

            <div className="h-64">
              {pieChartLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader className="w-6 h-6 animate-spin" />
                </div>
              ) : (
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
              )}
            </div>

            {/* ===== LEGEND ===== */}

            <div className="flex justify-center gap-6 mt-4 text-sm flex-wrap">
              {conversionData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index],
                    }}
                  />

                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
