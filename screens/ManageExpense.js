import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";

const ManageExpense = ({ route, navigation }) => {
  const editorExpenseId = route.params?.expenseId;
  const isEditing = !!editorExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>Manage expense</Text>
    </View>
  );
};

export default ManageExpense;
