import React, {
  useContext,
  useDebugValue,
  useLayoutEffect,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../contants/styles";
import { ExpensesContext } from "./store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense } from "../util/http";
import { addExpense, removeExpense } from "../store/expensesReducer";
import { useDispatch, useSelector } from "react-redux";

const ManageExpense = ({ route, navigation }) => {
  const editorExpenseId = route.params?.expenseId;
  const isEditing = !!editorExpenseId;

  const [errMsg, setErrMsg] = useState("");

  const expenses = useSelector((state) => state.expenses.expenses);

  const selectedExpense = expenses?.find((exp) => exp.id === editorExpenseId);

  const deleteExp = async () => {
    try {
      const response = await deleteExpense(editorExpenseId);

      console.log(response);

      if (response?.["success"]) {
        dispatch(removeExpense(editorExpenseId));
        navigation.goBack();
      }
    } catch (error) {
      setErrMsg("Something went wrong");

      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const dispatch = useDispatch();

  const confirmHandler = async (inputValues) => {
    if (isEditing) {
      expContext.updateExpense(editorExpenseId, inputValues);
    } else {
      try {
        const response = await storeExpense(inputValues);

        if (response?.["success"]) {
          dispatch(addExpense(response?.["data"]));
        }
      } catch (error) {
        console.log(error);
      }
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "ADD"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExp}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
