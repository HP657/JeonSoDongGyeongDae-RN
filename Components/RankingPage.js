import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const data = [
  {
    id: "1",
    name: "정과장",
    department: "AI 개발 1팀",
    count: 27,
    change: 3,
    rank: 1,
  },
  {
    id: "2",
    name: "이대리",
    department: "마케팅 2팀",
    count: 21,
    change: 1,
    rank: 2,
  },
  {
    id: "3",
    name: "김사원",
    department: "AI 개발 2팀",
    count: 13,
    change: 1,
    rank: 3,
  },
  {
    id: "4",
    name: "천연 수세미",
    department: "마케팅 3팀",
    count: 11,
    change: 0,
    rank: 4,
  },
  {
    id: "5",
    name: "정대리",
    department: "마케팅 인사팀",
    count: 10,
    change: 1,
    rank: 5,
  },
  {
    id: "6",
    name: "탄소시리",
    department: "환경 마케팅 팀",
    count: 9,
    change: 1,
    rank: 6,
  },
  {
    id: "7",
    name: "윤과장",
    department: "AI 개발 1팀",
    count: 9,
    change: 0,
    rank: 7,
  },
  {
    id: "8",
    name: "탄소발자국",
    department: "환경 마케팅 팀",
    count: 7,
    change: 1,
    rank: 8,
  },
  {
    id: "9",
    name: "이산화",
    department: "마케팅 인사팀",
    count: 7,
    change: 0,
    rank: 9,
  },
  {
    id: "10",
    name: "박대리",
    department: "AI 개발 3팀",
    count: 6,
    change: 1,
    rank: 10,
  },
  {
    id: "11",
    name: "최사원",
    department: "마케팅 1팀",
    count: 6,
    change: 0,
    rank: 11,
  },
  {
    id: "12",
    name: "김과장",
    department: "AI 개발 2팀",
    count: 5,
    change: 1,
    rank: 12,
  },
  {
    id: "13",
    name: "이사원",
    department: "마케팅 2팀",
    count: 5,
    change: 0,
    rank: 13,
  },
  {
    id: "14",
    name: "정사원",
    department: "AI 개발 1팀",
    count: 4,
    change: 1,
    rank: 14,
  },
  {
    id: "15",
    name: "박과장",
    department: "환경 마케팅 팀",
    count: 4,
    change: 0,
    rank: 15,
  },
  {
    id: "16",
    name: "최대리",
    department: "마케팅 3팀",
    count: 3,
    change: 1,
    rank: 16,
  },
  {
    id: "17",
    name: "김대리",
    department: "AI 개발 3팀",
    count: 3,
    change: 0,
    rank: 17,
  },
  {
    id: "18",
    name: "이과장",
    department: "마케팅 인사팀",
    count: 2,
    change: 1,
    rank: 18,
  },
  {
    id: "19",
    name: "정사원",
    department: "환경 마케팅 팀",
    count: 2,
    change: 0,
    rank: 19,
  },
  {
    id: "20",
    name: "박사원",
    department: "AI 개발 2팀",
    count: 1,
    change: 1,
    rank: 20,
  },
];

const RankingPage = () => {
  const [selectedTab, setSelectedTab] = useState("개인");

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {item.rank === 1 && (
        <Image
          source={require("./../assets/prize1.png")}
          style={styles.prizeIcon}
        />
      )}
      {item.rank === 2 && (
        <Image
          source={require("./../assets/prize2.png")}
          style={styles.prizeIcon}
        />
      )}
      {item.rank === 3 && (
        <Image
          source={require("./../assets/prize3.png")}
          style={styles.prizeIcon}
        />
      )}
      {item.rank > 3 && <Text style={styles.rank}>{item.rank}</Text>}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.department}>{item.department}</Text>
      </View>
      <Text style={styles.count}>{item.count}개</Text>
      <Text style={styles.change}>
        {item.change > 0 ? `▲${item.change}` : `▼${Math.abs(item.change)}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>랭킹</Text>
        <View style={styles.headerContent}>
          <Image
            source={require("./../assets/header-icon.png")}
            style={styles.headerIcon}
          />
          <Text style={styles.headerMessage}>
            지난 달, 총 <Text style={styles.highlight}>397명</Text>이 {"\n"}탄소
            절감 미션을 수행했어요!
          </Text>
          <Image
            source={require("./../assets/running-icon.png")}
            style={styles.runningIcon}
          />
        </View>
        <View style={styles.tabs}>
          <Text
            style={[styles.tab, selectedTab === "기업" && styles.activeTab]}
            onPress={() => setSelectedTab("기업")}
          >
            기업
          </Text>
          <Text
            style={[styles.tab, selectedTab === "부서" && styles.activeTab]}
            onPress={() => setSelectedTab("부서")}
          >
            부서
          </Text>
          <Text
            style={[styles.tab, selectedTab === "개인" && styles.activeTab]}
            onPress={() => setSelectedTab("개인")}
          >
            개인
          </Text>
        </View>
      </View>
      <View style={styles.myRank}>
        <Text style={styles.myRankText}>내 순위</Text>
        <Text style={styles.myRankPosition}>6등</Text>
        <Text style={styles.myRankCount}>7월 기준 9개</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  headerIcon: {
    width: 47,
    height: 64,
    marginHorizontal: 10,
  },
  runningIcon: {
    width: 40,
    height: 68,
    marginHorizontal: 10,
  },
  headerMessage: {
    fontSize: 16,
    textAlign: "center",
  },
  highlight: {
    color: "green",
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 20,
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 30,
    color: "gray",
  },
  activeTab: {
    color: "green",
    fontWeight: "bold",
  },
  myRank: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e0f7e0",
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  myRankText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  myRankPosition: {
    fontSize: 16,
    color: "green",
  },
  myRankCount: {
    fontSize: 16,
    color: "gray",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  department: {
    fontSize: 14,
    color: "#666",
  },
  count: {
    fontSize: 16,
    fontWeight: "bold",
  },
  change: {
    fontSize: 16,
    color: "red",
  },
  prizeIcon: {
    width: 23,
    height: 23,
    marginLeft: 5,
    marginRight: 4,
  },
});

export default RankingPage;
