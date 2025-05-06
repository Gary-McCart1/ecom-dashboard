"use client";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CumulativeTotals = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(
        "http://localhost:8000/api/cumulative-monthly-stats/"
      );
      const data = await response.json();
      setChartData(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-100 my-10 rounded-lg p-3">
      <h2 className="text-center m-3 text-xl font-extrabold">
        Cumulative Revenue, Costs, and Profit
      </h2>
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={478}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="month"
              tick={({ x, y, payload }) => {
                const date = new Date(payload.value);
                const label = date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "2-digit",
                });

                return (
                  <text
                    x={x}
                    y={y}
                    dy={20} // Increased value for more space
                    textAnchor="middle"
                    transform={`rotate(-30, ${x}, ${y})`}
                    fontSize={15}
                    fill="#333"
                  >
                    {label}
                  </text>
                );
              }}
            />
            <YAxis
              tickFormatter={(tick) => `$${tick.toLocaleString()}`} // Format as currency
              width={80} // Add space for Y-axis labels
            />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`} // Format tooltip values
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#28a745"  // Soft green for revenue
              fill="#28a745"    // Soft green fill
              fillOpacity={0.1} // Adjust opacity for overlapping areas
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#dc3545"  // Muted red for cost
              fill="#dc3545"    // Muted red fill
              fillOpacity={.3} // Adjust opacity for overlapping areas
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#007bff"
              fill="#007bff"
              fillOpacity={.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CumulativeTotals;
