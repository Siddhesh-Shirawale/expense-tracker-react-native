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
import { deleteExpense, storeExpense, updateExpenseData } from "../util/http";
import {
  addExpense,
  removeExpense,
  updateExpense,
} from "../store/expensesReducer";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [loader, setLoader] = useState(false);
  const editorExpenseId = route.params?.expenseId;
  const isEditing = !!editorExpenseId;

  const [err, setErr] = useState(false);

  const expenses = useSelector((state) => state.expenses.expenses);

  const selectedExpense = expenses?.find((exp) => exp.id === editorExpenseId);

  const deleteExp = async () => {
    try {
      setLoader(true);
      const response = await deleteExpense(editorExpenseId);

      if (response?.["success"]) {
        setLoader(false);
        dispatch(removeExpense(editorExpenseId));
        navigation.goBack();
      } else {
        setLoader(false);
        setErr(true);

        setTimeout(() => {
          setErr(false);
        }, 3000);
      }
    } catch (error) {
      setLoader(false);
      setErr(true);

      setTimeout(() => {
        setErr(false);
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
    setLoader(true);
    if (isEditing) {
      let reqBody = {
        expenseId: editorExpenseId,
        amount: inputValues?.amount,
        description: inputValues?.description,
      };
      const response = await updateExpenseData(reqBody);

      if (response?.["success"]) {
        dispatch(updateExpense(response?.["data"]));
        setLoader(false);
      } else {
        setLoader(false);
        setErr(true);

        setTimeout(() => {
          setErr(false);
        }, 3000);
      }
    } else {
      try {
        setLoader(true);
        const response = await storeExpense(inputValues);

        if (response?.["success"]) {
          setLoader(false);
          dispatch(addExpense(response?.["data"]));
        } else {
          setLoader(false);
          setErr(true);

          setTimeout(() => {
            setErr(false);
          }, 3000);
        }
      } catch (error) {
        setLoader(false);
        setErr(true);

        setTimeout(() => {
          setErr(false);
        }, 3000);
      }
    }
    navigation.goBack();
  };

  if (loader) {
    return <LoadingOverlay />;
  }

  if (err && !loader) {
    return <ErrorOverlay />;
  }

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
