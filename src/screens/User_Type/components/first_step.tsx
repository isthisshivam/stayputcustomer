import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import assets from "../../../assets";
import { dW, windowWidth } from "../../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import usePallete from "../../../assets/Pallete";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default ({ onSelect }) => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const { navigate, goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <FontAwesome
        name={"angle-left"}
        color={assets.Colors.BLACK_COLOR}
        size={45}
        onPress={goBack}
      />
      <Text style={styles.title}>I'm a...</Text>
      <Pressable
        style={styles.cardView}
        onPress={() => [
          onSelect(1),
          global.branchIo.logEvent("Type of Customer - Contractor", {
            customData: {
              anonymousid: global.UserId,
              referrer: null,
              screenURL: "User_Type",
            },
          }),
        ]}
      >
        <Image
          source={assets.Images.CONTRACTOR_ICON}
          style={styles.logoStyle}
        />
        <View style={styles.cardTextView}>
          <Text style={styles.titleTextView}>Contractor</Text>
          <Text style={styles.TextView}>And time is money!</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.cardView}
        onPress={() => [
          onSelect(2),
          global.branchIo.logEvent("Type of Customer - DIYer", {
            customData: {
              anonymousid: global.UserId,
              referrer: null,
              screenURL: "User_Type",
            },
          }),
        ]}
      >
        <Image source={assets.Images.DIYER_ICON} style={styles.logoStyle} />
        <View style={styles.cardTextView}>
          <Text style={styles.titleTextView}>DIYer</Text>
          <Text style={styles.TextView}>
            {"And the project isn't \ngoing to itself!"}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.cardView}
        onPress={() => [
          onSelect(3),
          global.branchIo.logEvent("Type of Customer - Neither", {
            customData: {
              anonymousid: global.UserId,
              referrer: null,
              screenURL: "User_Type",
            },
          }),
        ]}
      >
        <Image
          source={assets.Images.CONTRACTOR_ICON}
          style={styles.logoStyle}
        />
        <View style={styles.cardTextView}>
          <Text style={styles.titleTextView}>Neither</Text>
          <Text style={styles.TextView}>Just checking out!</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: windowWidth() - 0,
    paddingHorizontal: dW(15),
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    marginTop: dW(20),
  },
  title: {
    fontSize: dW(27),
    textAlign: "center",
    marginTop: dW(40),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  cardTextView: {
    width: "100%",
    //backgroundColor: 'yellow',
    padding: dW(20),
  },
  logoStyle: {
    alignSelf: "center",
    resizeMode: "contain",
    height: dW(45),
    width: dW(45),
  },
  cardView: {
    flexDirection: "row",
    paddingHorizontal: dW(20),
    paddingVertical: dW(15),
    alignItems: "center",
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    marginTop: dW(25),
    shadowColor: assets.Colors.SHADOW_COLOR,
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderRadius: dW(6),
    elevation: 5,
  },
  titleTextView: {
    fontSize: dW(18),
    fontFamily: assets.fonts.ROBOTO_BOLD,
    color: assets.Colors.BLACK_COLOR,
  },
  TextView: {
    fontSize: dW(14),
    marginTop: dW(8),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
});
