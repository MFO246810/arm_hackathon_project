import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Time_Processing_Chart({ data }) {
  return (
    <div
      style={{
        width: "80%",
        height: "400px",
        padding: "20px",
        background: "#f8fafc",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px", fontSize: "20px" }}>
        Time Spent Processing by Model
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0} />

          <XAxis
            dataKey="Model_Name"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
          />

          <YAxis
            domain={[0, (dataMax) => dataMax + 30]}
            label={{
              value: "Time Spent Processing (ms)",
              angle: -90,
              position: "insideLeft",
              dx: -5,
              style: { fontSize: 12 },
            }}
          />
 
          <Tooltip
            formatter={(value) => `${value}ms`}
            labelStyle={{ fontWeight: "bold" }}
          />

          <Legend />

          <Bar
            dataKey="Avg_Total_Time"
            name="Time Spent Processing (ms)"
            fill="#6366f1"
            radius={[8, 8, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
