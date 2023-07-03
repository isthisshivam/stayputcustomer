import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import MapView, { Marker, Polyline } from "react-native-maps";

import { dW } from "../../utils/dynamicHeightWidth";
import Icon from "react-native-vector-icons/FontAwesome";
import StepIndicator from "react-native-step-indicator";
import assets from "../../assets";
import { ScrollView } from "react-native-virtualized-view";

import { ORDER_LIST } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import No_Data_Fount from "../../common_components/No_Data_Found";
import NoInternetView from "../../common_components/NoInternetView";

var LATITUD_DELTA = 0.0922;
const window = Dimensions.get("window");
const { width, height } = window;
LONGITUDE_DELTA = LATITUD_DELTA + width / height;
const Order_Screen = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const googleMapRef = useRef();
  const { navigate } = useNavigation();
  const [store, setStore] = useState("");
  const [userName, setUserName] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [previousOrder, setPreviousOrder] = useState([]);

  const icons = [
    "fal fa-warehouse-alt",
    "cart-arrow-down",
    "car",
    "map-marker",
  ];

  const orderlist_payLoad = {
    store: store,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: ORDER_LIST,
    PAYLOAD: orderlist_payLoad,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      const ordersItems = data?.data.live_orders;
      const privious_orders = data?.data.previous_orders;
      setOrderList(ordersItems);
      setPreviousOrder(privious_orders);
    }
  }, [data, error, responseCode]);

  useFocusEffect(
    React.useCallback(() => {
      const focus = getData();
      return () => focus;
    }, [])
  );

  useEffect(() => {
    if (store) {
      fetchData(0);
    }
  }, [store]);

  useFocusEffect(
    React.useCallback(() => {
      if (store) {
        const focus = fetchData(0);
        return () => focus;
      }
    }, [store])
  );

  const getData = async () => {
    const login = await GetData(LOGIN_KEY);

    if (login) {
      const user_store = JSON.parse(login);
      setStore(user_store?.store);
      setUserName(user_store?.firstname);
    }
  };

  const customStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeWidth: 1,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    stepIndicatorLabelFinishedColor: assets.Colors.ORDER_PROGRESS_COLOR,
    stepIndicatorLabelUnFinishedColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    stepStrokeCurrentColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    stepStrokeFinishedColor: assets.Colors.ORDER_PROGRESS_COLOR,
    stepStrokeUnFinishedColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    separatorFinishedColor: assets.Colors.ORDER_PROGRESS_COLOR,
    separatorUnFinishedColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    stepIndicatorFinishedColor: assets.Colors.ORDER_PROGRESS_COLOR,
    stepIndicatorUnFinishedColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    stepIndicatorCurrentColor: assets.Colors.ORDER_PROGRESS_COLOR,
  };

  const previousItems = (item) => {
    return (
      <View style={styles.list} key={item.id}>
        <View style={styles.previousorderContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.storeName}>{item.store_name}</Text>
            <Text style={styles.date_price}>
              {item.date} | {item.total_price}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.date_price, { width: dW(250) }]}
            >
              {item.delivery_address.address}, {item.delivery_address.zip}
            </Text>
          </View>

          <Pressable
            onPress={() => [
              navigate(assets.NavigationConstants.ORDER_DETAILS.NAME, {
                order_id: item.id,
              }),
            ]}
            style={styles.right}
          >
            <Text style={styles.viewTxt}>View Order</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const getTitle = (item) => {
    if (item.status === "1") {
      return "We have received your order";
    } else if (item.status === "2") {
      return "Your order is accepted";
    } else if (item.status === "3") {
      return "Your order is Canceled";
    } else if (item.status === "4") {
      return "Your order is shipping";
    } else if (item.status === "5") {
      return "Heading to store";
    } else if (item.status === "6") {
      return "Runner is shopping";
    } else if (item.status === "7") {
      return "Runner is heading to you";
    } else if (item.status === "8") {
      return "Order is Completed";
      //return "Runner has arrived";
    } else {
      return "";
    }
  };
  const isEmpty = (obj) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  };
  const liveOrderItems = (item) => {
    const { runner, delivery_address, store_latidude, store_longitude } = item;

    var runnerLocation = {
      latitude: 0,
      longitude: 0,
    };
    let storeLocation = {
      latitude: 0,
      longitude: 0,
    };
    var temp = [];
    var polylineMarkers = [];
    var customerLocation = {
      latitude: 0,
      longitude: 0,
    };
    if (!isEmpty(runner)) {
      if (runner?.latitude != "null" && runner?.longitude != "null") {
        runnerLocation = {
          latitude: parseFloat(runner?.latitude),
          longitude: parseFloat(runner?.longitude),
        };
        temp.push(runnerLocation);
      }
      if (
        delivery_address?.latitude != "null" &&
        delivery_address?.longitude != "null"
      ) {
        customerLocation = {
          latitude: parseFloat(delivery_address?.latitude),
          longitude: parseFloat(delivery_address?.longitude),
        };
        temp.push(customerLocation);
      }
      polylineMarkers = temp;
    } else {
      if (store_latidude != "null" && store_longitude != "null") {
        storeLocation = {
          latitude: parseFloat(store_latidude),
          longitude: parseFloat(store_longitude),
        };
        temp.push(storeLocation);
      }
      if (
        delivery_address?.latitude != "null" &&
        delivery_address?.longitude != "null"
      ) {
        customerLocation = {
          latitude: parseFloat(delivery_address?.latitude),
          longitude: parseFloat(delivery_address?.longitude),
        };
        temp.push(customerLocation);
      }
      polylineMarkers = temp;
    }
    let mapCordinates = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 1,
      longitudeDelta: 1,
    };

    mapCordinates = {
      latitude: !isEmpty(runner)
        ? parseFloat(item?.runner?.latitude)
        : parseFloat(store_latidude),
      longitude: !isEmpty(runner)
        ? parseFloat(item?.runner?.longitude)
        : parseFloat(store_longitude),
      latitudeDelta: 1,
      longitudeDelta: 1,
    };
    return (
      <View style={styles.container} key={item.id}>
        <View style={styles.mapview}>
          <MapView
            ref={googleMapRef}
            style={styles.map}
            // mapType={Platform.OS == "android" ? "none" : "standard"}
            mapType={"standard"}
            initialRegion={mapCordinates}
          >
            {!isEmpty(runner) ? (
              <>
                <Marker
                  draggable={true}
                  coordinate={{
                    latitude: polylineMarkers[1]?.latitude,
                    longitude: polylineMarkers[1]?.longitude,
                  }}
                >
                  <Image
                    source={assets.Images.MAP_MARKER}
                    style={styles.marker}
                  />
                </Marker>
                <Marker
                  draggable={true}
                  coordinate={{
                    latitude: polylineMarkers[0]?.latitude,
                    longitude: polylineMarkers[0]?.longitude,
                  }}
                >
                  <Image
                    source={assets.Images.MAP_STORE}
                    style={styles.marker}
                  />
                </Marker>
              </>
            ) : (
              <>
                <Marker
                  draggable={true}
                  coordinate={{
                    latitude: polylineMarkers[1]?.latitude,
                    longitude: polylineMarkers[1]?.longitude,
                  }}
                >
                  <Image
                    source={assets.Images.MAP_MARKER}
                    style={styles.marker}
                  />
                </Marker>
                <Marker
                  draggable={true}
                  coordinate={{
                    latitude: polylineMarkers[0]?.latitude,
                    longitude: polylineMarkers[0]?.longitude,
                  }}
                >
                  <Image
                    source={assets.Images.MAP_STORE}
                    style={styles.marker}
                  />
                </Marker>
              </>
            )}
            {polylineMarkers && (
              <Polyline
                lineDashPattern={[1]}
                coordinates={polylineMarkers}
                strokeColor="#000"
                strokeColors={["orange"]}
                strokeWidth={5}
              />
            )}
          </MapView>
        </View>
        <Text style={styles.storeName}>{item.store_name}</Text>
        <Text style={styles.heading}>{getTitle(item)}</Text>
        <Text style={styles.deliveryTxt}>Est. Delivery: {item.schedule}</Text>
        <View style={{ marginTop: dW(15) }}>
          <StepIndicator
            stepCount={4}
            customStyles={customStyles}
            currentPosition={parseInt(item.status) - 5}
            renderStepIndicator={({ position, stepstatus }) =>
              position !== 0 ? (
                <Icon
                  name={icons[position]}
                  size={dW(12)}
                  color={
                    position <= parseInt(item.status) - 5
                      ? assets.Colors.WHITE
                      : assets.Colors.BLACK_COLOR
                  }
                />
              ) : (
                <Image
                  source={
                    position <= parseInt(item.status) - 5
                      ? assets.Images.WareHouseW
                      : assets.Images.WareHouseB
                  }
                  style={{
                    height: dW(12),
                    width: dW(12),
                    resizeMode: "contain",
                    alignSelf: "center",
                  }}
                />
              )
            }
          />
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          {item?.runner?.id && item.status != "1" && (
            <Pressable
              onPress={() =>
                navigate(assets.NavigationConstants.CHATTING.NAME, {
                  orderId: item?.id,
                  customerId: item?.uid,
                  runnerId: item?.runner?.id,
                  runnerFcmTkn: item?.runner?.runner_firebase_token,
                  userName: userName,
                })
              }
              style={[styles.viewOrder, { marginRight: 15 }]}
            >
              <Text style={styles.viewTxt}>Message</Text>
            </Pressable>
          )}

          <Pressable
            onPress={() =>
              navigate(assets.NavigationConstants.ORDER_DETAILS.NAME, {
                order_id: item.id,
              })
            }
            style={styles.viewOrder}
          >
            <Text style={styles.viewTxt}>View Order</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      {error ? (
        <NoInternetView onRefresh={fetchData} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: dW(15), flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === "android" && 250,
          }}
        >
          <Text style={styles.title}>Orders</Text>
          {data?.data.live_orders.length !== 0 && (
            <FlatList
              data={orderList}
              showsVerticalScrollIndicator={false}
              listKey={(item) => item.ty_pannel}
              contentContainerStyle={{ paddingBottom: 30 }}
              renderItem={({ item }) => liveOrderItems(item)}
            />
          )}
          {data?.data.previous_orders.length !== 0 && (
            <View>
              <Text style={styles.title}>Previous Orders</Text>
              <FlatList
                data={previousOrder}
                showsVerticalScrollIndicator={false}
                listKey={(item) => item.ty_pannel}
                contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
                contentInsetAdjustmentBehavior="automatic"
                renderItem={({ item }) => previousItems(item)}
              />
            </View>
          )}
          {data?.data.live_orders.length === 0 &&
            data?.data.previous_orders.length === 0 && (
              <View
                style={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <No_Data_Fount message="No Order Found" />
              </View>
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Order_Screen;
