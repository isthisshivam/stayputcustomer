import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";

export default ({ onRefresh }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"Please check your internet connection"}</Text>
      <Pressable style={styles.try_again} onPress={onRefresh}>
        <Text style={styles.try_again_text}>{"Try Again"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontSize: dW(16),
  },
  try_again: {
    alignSelf: "center",
    //width:dW(10),
    marginTop: dW(30),
    borderRadius: dW(20),
    paddingHorizontal: dW(25),
    paddingVertical: dW(10),
    backgroundColor: assets.Colors.THEME_COLOR_PRIMARY,
  },
  try_again_text: {
    textAlign: "center",
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.WHITE,
    fontSize: dW(16),
  },
});
