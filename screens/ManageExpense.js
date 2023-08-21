import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../contants/styles";
import { ExpensesContext } from "./store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const editorExpenseId = route.params?.expenseId;
  const isEditing = !!editorExpenseId;

  const expContext = useContext(ExpensesContext);

  const selectedExpense = expContext.expenses?.find(
    (exp) => exp.id === editorExpenseId
  );

  const deleteExpense = () => {
    navigation.goBack();
    expContext.deleteExpense(editorExpenseId);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (inputValues) => {
    if (isEditing) {
      expContext.updateExpense(editorExpenseId, inputValues);
    } else {
      try {
        const response = await storeExpense(inputValues);

        console.log("ADD EXP", response);

        if (response?.["success"]) {
          console.log(response?.["data"]);
        }
      } catch (error) {
        console.log(error);
      }

      expContext.addExpense(inputValues);
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
            onPress={deleteExpense}
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
