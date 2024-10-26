import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chatroom() {
  const [question, setQuestion] = useState("");
  const [chatData, setChatData] = useState([]);

  async function requestChat() {
    setChatData((prevData) => [
      ...prevData,
      {
        id: `user-${chatData.length}-${Date.now()}`,
        type: "user",
        message: question,
      },
    ]);
    const token = await AsyncStorage.getItem("accessToken");
    console.log(token);
    try {
      const response = await axios.post(
        `${API_URL}/component/chat-bot/chat`,
        {
          user_text: question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const chatBotResponse =
        typeof response.data.chatBot === "object"
          ? response.data.chatBot.message
          : response.data.chatBot;
      setChatData((prevData) => [
        ...prevData,
        {
          id: `response-${chatData.length}-${Date.now()}`,
          type: "response",
          message: chatBotResponse,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => alert("홈")}>
            <Image
              source={require("./../assets/Logo.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          {/* <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => alert("렌즈")}>
              <Image
                source={require("./../assets/lens.png")}
                style={styles.headerImageLens}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("벨")}>
              <Image
                source={require("./../assets/bell.png")}
                style={styles.headerImageBell}
              />
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.chatContainer}>
          <ScrollView contentContainerStyle={styles.chatArea}>
            {chatData.map((chat) => (
              <View
                key={chat.id}
                style={
                  chat.type === "user"
                    ? styles.userMessage
                    : styles.responseMessage
                }
              >
                <Text
                  style={
                    chat.type === "user" ? styles.userText : styles.responseText
                  }
                >
                  {chat.message}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setQuestion}
            value={question}
            placeholder="질문을 입력해 주세요!"
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            onPress={() => {
              requestChat();
              setQuestion("");
            }}
            style={styles.submitButton}
          >
            <Image
              source={require("./../assets/pencil-icon.png")}
              style={styles.submitIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 20,
    zIndex: 10,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  headerImage: {
    marginTop: 20,
    marginLeft: 10,
    width: 150,
    height: 30,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImageLens: {
    marginTop: 20,
    width: 27,
    height: 27,
  },
  headerImageBell: {
    marginTop: 20,
    width: 22,
    height: 24,
    marginLeft: 15,
  },
  chatContainer: {
    flex: 1,
    marginTop: 80,
    marginBottom: 10,
  },
  chatArea: {
    padding: 16,
    paddingBottom: 16,
  },
  userMessage: {
    backgroundColor: "#319E49",
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
    alignSelf: "flex-end",
    maxWidth: "75%",
    borderBottomRightRadius: 0,
    borderColor: "#A4D3A2",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  responseMessage: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
    alignSelf: "flex-start",
    maxWidth: "75%",
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  userText: {
    fontSize: 16,
    color: "#FFF",
  },
  responseText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 60,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: "90%",
    alignSelf: "center",
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    padding: 5,
    marginLeft: 10,
  },
  submitIcon: {
    width: 24,
    height: 24,
    tintColor: "green",
  },
});
