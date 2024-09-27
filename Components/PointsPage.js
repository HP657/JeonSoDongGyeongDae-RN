import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

const PointsPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>포인트 상점</Text>
      </View>
      <ScrollView horizontal={true}>
        <Image
          source={require("./../assets/mission1.png")}
          style={styles.image}
        />
        <Image
          source={require("./../assets/mission2.png")}
          style={styles.image}
        />
        <Image
          source={require("./../assets/mission3.png")}
          style={styles.image}
        />
      </ScrollView>
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
  image: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginRight: 10, // Space between images
  },
});

export default PointsPage;
