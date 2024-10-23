import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button } from "react-native";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";
import PointsPage from "./Components/PointsPage";
import RankingPage from "./Components/RankingPage";
import Footer from "./Components/Footer";
import SplashScreen from "./Components/SplashScreen";
import { useCameraPermissions } from "expo-camera";
import MissionPage from "./Components/MissionPage";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <Footer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ tabBarLabel: "홈" }}
      />
      <Tab.Screen
        name="Mission"
        component={MissionPage}
        options={{ tabBarLabel: "미션" }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatPage}
        options={{ tabBarLabel: "채팅" }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingPage}
        options={{ tabBarLabel: "랭킹" }}
      />
      <Tab.Screen
        name="Points"
        component={PointsPage}
        options={{ tabBarLabel: "포인트 상점" }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  if (cameraPermission === null) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>카메라 사용을 위한 권한이 필요합니다.</Text>
        <Button title="권한 요청" onPress={requestCameraPermission} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
