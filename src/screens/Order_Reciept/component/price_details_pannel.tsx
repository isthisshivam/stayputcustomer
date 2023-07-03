import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import assets from "../../../assets";
import { dW } from "../../../utils/dynamicHeightWidth";

export const Price_pannel = ({ title, price, total }) => {
  return (
    <View>
      {total == false ? (
        <View>
          <View style={styles.subtotal_content}>
            <Text
              style={[styles.msg, { color: assets.Colors.PRICE_DETAILS_CLR }]}
            >
              {title}
            </Text>
            <Text style={styles.msg}>{price}</Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={[styles.subtotal_content, { paddingVertical: dW(20) }]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{price}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subtotal_content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  msg: {
    fontSize: dW(14),
    color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    paddingVertical: dW(5),
  },
  title: {
    fontSize: dW(18),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
  },
});
