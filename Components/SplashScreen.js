import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import splashImage from "./../assets/co2icon.png";

export default function SplashScreen({ navigation }) {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const imageAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      if (true) {
        navigation.replace("Login");
      } else {
        navigation.replace("Main");
      }
    });
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
