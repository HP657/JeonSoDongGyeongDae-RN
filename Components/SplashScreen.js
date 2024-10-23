import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트
import splashImage from "./../assets/co2icon.png";

export default function SplashScreen({ navigation }) {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const imageAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        // AsyncStorage에서 토큰 불러오기
        const token = await AsyncStorage.getItem("accessToken");

        // 애니메이션 시작
        Animated.parallel([
          Animated.timing(fillAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(imageAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]).start(() => {
          // 토큰이 있으면 Main으로, 없으면 Login으로 이동
          if (token) {
            navigation.replace("Main");
          } else {
            navigation.replace("Login");
          }
        });
      } catch (error) {
        console.log("토큰 확인 중 오류 발생:", error);
        // 오류가 발생한 경우 Login으로 이동
        navigation.replace("Login");
      }
    };

    checkTokenAndNavigate(); // 토큰 확인 함수 호출
  }, [fillAnimation, imageAnimation, navigation]);

  const fillBackgroundColor = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#00A34F", "#27b338"],
  });

  const imageScale = imageAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: fillBackgroundColor,
            transform: [
              {
                translateY: fillAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [800, 0],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.Image
        style={[styles.image, { transform: [{ scale: imageScale }] }]}
        source={splashImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A8D08D",
  },
  fill: {
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  image: {
    width: 200,
    height: 400,
    resizeMode: "contain",
    zIndex: 1,
  },
});
