import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import assets from "../../../assets";
import { dW } from "../../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default ({ title, subtitle, border }) => {
  const [hide_text, setShowText] = useState(false);
  const { goBack } = useNavigation();
  return (
    <View
      style={[
        styles.inner_container,
        { borderBottomWidth: border === false ? null : dW(0.8) },
      ]}
    >
      <Text style={styles.left}>{title}</Text>
      <Pressable
        onPress={() => setShowText(!hide_text)}
        style={{ alignSelf: "flex-start", width: "45%" }}
      >
        <Text numberOfLines={hide_text === false ? 1 : 8} style={styles.right}>
          {subtitle}
        </Text>
        <MaterialIcons
          name={
            hide_text === false ? "keyboard-arrow-down" : "keyboard-arrow-up"
          }
          color={assets.Colors.Product_INPUT_HOLDER_TXT}
          size={dW(25)}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inner_container: {
    padding: dW(10),
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: assets.Colors.INPUT_BORDER_COLOR,
  },
  left: {
    textAlign: "center",
    fontSize: dW(15),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
  right: {
    textAlign: "center",
    fontSize: dW(15),
    color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
});
