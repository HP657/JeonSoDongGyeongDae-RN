import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const UserInfoData = {
    userName: "이효준",
  };
  return (
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
    </View>
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
});
