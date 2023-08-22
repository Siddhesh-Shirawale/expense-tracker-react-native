import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }) => {
  return (
    <View style={{ marginBottom: 50 }}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseItem {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpenseList;

// const styles = StyleSheet.create({});
