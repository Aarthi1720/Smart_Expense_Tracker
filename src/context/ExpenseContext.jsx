import React, { createContext, useEffect, useState } from "react";

//1. Create Context
export const ExpenseContext = createContext();

//2. Create Provider
export const ExpenseProvider = ({ children }) => {
  // Income & Expense state
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Editing states
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  // Filters for expense List
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  });

  //Load from localStorage on mount
  useEffect(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setIncomes(storedIncomes);
    setExpenses(storedExpenses);
  }, []);

  //Save to localStorage on Change
  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        filters,
        setFilters,
        incomes,
        setIncomes,
        editingIncome,
        setEditingIncome,
        editingExpense,
        setEditingExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
