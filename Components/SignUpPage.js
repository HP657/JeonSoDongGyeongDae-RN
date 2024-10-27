import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import API from "./API/API";

const SignUpPage = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    try {
      const SignUp_response = await API("/sales/auth/register", "POST", {
        user_id: id,
        role_type: "sales",
        user_pw: password,
        user_name: username,
        user_code: companyCode,
        user_role: "사원",
      });
      console.log(SignUp_response.data);
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
      alert("뭔가 잘못됨");
    }
  };

  const navigate_Login = () => {
    navigation.replace("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입 페이지</Text>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={id}
          onChangeText={(text) => setId(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="UserName"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Code"
          value={companyCode}
          onChangeText={(text) => setCompanyCode(text)}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>회원가입</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.loginText}>이미 회원이시라면 </Text>
          <TouchableOpacity onPress={navigate_Login}>
            <Text style={styles.loginText_navigater}>로그인</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}> 하러가기</Text>
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
  signUpButton: {
    width: 300,
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginLeft: 75,
    marginTop: 10,
  },
  loginText: {
    color: "#767676",
  },
  loginText_navigater: {
    color: "#000",
    marginTop: 1,
  },
});

export default SignUpPage;
