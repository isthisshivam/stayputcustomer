import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import useStyle from "../screens/Home_Page/components/componentStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import usePallete from "../assets/Pallete";
import {
  MARK_AS_FAV,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../Services/rest/api";
import { showToastMessage } from "../utils/utilities";

const styles = useStyle();
const BoosterItems = ({ item, depot, Count, onRefresh }) => {
  const { navigate } = useNavigation();
  const pallete = usePallete();
  const [favourite, setFavourite] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isCartUpdated, setCartUpdated] = useState(false);

  const fav_product_payload = {
    product_id: item.id,
    store: depot,
  };
  const add_to_cart_payload = {
    product_id: item.id,
    qty: quantity,
    store: depot,
    store_location_id: global?.location_id,
    hd_id: item?.hd_id,
  };
  const remove_cart = {
    id: item.id,
    store: depot,
  };
  const {
    data: f_data,
    loading: f_loading,
    error: f_error,
    fetchData: f_fetchData,
    responseCode: f_responseCode,
  } = useRest({
    URL: MARK_AS_FAV,
    PAYLOAD: fav_product_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  const {
    data: c_data,
    loading: c_loading,
    error: c_error,
    fetchData: c_fetchData,
    responseCode: c_responseCode,
  } = useRest({
    URL: ADD_TO_CART,
    PAYLOAD: add_to_cart_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  const {
    data: r_data,
    loading: r_loading,
    error: r_error,
    fetchData: r_fetchData,
    responseCode: r_responseCode,
  } = useRest({
    URL: REMOVE_FROM_CART,
    PAYLOAD: remove_cart,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    setFavourite(item.favourite);
    setQuantity(item.cart_count);
  }, [item]);
  useEffect(() => {
    if (f_data) {
      setFavourite(f_data?.data?.status);
      setTimeout(() => {
        showToastMessage(f_data?.message);
      }, 100);
    }
  }, [f_data, f_error, f_responseCode]);

  useEffect(() => {
    if (c_data) {
      setTimeout(() => {
        showToastMessage(c_data?.message);
        setCartUpdated(false);
      }, 100);
      if (c_responseCode) {
        if (c_responseCode != 400) {
          onRefresh();
        } else if (c_responseCode == 400) {
          setQuantity("0");
        }
      }
    }
  }, [c_data, c_error, c_responseCode]);

  useEffect(() => {
    if (quantity !== "0" && isCartUpdated) {
      c_fetchData(0);
    } else if (quantity === "0" && isRemoved) {
      r_fetchData(0);
    }
  }, [quantity]);

  useEffect(() => {
    if (r_data) {
      setIsRemoved(false);
      setTimeout(() => {
        showToastMessage(r_data?.message);
      }, 100);
      if (r_responseCode) {
        if (r_responseCode != 400) {
          onRefresh();
        }
      }
    }
  }, [r_data, r_error, r_responseCode]);

  return (
    <Pressable
      onPress={() => [
        navigate(assets.NavigationConstants.PRODUCT_DETAIL.NAME, {
          prod_id: item.id,
          store: depot,
          cart: quantity,
          cartcount: Count,
          hd_id: item?.hd_id,
        }),
      ]}
      style={styles.booster_container}
    >
      <Image
        source={{ uri: item.images[0] }}
        resizeMode="cover"
        style={styles.category_image}
      />
      <View style={styles.booster_Right}>
        <Text numberOfLines={4} style={styles.booster_title}>
          {item.product_name}
        </Text>

        <Text style={styles.booster_price}>{item.price}</Text>
      </View>

      {"0" == quantity ? (
        <Pressable
          onPress={() => {
            setQuantity("1");
            setCartUpdated(true);
          }}
          style={[
            styless.icon,
            { borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR },
          ]}
        >
          <MaterialCommunityIcons
            name="plus"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={25}
          />
        </Pressable>
      ) : (
        <View
          style={[
            styless.icon,
            {
              flexDirection: "row",
              borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
            },
          ]}
        >
          <MaterialCommunityIcons
            onPress={() => {
              if (parseInt(quantity) === 1) setIsRemoved(true);
              else setCartUpdated(true);
              setQuantity(parseInt(quantity) - 1 + "");
            }}
            name={quantity === "1" ? "delete" : "minus"}
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={22}
          />
          <Text
            style={[styless.qty, { color: assets.Colors.ACCOUNT_TXT_COLOR }]}
          >
            {quantity}
          </Text>
          <MaterialCommunityIcons
            onPress={() => {
              setCartUpdated(true);
              setQuantity(parseInt(quantity) + 1 + "");
              global.branchIo.logEvent("Add to Cart", {
                customData: {
                  anonymousid: item.id,
                  referrer: null,
                  "Product Name": item?.product_name,
                  "Product Price": item?.price,
                  Quantity: quantity,
                  screenURL: "BoosterItems",
                },
              });
            }}
            name="plus"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={22}
          />
        </View>
      )}
      <Modal
        visible={
          f_loading === LOADING_TYPES.LOADING ||
          f_loading === LOADING_TYPES.FETCHING_MORE ||
          c_loading === LOADING_TYPES.LOADING ||
          c_loading === LOADING_TYPES.FETCHING_MORE ||
          r_loading === LOADING_TYPES.LOADING ||
          r_loading === LOADING_TYPES.FETCHING_MORE
        }
        transparent={true}
      >
        <View style={[pallete.loader_View]}>
          <ActivityIndicator
            size={"large"}
            color={assets.Colors.WHITE}
            style={[pallete.loader]}
          />
        </View>
      </Modal>
    </Pressable>
  );
};
export default BoosterItems;

const styless = StyleSheet.create({
  order_content: {
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    paddingHorizontal: dW(20),
    paddingVertical: dW(5),
    marginTop: dW(20),
    margin: dW(5),
    shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
    shadowOffset: {
      width: dW(5),
      height: dW(5),
    },
    shadowRadius: dW(8),
    shadowOpacity: dW(1.8),
    elevation: 8,
  },

  icon: {
    marginTop: dW(-30),
    borderWidth: dW(0.8),
    borderRadius: dW(20),
    marginLeft: dW(10),
    justifyContent: "center",
    padding: dW(3),
  },

  qty: {
    fontSize: dW(13),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    textAlign: "center",
    paddingVertical: dW(3),
    paddingHorizontal: dW(8),
  },

  order_image: {
    height: dW(90),
    width: dW(100),
    alignSelf: "center",
    resizeMode: "contain",
  },
  order_title: {
    fontSize: dW(12),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    marginTop: dW(10),
    width: dW(120),
  },
  order_bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: dW(15),
  },
  price: {
    fontSize: dW(16),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_BOLD,
  },
});
