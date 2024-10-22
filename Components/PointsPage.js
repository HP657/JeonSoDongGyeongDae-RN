import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>포인트 상점</Text>
      </View>
      <ScrollView>
        <Text style={styles.sectionTitle}>인기 상품권</Text>
        <View style={{ height: 100 }}>
          <ScrollView horizontal={true} style={styles.coupons_container}>
            {coupons.map((coupon, index) => (
              <View key={index} style={styles.coupon_itemContainer}>
                <View style={[styles.row, { justifyContent: "flex-end" }]}>
                  <Text style={styles.coupon_detail}>{coupon.detail}</Text>
                  <Text style={styles.coupon_points}>{coupon.points}</Text>
                </View>
                <View style={styles.coupon_container}>
                  <Image source={coupon.image} style={styles.coupon_image} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <Image
          source={require("./../assets/contour.png")}
          style={styles.contour}
        />
        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
          친환경 인기 상품
        </Text>
        <View style={{ height: 230 }}>
          <ScrollView horizontal={true} style={styles.coupons_container}>
            {products.map((product, index) => (
              <View key={index} style={styles.product_itemContainer}>
                <Image source={product.image} style={styles.product_image} />
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.product_detail}>{product.detail}</Text>
                </View>
                <View style={[styles.row, { justifyContent: "flex-end" }]}>
                  <Text style={styles.product_discount}>
                    {product.discount}
                  </Text>
                  {product.sale_price !== "" ? (
                    <Text style={styles.product_price}>{product.price}</Text>
                  ) : (
                    <Text style={styles.product_sale_price}>
                      {product.price}
                    </Text>
                  )}
                  <Text style={styles.product_sale_price}>
                    {product.sale_price}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <Image
            source={require("./../assets/contour.png")}
            style={styles.contour}
          />
        </View>
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
    marginBottom: 25,
  },
  coupon_image: {
    width: 100,
    height: 45,
  },
  coupon_detail: {
    fontSize: 9,
    marginTop: 5,
    marginLeft: 20,
    color: "#A3A3A3",
  },
  coupon_points: {
    marginLeft: 5,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
  },
  coupon_container: {
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
  coupons_container: {
    marginLeft: 5,
  },
  product_image: {
    width: 120,
    height: 170,
    borderRadius: 8,
  },
  product_detail: {
    fontWeight: "bold",
    fontSize: 10,
  },
  product_discount: {
    color: "red",
    fontWeight: "bold",
    fontSize: 10,
  },
  product_price: {
    fontWeight: "bold",
    fontSize: 8,
    color: "#9B9B9B",
    textDecorationLine: "line-through",
    marginTop: 2,
    marginLeft: 10,
  },
  product_sale_price: {
    fontWeight: "bold",
    fontSize: 10,
    marginLeft: 3,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: "16",
    marginLeft: 15,
  },
  coupon_itemContainer: {
    marginRight: 10,
  },
  product_itemContainer: {
    marginLeft: 10,
  },
  contour: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PointsPage;
