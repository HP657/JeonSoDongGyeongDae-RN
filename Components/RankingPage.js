import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RankingPage = () => {
  const [userData, setUserData] = useState(null);
  const [myData, setMyData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      setToken(token);

      console.log(token);
      if (token) {
        try {
          const userResponse = await axios(
            `${API_URL}/component/ranking/get/rankings`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const modifiedData = userResponse.data.map((item) => ({
            ...item,
            id: item.user_id,
            rank: item.ranking,
          }));
          setUserData(modifiedData);
          console.log("User Data:", modifiedData); // Log the fetched user data
        } catch (error) {
          console.error("Error fetching user data:", error);
        }

        try {
          const myResponse = await axios(
            `${API_URL}/component/ranking/get/my`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMyData(myResponse.data);
          console.log("My Data:", myResponse.data); // Log the fetched my data
        } catch (error) {
          console.error("Error fetching my data:", error);
        }
      }
    };

    fetchData();
  }, []); // Run this effect once on component mount

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
        <Text style={styles.name}>{item.id}</Text>
        <Text style={styles.department}>{item.department}</Text>
      </View>
      <Text style={styles.count}>{item.count}개</Text>
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
      </View>
      <View style={styles.bg}>
        <View style={styles.myRank}>
          <View style={styles.myRankInfo}>
            <Text style={styles.myRankText}>내 순위</Text>
            <Text style={styles.myRankPosition}>{myData?.ranking}등</Text>
            <Text style={styles.myRankCount}>{myData?.count}개</Text>
          </View>
        </View>
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            <View style={{ marginBottom: 10, marginTop: 10 }} />
          }
        />
      </View>
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
    fontSize: 16,
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
  bg: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  myRank: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#319E49",
    marginHorizontal: 10,
    borderRadius: 15,
    marginTop: 10,
    height: 45,
  },
  myRankText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  myRankPosition: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  myRankCount: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 193,
  },
  myRankInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    height: 45,
    marginHorizontal: 10,
    marginTop: 4,
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
  prizeIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
    marginRight: 4,
  },
});

export default RankingPage;
