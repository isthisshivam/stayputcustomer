import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";

import { dW } from "../../../utils/dynamicHeightWidth";
export const Billing_Address_pannel = ({
  data,
  onSelect,
  onAddNewAddClick,
}) => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.address_list}>
      {data.map((item) => {
        return (
          <Pressable onPress={() => onSelect(item)} style={styles.billing_view}>
            <Text numberOfLines={1} style={styles.address}>
              {item.address}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.address, { color: "gray", marginTop: 3 }]}
            >
              {item?.apt} {item?.bussiness_name} {item?.zip} {item?.state + " "}
              {item?.city}
            </Text>
          </Pressable>
        );
      })}
      <Text
        onPress={() =>
          onAddNewAddClick
            ? [
                onAddNewAddClick(),
                navigate(assets.NavigationConstants.FULL_DELIVERY_ADDRESS.NAME),
              ]
            : navigate(assets.NavigationConstants.FULL_DELIVERY_ADDRESS.NAME)
        }
        style={styles.addAddress}
      >
        Add new address
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  address_list: {
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    paddingVertical: dW(15),
    paddingHorizontal: dW(5),
    marginTop: dW(10),
    borderRadius: dW(5),
    shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
    shadowOffset: {
      width: dW(0),
      height: dW(1),
    },
    shadowRadius: dW(8),
    shadowOpacity: dW(0.8),
    elevation: 4,
  },
  billing_view: {
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    paddingVertical: dW(8),
    alignItems: "flex-start",
    borderBottomWidth: dW(0.4),
    paddingLeft: dW(10),
    borderColor: assets.Colors.INPUT_BORDER_COLOR,
  },
  address: {
    fontSize: dW(14),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  addAddress: {
    fontSize: dW(14),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.SIGN_IN_COLOR,
    marginTop: dW(15),
    alignSelf: "flex-end",
  },
});
