import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Lottie from "lottie-react";
import ExpenseChartEmpty from "../assets/animations/ExpenseChartEmpty.json";

const COLORS = ["#090979", "#0B8A40", "#FD1D1D", "#2BA4A6", "#6366F1"];

const ExpenseChart = () => {
  const { expenses } = useContext(ExpenseContext);

  //Group expenses by Category
  const chartData = expenses.reduce((acc, curr) => {
    const found = acc.find((item) => item.name === curr.category);
    if (found) {
      found.value += Number(curr.amount);
    } else {
      acc.push({ name: curr.category, value: Number(curr.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="bg-[#FAFBFC] rounded-md p-4">
      <h3 className="text-3xl font-bold text-[#127487] mb-6 text-center">
        📊Expenses by Category
      </h3>
      {chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <p className="text-gray-500">
            No expenses yet. Add some to see the chart!
          </p>
          <Lottie animationData={ExpenseChartEmpty} loop={true} />
        </div>
      ) : (
        <ResponsiveContainer width="95%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `₹${value}`}
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ marginTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseChart;
