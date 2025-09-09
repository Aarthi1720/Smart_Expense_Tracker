import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${BASE}/api`,
  timeout: 15000,
});

// Expenses
export const apiGetExpenses    = (params = {}) => api.get("/expenses", { params });
export const apiCreateExpense  = (payload)     => api.post("/expenses", payload);
export const apiUpdateExpense  = (id, payload) => api.put(`/expenses/${id}`, payload);
export const apiDeleteExpense  = (id)          => api.delete(`/expenses/${id}`);

// Incomes
export const apiGetIncomes   = ()             => api.get("/incomes");
export const apiCreateIncome = (payload)      => api.post("/incomes", payload);
export const apiUpdateIncome = (id, payload)  => api.put(`/incomes/${id}`, payload);
export const apiDeleteIncome = (id)           => api.delete(`/incomes/${id}`);
