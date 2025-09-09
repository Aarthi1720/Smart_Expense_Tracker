import React, { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import {
  BanknotesIcon,
  ChartPieIcon,
  CreditCardIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import ExpenseChart from "./components/ExpenseChart";
import CategoryTotals from "./components/CategoryTotals";
import Transactions from "./components/Transactions";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeList from "./components/IncomeList";
import AddExpenseForm from "./components/AddExpenseForm";
import FilterPanel from "./components/FilterPanel";
import ExpenseList from "./components/ExpenseList";
import Home from "./components/Home";
import MobileViewHomePage from "./components/MobileViewHomePage";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && activeSection === "mobileMenu") {
        setActiveSection("dashboard");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  return (
    <div className="min-h-screen flex flex-col bg-[#BDD6F2]">
      {/* Header */}
      <header className="bg-[#EBF0F5] mb-2 rounded-b-md border-2 border-white">
        <h1 className="text-3xl font-bold text-center p-3 text-[#090979]">
          Smart Expense Tracker
        </h1>
      </header>

      {/* SIDEBAR FOR DESKTOP */}
      <div className="hidden md:flex flex-col bg-[#05375E] text-white w-16 py-6 fixed top-0 left-0 h-screen items-center space-y-6 border-2 border-white rounded-md">
        <button
          aria-label="Go to Home"
          onClick={() => setActiveSection("home")}
          className={`cursor-pointer ${activeSection === "home" ? "text-green-600" : ""}`}
        >
          <ChartPieIcon className="w-8 h-8 text-white" />
        </button>
        <button
          aria-label="Go to Dashboard"
          onClick={() => setActiveSection("dashboard")}
          className={`cursor-pointer ${activeSection === "dashboard" ? "text-green-600" : ""}`}
        >
          <HomeIcon className="w-8 h-8" />
        </button>
        <button
          aria-label="Go to Income"
          onClick={() => setActiveSection("income")}
          className={`cursor-pointer ${activeSection === "income" ? "text-green-600" : ""}`}
        >
          <BanknotesIcon className="w-8 h-8" />
        </button>
        <button
          aria-label="Go to Expense"
          onClick={() => setActiveSection("expense")}
          className={`cursor-pointer ${activeSection === "expense" ? "text-green-600" : ""}`}
        >
          <CreditCardIcon className="w-8 h-8" />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-16 p-2">
        {/* Home */}
        {activeSection === "home" && (
          <div className="text-center p-10 bg-[#D9EAFA] flex flex-col justify-center items-center border-2 border-white min-h-screen">
            <Home />
            <button
              onClick={() => {
                if (window.innerWidth < 640) {
                  setActiveSection("mobileMenu"); // Mobile: show cards menu
                } else {
                  setActiveSection("dashboard"); // Desktop: go straight to dashboard
                }
              }}
              className="mt-6 px-6 py-3 bg-gradient-to-tl from-[#F598C0] to-[#72AFED] text-white rounded font-bold hover:bg-gradient-to-br hover:from-[#F598C0] hover:to-[#72AFED] cursor-pointer transition duration-500 focus:outline-none"
            >
              Go To Dashboard
            </button>
          </div>
        )}

        {/* MOBILE CARDS MENU */}
        {activeSection === "mobileMenu" && (
          <div>
            <MobileViewHomePage
              setActiveSection={setActiveSection}
              activeSection={activeSection}
            />
          </div>
        )}

        {/* Always SHOW SUMMARY */}
        {activeSection !== "home" && activeSection !== "mobileMenu" && (
          <div>
            <button className="sm:hidden" onClick={() => setActiveSection("mobileMenu")}>
              <ArrowLeftCircleIcon className="w-8 h-8 text-white" />
            </button>
            <SummaryCards />
          </div>
        )}

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-2 mt-4">
            <div className="md:col-span-2 flex flex-col gap-4">
              <ExpenseChart />
              <CategoryTotals />
            </div>
            <div>
              <Transactions />
            </div>
          </div>
        )}

        {/* INCOME */}
        {activeSection === "income" && (
          <div className="grid md:grid-cols-2 gap-4">
            <AddIncomeForm setActiveSection={setActiveSection} />
            <IncomeList />
          </div>
        )}

        {/* EXPENSE */}
        {activeSection === "expense" && (
          <div className="grid md:grid-cols-2 gap-4">
            <AddExpenseForm setActiveSection={setActiveSection} />
            <div>
              <FilterPanel />
              <ExpenseList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
