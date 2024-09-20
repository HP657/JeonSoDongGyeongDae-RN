import React from "react";
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

export default function Chatroom() {
  const chatData = [
    {
      id: 1,
      type: "user",
      message:
        "부서에서 사용 중인 물품의 탄소 발자국을 줄이는 방법은 무엇인가요?",
    },
    {
      id: 2,
      type: "response",
      message:
        "부서에서 사용 중인 물품의 탄소 발자국을 줄이기 위해서는 재활용 및 재사용을 장려하고, 친환경 제품을 선택하며, 공유 경제를 활용하여 소모품 사용을 줄이는 방법 등이 있습니다.",
    },
    {
      id: 3,
      type: "user",
      message: "우리 부서의 탄소 배출량을 측정하는 방법은 무엇인가요?",
    },
    {
      id: 4,
      type: "response",
      message:
        "부서의 탄소 배출량을 측정하려면 에너지 사용, 교통 및 출장, 폐기물 처리 등의 데이터를 수집하고, 배출 계수를 적용해 직접(Scope 1), 간접(Scope 2), 기타 간접(Scope 3) 배출량을 계산합니다.",
    },
    {
      id: 5,
      type: "response",
      message:
        "그런 다음 이를 합산하여 총 탄소 배출량을 도출하고 정기적으로 모니터링합니다.",
    },
    {
      id: 6,
      type: "user",
      message: "탄소 배출량을 줄이기 위한 구체적인 행동은 무엇인가요?",
    },
    {
      id: 7,
      type: "response",
      message:
        "탄소 배출량을 줄이기 위해 대중교통 이용, 에너지 효율적인 기기 사용, 식물 기반 식단으로의 전환 등을 고려할 수 있습니다.",
    },
    {
      id: 8,
      type: "user",
      message: "재활용을 잘하기 위한 팁이 있을까요?",
    },
    {
      id: 9,
      type: "response",
      message:
        "재활용을 잘하기 위해서는 분리배출을 철저히 하고, 재활용 가능한 품목을 잘 알고, 지역 재활용 프로그램에 참여하는 것이 중요합니다.",
    },
  ];

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
          <View style={styles.headerRight}>
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
          </View>
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
            placeholder="질문을 입력해 주세요!"
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            onPress={() => alert("질문 제출!")}
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
