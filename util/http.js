import axios from "axios";

const endPoint = "http://localhost:8000";

export const storeExpense = async (expenseData) => {
  try {
    const response = await axios.post(
      `http://103.167.176.183:8000/api/expense`,
      expenseData
    );

    console.log(response);

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(`${endPoint}/api/expense/${expenseId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${endPoint}/api/expense`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateExpense = async (expenseData) => {
  try {
    const response = await axios.put(`${endPoint}/api/expense`, expenseData);
    return response;
  } catch (error) {
    return error;
  }
};
