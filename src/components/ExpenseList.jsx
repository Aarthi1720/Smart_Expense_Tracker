import React, { useContext, useMemo } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import MoneyManagementIcon from "../assets/images/money-management.png";
import Lottie from "lottie-react";
import ExpenseEmpty from "../assets/animations/ExpenseEmpty.json";
import { toast } from "react-toastify";

const ExpenseList = () => {
  const {
    expenses,
    setEditingExpense,
    deleteExpense,     // <-- use backend action
    filters,
  } = useContext(ExpenseContext);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id); // updates state internally after API success
      toast.success("Expense deleted!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete. Please try again.");
    }
  };

  // Filter + sort (memoized for performance)
  const filteredExpenses = useMemo(() => {
    return (expenses || [])
      .filter((exp) => {
        const expAmount = Number(exp.amount);
        const expDate = new Date(exp.date);

        if (filters.category && exp.category !== filters.category) return false;
        if (filters.startDate && expDate < new Date(filters.startDate)) return false;
        if (filters.endDate && expDate > new Date(filters.endDate)) return false;
        if (filters.minAmount && expAmount < Number(filters.minAmount)) return false;
        if (filters.maxAmount && expAmount > Number(filters.maxAmount)) return false;

        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first
  }, [expenses, filters]);

  return (
    <div className="bg-[#F7F9FC] rounded-md px-4 py-4 h-[450px] overflow-y-auto scrollbar">
      <h3 className="text-3xl font-bold mb-4 text-[#127487]">📃Expense List</h3>

      {filteredExpenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <p className="text-gray-500">No expenses found.</p>
          <Lottie
            animationData={ExpenseEmpty}
            loop
            style={{ width: 200, height: 200 }}
          />
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredExpenses.map((exp) => (
            <li
              key={exp.id}
              className="border-b-2 border-gray-300 md:p-2 flex justify-between items-center"
            >
              <div>
                <div className="flex gap-2 items-center">
                  <span className="rounded-full flex justify-center items-center w-8 h-8">
                    <img src={MoneyManagementIcon} alt="expenseIcon" />
                  </span>
                  <p className="md:text-[18px] text-[#166e60] font-semibold">
                    {exp.category}
                  </p>
                </div>
                {exp.note && (
                  <p className="md:text-[16px] text-[#6E6B6D] font-semibold">
                    {exp.note}
                  </p>
                )}
              </div>

              <div>
                <p className="font-bold text-[#2FA61B] md:text-xl">₹{exp.amount}</p>
              </div>

              <div className="md:space-x-2 flex items-center gap-2">
                <button onClick={() => handleEdit(exp)} aria-label="Edit">
                  <PencilIcon className="w-5 h-5 text-[#2A7B9B] cursor-pointer" />
                </button>
                <button onClick={() => handleDelete(exp.id)} aria-label="Delete">
                  <TrashIcon className="w-5 h-5 text-[#eb4d26] cursor-pointer" />
                </button>
                <p className="text-[#8C8585] text-xs">{exp.date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
