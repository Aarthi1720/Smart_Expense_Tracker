import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import MoneyIcon from "../assets/images/money-bag.png";
import Lottie from "lottie-react";
import IncomeEmpty from "../assets/animations/IncomeEmpty.json";

const IncomeList = () => {
  const { incomes, setIncomes, setEditingIncome } = useContext(ExpenseContext);

  const handleDelete = (id) => {
    const updated = incomes.filter((inc) => inc.id !== id);
    setIncomes(updated);
    toast.info("Income deleted!");
  };

  return (
    <div className="bg-[#F7F9FC] rounded shawdow p-4 mt-4 h-[400px] md:h-[450px] overflow-y-auto scrollbar">
      <h3 className="text-3xl font-bold md:mt-5 mb-4 text-[#127487]">
        🧾Income List
      </h3>
      {incomes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <p className="text-gray-500">No incomes added yet.</p>
          <Lottie
            animationData={IncomeEmpty}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        </div>
      ) : (
        <ul className="space-y-3">
          {incomes
            .sort((a, b) => new Date(b.date) - new Date(a.date)) //Shows recent first
            .map((income) => (
              <li
                className=" border-b-2 border-gray-300 md:p-2 flex justify-between items-center"
                key={income.id}
              >
                <div className="flex gap-1 items-center">
                  <span className="rounded-full flex justify-center items-center w-7 h-7">
                    <img src={MoneyIcon} alt="income-icon" />
                  </span>
                  {income.note && (
                    <p className="md:text-[18px] text-[#6E6B6D] font-semibold">
                      {income.note}
                    </p>
                  )}
                </div>
                <div className="">
                  <p className="font-bold text-[#2FA61B] md:text-xl ">
                    ₹{income.amount}
                  </p>
                </div>
                <div className="md:space-x-2">
                  <button onClick={() => setEditingIncome(income)}>
                    <PencilIcon className="w-5 h-5 text-[#2A7B9B]" />
                  </button>
                  <button onClick={() => handleDelete(income.id)}>
                    <TrashIcon className="w-5 h-5 text-[#eb4d26]" />
                  </button>
                  <p className="text-[#8C8585] text-xs">{income.date}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default IncomeList;
