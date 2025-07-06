import React from "react";
import WelcomeIcon from "../assets/images/accounting.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl text-[#0C0596] font-bold">
        Welcome to Smart Expense Tracker
      </h1>
      <div>
        <img src={WelcomeIcon} alt="Welcome-icon" className="w-96 h-96" />
      </div>
    </div>
  );
};

export default Home;
