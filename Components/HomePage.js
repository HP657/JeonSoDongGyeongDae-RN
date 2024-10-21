import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState(0); // State for selected tab
  const [inputValue, setInputValue] = useState(""); // State for user input
  const UserInfoData = {
    userName: "이효준",
  };

  const tabs = ["전기", "가스", "수도", "교통", "폐기물"];
  const tabWidth = 300 / tabs.length;

  // Example data for each tab
  const data = [
    { unit: "kwh", factor: 0.478 },
    { unit: "m³", factor: 2.4 },
    { unit: "L", factor: 0.025 },
    { unit: "km", factor: 0.3 },
    { unit: "kg", factor: 0.5 },
  ];

  const calculateEmissions = (value, factor) => {
    return (parseFloat(value) * factor).toFixed(2);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerContainter}>
          <TouchableOpacity>
            <Image
              source={require("./../assets/Logo.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("./../assets/user-icon.png")}
              style={styles.headerUserImage}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.greetUserName}>{UserInfoData.userName}</Text>
            <Text style={styles.greetText}>님, 반가워요!</Text>
          </View>
          <Text style={styles.greetContent}>
            오늘도 탄소 절감을 위해 열심히 달려볼까요?
          </Text>
        </View>
        <View style={styles.calculatorContainer}>
          <Text style={styles.calculatorTitle}>탄소발자국 계산기</Text>
          <View style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedTab(index);
                  setInputValue("");
                }}
                style={styles.tab}
              >
                <Text style={styles.tabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={[
              styles.arrow,
              { left: selectedTab * tabWidth + tabWidth - 17 },
            ]}
          />
          <View style={styles.dataContainer}>
            <Text style={[styles.dataLabel, { marginTop: 30 }]}>
              {tabs[selectedTab]} 사용량 ({data[selectedTab].unit})
            </Text>
            <View
              style={[
                styles.row,
                {
                  backgroundColor: "#FFFFFF",
                  justifyContent: "flex-end",
                  borderRadius: 10,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder={`Enter `}
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
              />
              <Text style={styles.inputUnit}>
                {data[selectedTab].unit} / 월
              </Text>
            </View>
            <Text style={styles.dataLabel}>CO₂ 발생량 (kg)</Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#FFFFFF",
                alignContent: "center",
              }}
            >
              <Text style={[styles.dataValue, { lineHeight: 35 }]}>
                {inputValue
                  ? calculateEmissions(inputValue, data[selectedTab].factor)
                  : "0.00"}{" "}
                kg / 월
              </Text>
            </View>
            <Text style={styles.note}>
              {tabs[selectedTab]} CO₂ 발생량 계산 | 사용량 *{" "}
              {data[selectedTab].factor}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
  },
  headerContainter: {
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
  headerUserImage: {
    marginTop: 22,
    width: 25,
    height: 25,
  },
  greetUserName: {
    color: "#1C8433",
    fontSize: 28,
    fontWeight: "bold",
    bottom: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  greetText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  greetContent: {
    fontSize: 15,
    color: "#767676",
    marginLeft: 11,
  },
  calculatorContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#4CAF50",
    height: 38,
    width: 300,
    alignSelf: "center",
    borderRadius: 20,
    zIndex: 2,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  arrow: {
    bottom: 11, // Position it below the tabs
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 15,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#4CAF50",
    zIndex: 3,
  },
  dataContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    zIndex: 1,
    bottom: 50,
  },
  dataLabel: {
    fontSize: 14,
    color: "#1C8433",
    fontWeight: "bold",
  },
  dataValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    height: 35,
    textAlign: "right",
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 0,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
  },
  note: {
    fontSize: 12,
    marginTop: 10,
    color: "#767676",
    textAlign: "center",
  },
  inputUnit: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
    marginRight: 10,
  },
});
