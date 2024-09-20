import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const MissionPage = () => (
  <View style={styles.container}>
    <View style={styles.titleRow}>
      <Text style={styles.title}>오늘의 </Text>
      <Text style={styles.title_sub}>추천 미션</Text>
    </View>
    <TouchableOpacity style={{ zIndex: 0 }} onPress={() => alert("gd")}>
      <View style={styles.card}>
        <Image
          source={require("./../assets/missionMain.png")}
          style={styles.MainImage}
        />

        <View style={styles.row}>
          <Text style={styles.aiSuggestion}>AI 추천</Text>
          <Text style={styles.points}>320P</Text>
        </View>

        <Text style={styles.missionTitle}>고효율 전자기기 사용하기</Text>

        <Text style={styles.description}>
          에너지 소비 효율 등급이 높은 고효율 전자기기를 사용하면 많은 탄소량을
          절감할 수 있어요!
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start", // Align items to the left
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16, // Space between title and card
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Keep items spaced evenly
    width: "100%", // Ensure the row takes full width
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title_sub: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    alignItems: "center",
  },
  MainImage: {
    width: 325,
    height: 150,
  },
  aiSuggestion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  missionTitle: {
    fontSize: 20,
    alignSelf: "flex-start",
  },
  points: {
    fontSize: 16,
    color: "blue",
  },
  description: {
    fontSize: 14,
  },
});

export default MissionPage;
