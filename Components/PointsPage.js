import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import API from "./API/API";

const coupons = [
  {
    detail: "모바일 문화상품권",
    points: "9,500P",
    image: require("./../assets/play_store_coupon.png"),
  },
  {
    detail: "구글 플레이",
    points: "9,500P",
    image: require("./../assets/starbucks_coupon.png"),
  },
  {
    detail: "스타벅스",
    points: "9,500P",
    image: require("./../assets/cultureland_coupon.png"),
  },
];

const products = [
  {
    detail: "제로웨이스트 휴대용 손비누",
    price: "22,200원",
    sale_price: "12,000원",
    discount: "45%",
    image: require("./../assets/soap1.png"),
  },
  {
    detail: "생분해 루파 수세미 3종",
    price: "3,000원",
    sale_price: "1,300원",
    discount: "56%",
    image: require("./../assets/scrubber.png"),
  },
  {
    detail: "비건 유안재 천연비누",
    price: "1,900원",
    sale_price: "",
    discount: "",
    image: require("./../assets/soap2.png"),
  },
];

const PointsPage = () => {
  const [myPoint, setMyPoint] = useState(0);

  useEffect(() => {
    async function getMyPoint() {
      try {
        const response = await API("/sales/point/get", "GET", null, true);
        setMyPoint(response.data.data.point);
      } catch (error) {
        console.error("Failed to fetch my point:", error);
      }
    }
    getMyPoint();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>포인트 상점</Text>
        <Text style={styles.myPoint}>보유중인 포인트 : {myPoint}</Text>
      </View>
      <ScrollView>
        <Text style={styles.sectionTitle}>인기 상품권</Text>
        <ScrollView horizontal style={styles.couponsContainer}>
          {coupons.map((coupon, index) => (
            <View key={index} style={styles.couponItemContainer}>
              <View style={[styles.row, { justifyContent: "flex-end" }]}>
                <Text style={styles.couponDetail}>{coupon.detail}</Text>
                <Text style={styles.couponPoints}>{coupon.points}</Text>
              </View>
              <View style={styles.couponContainer}>
                <Image source={coupon.image} style={styles.couponImage} />
              </View>
            </View>
          ))}
        </ScrollView>
        <Image
          source={require("./../assets/contour.png")}
          style={styles.contour}
        />

        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
          친환경 인기 상품
        </Text>
        <ScrollView horizontal style={styles.couponsContainer}>
          {products.map((product, index) => (
            <View key={index} style={styles.productItemContainer}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.productDetail}>{product.detail}</Text>
              <View style={[styles.row, { justifyContent: "flex-end" }]}>
                <Text style={styles.productDiscount}>{product.discount}</Text>
                <Text
                  style={
                    product.sale_price
                      ? styles.productPrice
                      : styles.productSalePrice
                  }
                >
                  {product.price}
                </Text>
                {product.sale_price && (
                  <Text style={styles.productSalePrice}>
                    {product.sale_price}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <Image
          source={require("./../assets/contour.png")}
          style={styles.contour}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { alignItems: "center", paddingTop: 50, paddingBottom: 20 },
  headerText: { fontSize: 16, fontWeight: "bold" },
  myPoint: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginLeft: 15 },
  couponsContainer: { marginLeft: 5, marginBottom: 10 },
  couponItemContainer: { marginRight: 10 },
  couponContainer: {
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderRadius: 8,
    width: 120,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginLeft: 15,
  },
  couponImage: { width: 100, height: 45 },
  couponDetail: { fontSize: 9, color: "#A3A3A3" },
  couponPoints: { fontSize: 15 },
  row: { flexDirection: "row" },
  productItemContainer: { marginLeft: 10 },
  productImage: { width: 120, height: 170, borderRadius: 8 },
  productDetail: { fontWeight: "bold", fontSize: 10 },
  productDiscount: { color: "red", fontWeight: "bold", fontSize: 10 },
  productPrice: {
    textDecorationLine: "line-through",
    color: "#9B9B9B",
    fontSize: 8,
  },
  productSalePrice: { fontSize: 10, marginLeft: 3, fontWeight: "bold" },
  contour: { marginVertical: 10, alignSelf: "center", width: 1000000 },
});

export default PointsPage;
