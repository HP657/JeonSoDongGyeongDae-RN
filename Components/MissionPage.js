import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CameraPage from "./CameraPage";

const MainMissionPage = ({ setShowCameraPage }) => {
  const [activeTab, setActiveTab] = useState("일일");
  const missions = [
    {
      missionclass: "에너지",
      title: "컴퓨터 절전기능 사용하기",
      description: "사용하지 않는 컴퓨터 절전 모드로 변경하기",
      image: require("./../assets/mission1.png"),
    },
    {
      missionclass: "소비",
      title: "저탄소 식단 운영하기",
      description: "탄소를 많이 배출하지 않는 식단으로 식사 구성하기",
      image: require("./../assets/mission2.png"),
    },
    {
      missionclass: "소비",
      title: "탄소를 고려한 소비 촉진하기",
      description: "탄소 발자국을 최소화한 소비 촉진하기",
      image: require("./../assets/mission3.png"),
    },
  ];

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>나의 미션</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 90,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>오늘의 </Text>
          <Text style={styles.title_sub}>추천 미션</Text>
        </View>
        <TouchableOpacity
          style={{ zIndex: 0 }}
          onPress={() => setShowCameraPage(true)} // 카메라 페이지를 표시
        >
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
              에너지 소비 효율 등급이 높은 고효율 전자기기를 사용하면 많은
              탄소량을 절감할 수 있어요!
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <View style={styles.tabWrapper}>
            {["일일", "주간", "월간"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab, // 활성화된 탭 스타일
                ]}
                onPress={() => setActiveTab(tab)} // 탭 클릭 시 상태 변경
              >
                <Text
                  style={
                    activeTab === tab ? styles.activeTabText : styles.tabText
                  }
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.missionList}>
          {missions.map((mission, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.missionCard}>
                <View style={styles.missionContent}>
                  <Text style={styles.missionClass}>
                    {mission.missionclass}
                  </Text>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Text style={styles.description}>{mission.description}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.authButton]}
                    >
                      <Text style={styles.buttonText}>인증하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.confirmButton]}
                    >
                      <Text style={styles.confirmButtonText}>확인하기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Image source={mission.image} style={styles.missionImage} />
              </TouchableOpacity>
              {index < missions.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const MissionPage = () => {
  const [showCameraPage, setShowCameraPage] = useState(false);

  return (
    <View style={styles.container}>
      {showCameraPage ? (
        <CameraPage setShowCameraPage={setShowCameraPage} />
      ) : (
        <MainMissionPage setShowCameraPage={setShowCameraPage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },

  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 50,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
    backgroundColor: "#FFFFFF",
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
  missionClass: {
    fontSize: 10,
    color: "#319E49",
  },
  missionTitle: {
    fontSize: 16,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  points: {
    fontSize: 16,
    color: "blue",
  },
  description: {
    fontSize: 10,
    color: "#767676",
  },
  missionList: {
    paddingTop: 15,
    width: "100%",
    top: -15,
    zIndex: 0,
    borderRadius: "10%",
    backgroundColor: "#F1F1F1",
  },
  missionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  missionContent: {
    flex: 1,
    justifyContent: "center",
  },
  missionImage: {
    width: 100, // 이미지 크기 조정
    height: "auto",
    borderRadius: 8,
    marginLeft: 10, // 이미지와 텍스트 간격
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 8,
    right: 10,
  },
  button: {
    borderRadius: "10%",
    padding: 8,
    marginHorizontal: 5,
  },
  authButton: {
    backgroundColor: "green", // 인증하기 버튼 배경색
  },
  confirmButton: {
    backgroundColor: "white", // 확인하기 버튼 배경색
  },
  buttonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  confirmButtonText: {
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
  },
  tabContainer: {
    width: "50%",
    alignSelf: "center",
    marginTop: 16,
    zIndex: 1,
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: "12%",
    overflow: "hidden",
    height: 30,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  activeTab: {
    backgroundColor: "green",
    borderRadius: "10%",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "white",
  },
  tabText: {
    fontWeight: "bold",
    color: "black",
  },
  header: {
    position: "absolute", // 헤더를 고정
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 1, // 다른 요소 위에 표시
  },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
    width: "100%",
  },
});

export default MissionPage;
