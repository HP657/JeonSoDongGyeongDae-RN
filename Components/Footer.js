import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Footer = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.footer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        let iconName;
        let iconStyle;
        if (route.name === "Home") {
          iconName = require("../assets/home.png");
          iconStyle = isFocused ? styles.iconHomeFocused : styles.iconHome;
        } else if (route.name === "Mission") {
          iconName = require("../assets/mission.png");
          iconStyle = isFocused
            ? styles.iconMissionFocused
            : styles.iconMission;
        } else if (route.name === "Chat") {
          iconName = require("../assets/chat.png");
          iconStyle = styles.iconChat;
        } else if (route.name === "Ranking") {
          iconName = require("../assets/ranking.png");
          iconStyle = isFocused
            ? styles.iconRankingFocused
            : styles.iconRanking;
        } else if (route.name === "Points") {
          iconName = require("../assets/points.png");
          iconStyle = isFocused ? styles.iconPointsFocused : styles.iconPoints;
        }

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.link, route.name === "Chat" && styles.chatContainer]}
          >
            <View style={route.name === "Chat" ? styles.chatIconWrapper : null}>
              <Image source={iconName} style={iconStyle} />
              {route.name === "Chat" && (
                <Text style={[styles.customFont, { color: "white" }]}>
                  채팅
                </Text>
              )}
            </View>
            {route.name !== "Chat" && (
              <Text
                style={[
                  isFocused ? styles.labelFocused : styles.label,
                  styles.customFont,
                ]}
              >
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#ccc",
    height: 70,
  },
  link: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconFocused: {
    tintColor: "green",
  },
  iconHome: {
    width: 26,
    height: 26,
    marginBottom: 3,
  },
  iconHomeFocused: {
    width: 26,
    height: 26,
    marginBottom: 3,
    tintColor: "green",
  },
  iconMission: {
    width: 26,
    height: 26,
    marginBottom: 3,
    marginRight: 2,
  },
  iconMissionFocused: {
    width: 26,
    height: 26,
    marginBottom: 3,
    marginRight: 2,
    tintColor: "green",
  },
  iconChat: {
    width: 31,
    height: 24,
    marginBottom: 3,
    tintColor: "white",
  },
  iconRanking: {
    width: 25,
    height: 25,
    marginBottom: 3,
  },
  iconRankingFocused: {
    width: 25,
    height: 25,
    marginBottom: 3,
    tintColor: "green",
  },
  iconPoints: {
    width: 32,
    height: 24,
    marginBottom: 3,
  },
  iconPointsFocused: {
    width: 32,
    height: 24,
    marginBottom: 3,
    tintColor: "green",
  },
  chatContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: "100%",
    backgroundColor: "green",
    marginBottom: 10,
  },
  chatIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  chatLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    color: "gray",
  },
  labelFocused: {
    fontSize: 12,
    color: "green",
  },
  customFont: {
    fontFamily: "SUITE-Regular",
    fontWeight: "bold",
  },
});

export default Footer;
