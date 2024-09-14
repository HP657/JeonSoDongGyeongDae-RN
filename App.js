import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./Components/HomePage";
import MissionPage from "./Components/MissionPage";
import ChatPage from "./Components/ChatPage";
import PointsPage from "./Components/PointsPage";
import RankingPage from "./Components/RankingPage";
import Footer from "./Components/Footer";
import SplashScreen from "./Components/SplashScreen";

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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
