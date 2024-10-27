import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import splashImage from "./../assets/co2icon.png";
import TokenValidation from "./token/TokenValidation";

export default function SplashScreen({ navigation }) {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const imageAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log(token);

        // 애니메이션 시작
        Animated.parallel([
          Animated.timing(fillAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true, // 애니메이션 성능 최적화
          }),
          Animated.timing(imageAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(async () => {
          // async 추가
          // 애니메이션 완료 후 토큰 검증
          const isValid = await TokenValidation(token); // isValid로 결과 받기
          console.log(isValid);

          if (!isValid) {
            navigation.replace("Login");
          } else {
            navigation.replace("Main");
          }
        });
      } catch (error) {
        console.log("토큰 확인 중 오류 발생:", error);
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
