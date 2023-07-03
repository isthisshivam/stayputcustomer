import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default ({ title, location, subtitle, icon }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable onPress={goBack}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={35}
          style={{ alignSelf: "center" }}
        />
      </Pressable>
      <View style={styles.location}>
        <Text style={styles.title}>{title}</Text>
        {location == true ? (
          <Text style={styles.subtitle}>{subtitle}</Text>
        ) : null}
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: dW(18),
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
    shadowOffset: {
      width: dW(0),
      height: dW(8),
    },
    shadowRadius: dW(5),
    shadowOpacity: dW(0.6),
    elevation: 5,
    // backgroundColor:'#0000'
  },
  title: {
    alignSelf: "center",
    fontSize: dW(22),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
  },
  location: {
    flexdirection: "column",
    alignSelf: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: dW(12),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    marginTop: dW(5),
  },
});
