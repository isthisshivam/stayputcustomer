import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import Back_Header from "../../common_components/Back_Header";
import { Cart_pannel } from "./component/cart_pannel";
import { Booster_pannel } from "../Home_Page/components/booster_pannel";
import { CART_DETAILS } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import No_Data_Fount from "../../common_components/No_Data_Found";
import assets from "../../assets";
import { GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import NoInternetView from "../../common_components/NoInternetView";

const Cart = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const [itemsList, setItemsList] = useState([]);
  const [store, setStore] = useState("");
  const [storeName, setStoreName] = useState("");
  const [total, setTotal] = useState("");
  const [store_img, setStoreImage] = useState(null);
  const [booster_products, setBooster_products] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const cart_payload = {
    store: store,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CART_DETAILS,
    PAYLOAD: cart_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    const items = data?.data?.items;
    const cart_item_count = data?.data?.cart_item_count;
    const booster_products = data?.data?.booster_products;
    cart_item_count;
    if (items) {
      setItemsList(items);
      setBooster_products(booster_products);

      var subTotal = 0;
      var subQty = 0;
      for (let i = 0; i < items.length; i++) {
        const removeChar = items[i].price.replace("$", "");
        subTotal += parseFloat(removeChar) * items[i].qty;
        subQty += parseInt(items[i].qty);
      }

      setCartCount(subQty);
      setTotal(subTotal.toFixed(2));
      global.branchIo.logEvent("View Cart", {
        customData: {
          anonymousid: global?.UserId,
          screenURL: "Cart_Screen",
        },
      });
    }
  }, [data, error, responseCode]);

  useFocusEffect(
    React.useCallback(() => {
      if (store) fetchData(0);
    }, [store])
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const login = await GetData(LOGIN_KEY);
    if (login) {
      const user_store = JSON.parse(login);
      setStore(user_store?.store);
      setStoreName(user_store?.store_name);
      setStoreImage(user_store?.store_image);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={true}
        title="Cart"
        subtitle={`Deliver To ${data?.data.delivered_to}`}
      />
      {error ? (
        <NoInternetView onRefresh={fetchData} />
      ) : data?.data.cart_item_count !== 0 ||
        loading === LOADING_TYPES.LOADING ||
        loading === LOADING_TYPES.FETCHING_MORE ||
        loading === LOADING_TYPES.REFRESHING ||
        loading === LOADING_TYPES.SEARCHING ? (
        <View style={[pallete.mainContainor]}>
          <ScrollView style={[pallete.screen_container]}>
            <Cart_pannel
              onRefresh={() => fetchData(0)}
              img={store_img}
              store={store}
              storeName={storeName}
              items={`${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              data={itemsList}
              onRefresh={() => fetchData(0)}
            />
            <Booster_pannel
              items={cartCount}
              store={store}
              data={booster_products}
              onRefresh={() => fetchData(0)}
              title="Energize - Need a boost?"
            />
          </ScrollView>
          <View style={styles.bottom}>
            <View style={styles.bottom_left}>
              <Text style={styles.subtotal}>Subtotal</Text>
              <Text style={styles.price}>${total}</Text>
            </View>
            <Pressable
              onPress={() => [
                navigate(assets.NavigationConstants.CHECK_OUT_SCREEN.NAME),
                global.branchIo.logEvent("Start Checkout", {
                  customData: {
                    anonymousid: global?.UserId,
                    Quantity: itemsList?.length.toString(),
                    screenURL: "Cart_Screen",
                  },
                }),
              ]}
              style={styles.bottom_right}
            >
              <Text style={styles.checkOut}>Check Out</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <No_Data_Fount />
      )}
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE
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
    </SafeAreaView>
  );
};
export default Cart;
