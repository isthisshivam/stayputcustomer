import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default (delivery) => {
  const { title, cart, store_location, isVisible } = delivery;

  const { navigate } = useNavigation();
  return (
    <View style={[styles.top_Content, { backgroundColor: "transparent" }]}>
      {store_location == "" && <View style={{ flex: 2 }}></View>}
      <Pressable
        onPress={() =>
          navigate(assets.NavigationConstants.CHANGE_LOCATION.NAME)
        }
        style={styles.titleView}
      >
        {title?.address ? (
          <Text numberOfLines={1} style={styles.location}>
            {title?.address} {title?.apt} {title?.bussiness_name} {title?.city}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.location}>
            {title?.apt} {title?.bussiness_name} {title?.city} {title?.address}
          </Text>
        )}

        <MaterialCommunityIcons
          name="chevron-down"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={20}
          style={{ alignSelf: "center", marginRight: 5 }}
        />
      </Pressable>
      {store_location != "" && isVisible && (
        <Pressable
          onPress={() =>
            navigate(assets.NavigationConstants.CHANGE_STORE_LOCATION.NAME)
          }
          style={styles.titleView}
        >
          <Text numberOfLines={1} style={styles.location}>
            {store_location}
          </Text>

          <MaterialCommunityIcons
            name="chevron-down"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={20}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
        </Pressable>
      )}

      <Pressable
        onPress={() => navigate(assets.NavigationConstants.MY_CART.NAME)}
        style={[styles.cart_container]}
      >
        <FontAwesome5
          name="shopping-cart"
          color={assets.Colors.BACKGROUND_THEME_COLOR}
          size={18}
          style={{ alignSelf: "center" }}
        />
        {cart !== 0 && <Text style={styles.cart}> {cart}</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  top_Content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: dW(20),
    // flex: 1,
    paddingTop: dW(10),
  },
  titleView: {
    flex: 4.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    fontSize: dW(16),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    textAlign: "center",
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    //flex: 1,
    width: dW(110),
  },
  cart: {
    fontSize: dW(16),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    textAlign: "center",
    color: assets.Colors.BACKGROUND_THEME_COLOR,
  },
  cart_container: {
    flex: 1,
    backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
    paddingVertical: dW(8),
    paddingHorizontal: dW(15),
    borderRadius: dW(18),
    flexDirection: "row",
    justifyContent: "center",
  },
});
