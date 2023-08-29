import axios from "axios";

const endPoint = "http://192.168.1.105:8000";

export const storeExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${endPoint}/api/expense`, expenseData);
    // `http://103.167.176.183:8000/api/expense`,

    return response?.["data"];
  } catch (error) {
    console.log(error?.["message"]);

    return error;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(`${endPoint}/api/expense/${expenseId}`);
    return response?.["data"];
  } catch (error) {
    return error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${endPoint}/api/expense`);

    return response?.["data"];
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getRecentExpenses = async () => {
  try {
    const response = await axios.get(`${endPoint}/api/expense/recent`);

    return response?.["data"];
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateExpenseData = async (expenseData) => {
  try {
    const response = await axios.put(`${endPoint}/api/expense`, expenseData);
    return response?.["data"];
  } catch (error) {
    return error;
  }
};
