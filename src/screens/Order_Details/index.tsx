import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  ActivityIndicator,
  Image,
  Platform,
  TextInput,
  Dimensions,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { dW } from "../../utils/dynamicHeightWidth";
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import StepIndicator from "react-native-step-indicator";
import { ORDER_DETAILS, UPDATE_ORDER } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { GetData, showToastMessage } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import NoInternetView from "../../common_components/NoInternetView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GetLocation from "react-native-get-location";
var LONGITUDE_DELTA = 0;
var LATITUD_DELTA = 0.0922;
const window = Dimensions.get("window");
const { width, height } = window;
LONGITUDE_DELTA = LATITUD_DELTA + width / height;
var polylineMarkers = [
  {
    latitude: 30.0198,
    longitude: 77.3985,
  },
  {
    latitude: 29.968,
    longitude: 77.5552,
  },
];
const orderDetails = ({ route }): JSX.Element => {
  const pallete = usePallete();
  const styles = useStyle();
  const googleMapRef = useRef();
  const [mapCordinates, setMapCordinates] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: LATITUD_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const { navigate, goBack } = useNavigation();
  const icons = [
    "fa-regular fa-warehouse",
    "cart-arrow-down",
    "car",
    "map-marker",
  ];
  const [store, setStore] = useState("");
  const [instruction, setInstruction] = useState("");
  const [userName, setUserName] = useState("");
  const [curr_location, setCurrLocation] = useState(false);

  const order_details_payload = {
    store: store,
    order_id: route?.params?.order_id,
  };
  const instruction_payload = {
    id: route?.params?.order_id,
    instruction: instruction.trim(),
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: ORDER_DETAILS,
    PAYLOAD: order_details_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  const {
    data: u_data,
    loading: u_loading,
    error: u_error,
    fetchData: u_fetchData,
    responseCode: u_responseCode,
  } = useRest({
    URL: UPDATE_ORDER,
    PAYLOAD: instruction_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data)
      if (data?.data?.runner?.latitude && data?.data?.runner?.longitude) {
        setLocationInfo(
          data?.data?.runner?.latitude,
          data?.data?.runner?.longitude
        );
      } else {
        setLocationInfo(
          data?.data?.store_latidude,
          data?.data?.store_longitude
        );
      }
    if (data) {
      setInstruction(data?.data?.instruction);
      setPolylineData(data?.data);
    }
  }, [data, error, responseCode]);

  const setLocationInfo = async (lat, lng) => {
    await setMapCordinates({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    googleMapRef.current.animateToRegion(
      {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        latitudeDelta: LATITUD_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      300
    );
  };
  const isEmpty = (obj) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  };
  const setPolylineData = (data) => {
    const { runner, delivery_address, store_latidude, store_longitude } = data;
    var runnerLocation = {};
    var storeLocation = {};
    var temp = [];
    var customerLocation = { latitude: 29.9932, longitude: 77.0474 };

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
      }
      temp.push(customerLocation);
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
  };
  useEffect(() => {
    if (u_data?.status === 200) {
      setTimeout(() => {
        showToastMessage(u_data?.message);
      }, 300);
      navigate(assets.NavigationConstants.ORDER_SCREEN.NAME);
    }
  }, [u_data, u_error, u_responseCode]);

  useEffect(() => {
    if (store) {
      fetchData(0);
    }
  }, [store]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (curr_location === true) {
      userCurrent_location();
    }
  }, [curr_location]);

  const getData = async () => {
    const login = await GetData(LOGIN_KEY);

    if (login) {
      const user_store = JSON.parse(login);
      setStore(user_store?.store);
      setUserName(user_store?.firstname);
    }
  };

  const userCurrent_location = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setLocationInfo(location.latitude, location.longitude);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const instruction_added = () => {
    if (!instruction) {
      showToastMessage("Please fill out instruction field first.");
    } else {
      u_fetchData(0);
    }
  };

  const customStyles = {
    stepIndicatorSize: 40,
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

  const getTitle = (status) => {
    if (status === "1") {
      return "We have received your order";
    } else if (status === "2") {
      return "Your order is accepted";
    } else if (status === "3") {
      return "Your order is Canceled";
    } else if (status === "4") {
      return "Your order is shipping";
    } else if (status === "5") {
      return "Heading to store";
    } else if (status === "6") {
      return "Runner is shopping";
    } else if (status === "7") {
      return "Runner is heading to you";
    } else if (status === "8") {
      return "Order is Completed";
      //return "Runner has arrived";
    } else {
      return "";
    }
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          u_loading === LOADING_TYPES.LOADING ||
          u_loading === LOADING_TYPES.FETCHING_MORE
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
      {error ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Pressable onPress={goBack} style={[styles.close, { left: dW(20) }]}>
            <MaterialCommunityIcons
              name={"close"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={25}
            />
          </Pressable>
          <NoInternetView onRefresh={fetchData} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.mapView}>
            <MapView
              ref={googleMapRef}
              style={styles.map}
              mapType="standard"
              showsUserLocation
              initialRegion={mapCordinates}
            >
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
                <Image source={assets.Images.MAP_STORE} style={styles.marker} />
              </Marker>

              <Polyline
                coordinates={polylineMarkers}
                strokeColor="gray"
                strokeColors={["orange"]}
                strokeWidth={3}
              />
            </MapView>
          </View>
          <Pressable onPress={goBack} style={[styles.close, { left: dW(20) }]}>
            <MaterialCommunityIcons
              name={"close"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={25}
            />
          </Pressable>
          <Pressable
            onPress={() => navigate(assets.NavigationConstants.HELP_CENTER.KEY)}
            style={[styles.close, { right: dW(20) }]}
          >
            <Text style={styles.help}>Help</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrLocation(!curr_location)}
            style={styles.gps}
          >
            <MaterialCommunityIcons
              name={"crosshairs-gps"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={25}
            />
          </Pressable>
          <View style={styles.priceView}>
            <Text style={styles.recieved}>{getTitle(data?.data?.status)}</Text>
            <Text style={styles.deliveryfees}>
              Est. delivery{" "}
              <Text style={styles.timing}>{data?.data.schedule}</Text>
            </Text>
          </View>
          <View style={{ marginTop: dW(20) }}>
            <StepIndicator
              stepCount={4}
              customStyles={customStyles}
              currentPosition={parseInt(data?.data?.status) - 5}
              renderStepIndicator={({ position, stepstatus }) =>
                position !== 0 ? (
                  <Icon
                    name={icons[position]}
                    size={dW(14)}
                    color={
                      position <= parseInt(data?.data?.status) - 5
                        ? assets.Colors.WHITE
                        : assets.Colors.BLACK_COLOR
                    }
                  />
                ) : (
                  <Image
                    source={
                      position <= parseInt(data?.data?.status) - 5
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
          <View style={styles.border} />
          <Text style={styles.homeDepotText}>Order Details</Text>
          <Text style={styles.homeDepotText}>
            {data?.data?.items.length}{" "}
            {data?.data?.items.length === 1 ? "item" : "items"}
          </Text>
          <View style={styles.ShoppingView}>
            {data?.data?.items.map((item) => {
              return (
                <View style={styles.ViewOrder}>
                  <Text numberOfLines={1} style={styles.order}>
                    {item.product_name}
                  </Text>
                  <Text style={styles.netPrice}>{item.price}</Text>
                </View>
              );
            })}
            <Pressable
              onPress={() =>
                navigate(assets.NavigationConstants.ORDER_RECIEPT.NAME, {
                  id: route?.params?.order_id,
                  store: store,
                })
              }
              style={styles.right}
            >
              <Text style={styles.viewTxt}>View Receipt</Text>
            </Pressable>
          </View>
          <View style={styles.border} />
          <Text style={styles.homeDepotText}>Delivery Address</Text>
          <View style={styles.ShoppingView}>
            <Text
              numberOfLines={2}
              style={[styles.addressText, { width: dW(250) }]}
            >
              {data?.data?.delivery_address.address},{" "}
              {data?.data?.delivery_address.city}
            </Text>
            <Text style={styles.addressText}>
              {data?.data?.delivery_address.zip},{" "}
              {data?.data?.delivery_address.state}
            </Text>
            <View style={styles.input_box}>
              <TextInput
                placeholder={"Add instructions"}
                value={instruction}
                onChangeText={(text) => setInstruction(text)}
                placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                style={styles.placeholder}
                multiline={true}
              />
            </View>
            <Pressable onPress={instruction_added} style={styles.right}>
              <Text style={styles.viewTxt}>Add instructions</Text>
            </Pressable>
          </View>
          <View style={styles.border} />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};
export default orderDetails;
