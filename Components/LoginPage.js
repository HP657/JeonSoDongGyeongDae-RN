import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { API_URL } from "@env";

const LoginPage = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/sales/auth/login`, {
        user_id: id,
        user_pw: password,
      });

      const { access_token } = response.data;
      await AsyncStorage.setItem("accessToken", access_token);

      console.log("로그인 성공, 토큰 저장 완료");
      navigation.replace("Main");
    } catch (error) {
      console.log("로그인 실패:", error);
    }
  };

  const navigate_SignUp = () => {
    navigation.replace("SignUp");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>로그인 페이지</Text>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={id}
          onChangeText={(text) => setId(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.signUpText}>회원이 아니시라면 </Text>
          <TouchableOpacity onPress={navigate_SignUp}>
            <Text style={styles.signUpText_navigater}>회원가입</Text>
          </TouchableOpacity>
          <Text style={styles.signUpText}> 하러가기</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  loginButton: {
    width: 300,
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 75,
  },
  signUpText: {
    color: "#767676",
  },
  signUpText_navigater: {
    color: "#000",
    marginTop: 1,
  },
});

export default LoginPage;
