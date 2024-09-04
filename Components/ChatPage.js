import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ChatPage = () => {
  return (
    <View style={styles.container}>
      <Text>ChatPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatPage;
