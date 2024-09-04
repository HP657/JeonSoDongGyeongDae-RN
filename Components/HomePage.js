import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomePage = () => (
  <View style={styles.container}>
    <Text>홈 화면</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
