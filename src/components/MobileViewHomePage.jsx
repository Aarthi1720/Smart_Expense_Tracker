import React from "react";
import DashboardIcon from "../assets/images/budget.png";
import ExpenseIcon from "../assets/images/costs.png";
import IncomeIcon from "../assets/images/coins.png";

const MobileViewHomePage = ({ setActiveSection, activeSection }) => {
  return (
    <div className="flex flex-col gap-5 sm:hidden mb-6 p-5">
      {/* Dashboard */}
      <div
        onClick={() => setActiveSection("dashboard")}
        className={`p-4 rounded shadow cursor-pointer ${
          activeSection === "dashboard" ? "bg-blue-600 text-white" : "bg-white"
        }`}
      >
        <div className="flex flex-col justify-between items-center">
          <img
            src={DashboardIcon}
            alt="dashboard-icon"
            className="w-20 h-20 object-contain"
          />
          <p className="text-[#090979] font-semibold text-xl">Dashboard</p>
        </div>
      </div>

      {/* Income */}
      <div
        onClick={() => setActiveSection("income")}
        className={`p-4 rounded shadow cursor-pointer ${
          activeSection === "income" ? "bg-green-600 text-white" : "bg-white"
        }`}
      >
        <div className="flex flex-col justify-between items-center">
          <img
            src={IncomeIcon}
            alt="expense-icon"
            className="w-20 h-20 object-contain"
          />
          <p className="text-[#090979] font-semibold text-xl">Income</p>
        </div>
      </div>
      <div
        onClick={() => setActiveSection("expense")}
        className={`p-4 rounded shadow cursor-pointer ${
          activeSection === "expense" ? "bg-red-600 text-white" : "bg-white"
        }`}
      >
        <div className="flex flex-col justify-between items-center">
          <img
            src={ExpenseIcon}
            alt="expense-icon"
            className="w-20 h-20 object-contain"
          />
          <p className="text-[#090979] font-semibold text-xl">Expense</p>
        </div>
      </div>
    </div>
  );
};

export default MobileViewHomePage;
