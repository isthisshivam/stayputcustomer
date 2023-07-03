import React, { useState, useEffect } from "react";
import { View, Text, Modal, ActivityIndicator, Image } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../../Services/rest/api";
import { showToastMessage } from "../../../utils/utilities";
import usePallete from "../../../assets/Pallete";
import { useDispatch, useSelector } from "react-redux";
import {
  doRefreshAction,
  productDetailRefreshAction,
} from "../../../redux/actions/RefeshCallbackActions";

const styles = useStyle();
const pallete = usePallete();
const Cart_Item = ({ item, depot, onRefresh }) => {
  const [quantity, setQuantity] = useState(item.qty);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isCartUpdated, setCartUpdated] = useState(false);
  const dispatch = useDispatch();

  const add_to_cart_payload = {
    product_id: item.product_id,
    qty: quantity,
    store_location_id: global?.location_id,
    hd_id: item?.hd_id,
    store: depot,
  };
  const remove_cart = {
    id: item.product_id,
    store: depot,
  };
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
    if (c_data) {
      setQuantity(c_data?.data?.item_count);
      setTimeout(() => {
        showToastMessage(c_data?.message);
        setCartUpdated(false);
      }, 300);
      onRefresh();
      dispatch(doRefreshAction(true));
      dispatch(productDetailRefreshAction(true));
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
      onRefresh();
      dispatch(doRefreshAction(true));
      dispatch(productDetailRefreshAction(true));
    }
  }, [r_data, r_error, r_responseCode]);

  return (
    <View>
      {quantity == "0" ? null : (
        <View style={styles.cart_content}>
          <View style={styles.rightContent}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.center_content}>
              <Text numberOfLines={1} style={styles.titleTxt}>
                {item.product_name}
              </Text>
              <Text style={styles.priceTxt}>
                {"$" + parseFloat(item.price.replace("$", "")).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.qntityContent}>
            <MaterialCommunityIcons
              onPress={() => {
                if (parseInt(quantity) === 1) setIsRemoved(true);
                else setCartUpdated(true);
                setQuantity(parseInt(quantity) - 1 + "");
              }}
              name={quantity === "1" ? "delete" : "minus"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={18}
            />
            <Text style={styles.qty}>{item.qty}</Text>
            <MaterialCommunityIcons
              onPress={() => {
                setCartUpdated(true);
                setQuantity(parseInt(quantity) + 1 + "");
              }}
              name="plus"
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={18}
            />
          </View>
        </View>
      )}
      <Modal
        visible={
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
    </View>
  );
};

export default Cart_Item;
