import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import Header from "../../common_components/Dash_Borad_Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { dW, windowHeight } from "../../utils/dynamicHeightWidth";
import AntDesign from "react-native-vector-icons/AntDesign";

import { RUNNER_ORDERS, API_STATUS } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

var pageNumber = 1;
var totalPageCount = 1;
const Order = ({ navigation }) => {
  const styles = useStyle();

  const { navigate, addListener } = useNavigation();
  const [orders, setOrders] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const liveLocationReducer =
    useSelector(
      (state) => state?.liveLocationReducerData.LiveLocationReducer.location
    ) || null;

  const item_payload = {
    store: "1",
    current_page: pageNumber,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ORDERS,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      if (responseCode == API_STATUS.SUCCESS) setData(data);
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    const focusListener = addListener("focus", () => {
      fetchData(0);
    });
    return () => {
      focusListener();
    };
  }, []);

  const setData = (resolve) => {
    const { data } = resolve;

    totalPageCount = data?.total_pages;
    let concatOrders =
      data?.current_page == 1 ? data?.orders : orders.concat(data?.orders);
    setOrders(concatOrders);
    setOrderDate(data?.date);
    setRefreshing(false);
  };
  const onRefreshClick = () => {
    setRefreshing(true);
    fetchData(0);
  };

  const onEndReached = () => {
    if (pageNumber != totalPageCount) {
      pageNumber++;
      fetchData(0);
    }
  };
  const onOrderClick = (item) => {
    const { id, status } = item;
    switch (status) {
      case "1":
        navigate(assets.NavigationConstants.ORDERVIEW.NAME, {
          orderId: id,
        });
        break;
      case "2":
        navigate(assets.NavigationConstants.SHOPPING.NAME, {
          orderId: id,
        });
        break;
      case "3":
        navigate(assets.NavigationConstants.ORDERVIEW.NAME, {
          orderId: id,
        });
        break;
      case "4":
        navigate(assets.NavigationConstants.ORDERVIEW.NAME, {
          orderId: id,
        });
        //for now we are not handling this one
        break;
      case "5":
        navigate(assets.NavigationConstants.ORDERVIEW.NAME, {
          orderId: id,
        });
        //for now we are not handling this one

        break;
      case "6":
        navigate(assets.NavigationConstants.ORDERS_ITEMS.NAME, {
          orderId: id,
          tabIndex: 0,
        });
        break;
      case "7":
        navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
          screen: assets.NavigationConstants.RECEIPT_PHOTOCOPY.NAME,
          params: { orderId: id },
        });
        break;
      case "8":
        navigate(assets.NavigationConstants.ORDERVIEW.NAME, {
          orderId: id,
        });
        break;
      default:
        break;
    }
  };
  const listItem = ({ item }) => {
    return (
      <Pressable style={[styles.cardView]} onPress={() => onOrderClick(item)}>
        <View style={styles.IconView}>
          <Image
            style={{ height: 30, width: 30, resizeMode: "contain" }}
            source={{ uri: item.store_image }}
          />
          <Text style={styles.homeDepotText}>{item.store_name}</Text>
        </View>
        <View style={styles.prizeView}>
          <Text style={styles.price}>{item.total_price}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            color={assets.Colors.BUTTON_THEME_COLOR}
            size={37}
          />
        </View>
        <View style={styles.ShoppingView}>
          <AntDesign
            name="shoppingcart"
            color={assets.Colors.TEXT_COLOR}
            size={25}
          />
          <Text style={styles.item}>{item.items.length} items</Text>
          <View
            style={{
              width: dW(1),
              height: "70%",
              backgroundColor: assets.Colors.TEXT_COLOR,
              marginHorizontal: dW(10),
            }}
          ></View>
          <MaterialCommunityIcons
            name="car-side"
            color={assets.Colors.TEXT_COLOR}
            size={30}
            style={{ marginLeft: dW(3) }}
          />
          <Text style={styles.item}>{item?.miles} miles</Text>
        </View>
      </Pressable>
    );
  };
  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          height: windowHeight() / 1.4,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.forgot_pass_heading}>No Orders.</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={false}
        event={() => navigation.openDrawer()}
        icon1="menu"
        title="Orders"
        icon2="chat-processing-outline"
      />

      <FlatList
        data={orders}
        refreshing={isRefreshing}
        onRefresh={() => onRefreshClick()}
        horizontal={false}
        ListEmptyComponent={emptyView()}
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={listItem}
        onEndReached={() => onEndReached()}
      />
    </View>
  );
};
export default Order;
