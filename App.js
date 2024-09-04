import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./Components/HomePage";
import MissionPage from "./Components/MissionPage";
import ChatPage from "./Components/ChatPage";
import PointsPage from "./Components/PointsPage";
import RankingPage from "./Components/RankingPage";
import Footer from "./Components/Footer";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{ tabBarLabel: "홈", headerShown: false }}
        />
        <Tab.Screen
          name="Mission"
          component={MissionPage}
          options={{ tabBarLabel: "미션", headerShown: false }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatPage}
          options={{ tabBarLabel: "채팅", headerShown: false }}
        />
        <Tab.Screen
          name="Ranking"
          component={RankingPage}
          options={{ tabBarLabel: "랭킹", headerShown: false }}
        />
        <Tab.Screen
          name="Points"
          component={PointsPage}
          options={{ tabBarLabel: "포인트 상점", headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
