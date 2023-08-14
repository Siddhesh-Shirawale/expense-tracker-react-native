import axios from "axios";

const endPoint = "http://192.168.1.104:8000";

export const storeExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${endPoint}/api/expense`, expenseData);
    // `http://103.167.176.183:8000/api/expense`,

    return response;
  } catch (error) {
    console.log(error?.["message"]);

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

    const expenses = [];

    console.log(response?.["data"]);

    for (const key in response?.["data"]) {
      const expenseObj = {
        id: response?.data[key].id,
        amount: response?.data[key].amount,
        date: new Date(response?.["data"][key].date),
        description: new Date(response?.["data"][key].description),
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.log(error);
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
