import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlusIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ setActiveSection }) => {
  const { expenses, setExpenses, editingExpense, setEditingExpense } =
    useContext(ExpenseContext);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");

  //Fill the form fields when editingExpense changes
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(new Date(editingExpense.date));
      setNote(editingExpense.note);
    } else {
      //Clear form if not editing
      setAmount("");
      setCategory("");
      setDate(new Date());
      setNote("");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      //Update existing expense
      const updatedExpenses = expenses.map((exp) =>
        exp.id === editingExpense.id
          ? {
              ...exp,
              amount: parseFloat(amount),
              category,
              date: new Date(date).toISOString().split("T")[0],
              note,
            }
          : exp
      );
      setExpenses(updatedExpenses);
      toast.success("Expense updated!");
      setEditingExpense(null);
    } else {
      //Add new expense
      const newExpense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        date: new Date(date).toISOString().split("T")[0],
        note,
      };
      setExpenses([...expenses, newExpense]);
      toast.success("Expense added!");
    }
    //Clear form and close
    setAmount("");
    setCategory("");
    setNote("");
    setDate(new Date());
  };

  const handleClear = () => {
    setEditingExpense(null);
    setAmount("");
    setDate(new Date());
    setNote("");
  };

  const handleClose = () => {
    setActiveSection("dashboard");
    setEditingExpense(null);
    setAmount("");
    setCategory("");
    setDate(new Date());
    setNote("");
  };

  return (
    <div className="bg-[#ffff] p-4 md:px-4 md:py-2 rounded-md shadow mt-4 relative">
      <h2 className="text-3xl lg:text-3xl font-bold md:mt-5 mb-5 text-[#127487]">
        {editingExpense ? "✏Edit Expense" : "💳Add Expense"}
      </h2>
      <button
        onClick={handleClose}
        className="px-4 py-2 bg-gradient-to-bl from-[#eeabab] to-[#f380b5] hover:bg-gradient-to-tr hover:from-[#FF0000] hover:to-[#FA7DB7] font-semibold text-white rounded absolute right-2 top-4 md:right-4 md:top-7 cursor-pointer transition duration-500"
      >
        Close
      </button>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 font-semibold text-[#2A7B9B] text-xl">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="w-full border-2 border-[#1D6E91] px-3 py-2 rounded focus:outline-none caret-[#57C785] text-gray-500 font-semibold "
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-[#2A7B9B] text-xl">
            Category
          </label>
          <select
            className="w-full border-2 border-[#1D6E91] p-2 rounded focus:outline-none caret-[#57C785] text-gray-500 font-semibold cursor-pointer"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            <option value="Food">🍔Food</option>
            <option value="Travel">✈Travel</option>
            <option value="Bills">📰Bills</option>
            <option value="Others">🔗Others</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-[#2A7B9B] text-xl">
            Date
          </label>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => {
              setDate(selectedDate);
            }}
            dateFormat={"yyyy-MM-dd"}
            className="w-full border-2 border-[#1D6E91] p-2 rounded focus:outline-none caret-[#57C785] text-gray-500 font-semibold "
            calendarClassName="my-calendar"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-[#2A7B9B] text-xl">
            Note
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className="w-full border-2 border-[#1D6E91] px-3 py-2 rounded focus:outline-none caret-[#57C785] text-gray-500 font-semibold "
            placeholder="Optional"
            required
          />
        </div>
        <div className="flex justify-between items-center md:mt-5">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-tr from-[#46e2e7] to-[#a766f1] text-white rounded hover:bg-gradient-to-bl hover:from-[#3F5EFB] hover:to-[#FC466B] font-semibold cursor-pointer transition duration-500"
          >
            {" "}
            {editingExpense ? "Update" : "Add Expense"}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-white rounded font-semibold bg-gradient-to-tr from-[#ABADB0] to-[#7585BA] hover:bg-gradient-to-bl hover:from-[#ABADB0] hover:to-[#7585BA] transition duration-500 cursor-pointer"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
