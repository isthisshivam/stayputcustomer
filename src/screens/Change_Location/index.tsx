import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Modal,
  ActivityIndicator,
  Pressable,
  Platform,
  AppState,
  TouchableOpacity,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Addresses_pannel } from "./component/address_pannel";
import {
  CUSTOMER_DELIVERY_ADDRESSES,
  CUSTOMER_SAVE_ADDRESS,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { SaveData, GetData } from "../../utils/utilities";
import NoInternetView from "../../common_components/NoInternetView";
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
import RNPermissions, {
  NotificationsResponse,
  Permission,
  PERMISSIONS,
  PermissionStatus,
} from "react-native-permissions";
import {
  IosLocationPermission,
  AndroidLocationPermission,
} from "../../constants/AppConstants";
import { Secrets } from "../../assets/Secrets";

var isBlocked = false;
const Location_Change = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState("");
  const { navigate, goBack } = useNavigation();
  const [addressID, setAddressID] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const permissionArray =
    Platform.OS === "android"
      ? AndroidLocationPermission
      : IosLocationPermission;
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [curr_location, setCurr_location] = useState(false);

  const address_payLoad = {
    city: selectedAddress?.city,
    state: selectedAddress?.state,
    zip: selectedAddress?.zipCode,
    latitude: JSON.stringify(currentLat),
    longitude: JSON.stringify(currentLong),
    address: selectedAddress?.street
      ? selectedAddress?.street
      : selectedAddress?.city,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CUSTOMER_DELIVERY_ADDRESSES,
    CALL_TYPE: CALL_TYPES.GET,
    lazy: false,
  });

  const {
    data: curr_data,
    loading: curr_loading,
    error: curr_error,
    fetchData: curr_fetchData,
    responseCode: curr_responseCode,
  } = useRest({
    URL: CUSTOMER_SAVE_ADDRESS,
    PAYLOAD: address_payLoad,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      console.log("changelocation=", data);
      setDeliveryAddress(data.data);
      if (selectedAddress) {
        getData();
      }
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (curr_data?.status === 200) {
      location(curr_data?.data);
      if (selectedAddress) {
        fetchData(0);
      }
    }
  }, [curr_data, curr_error, curr_responseCode]);

  useFocusEffect(
    React.useCallback(() => {
      const focus = fetchData(0);
      return () => focus;
    }, [])
  );

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      getData();
      fetchData(0);
    });
    return () => {
      focus();
    };
  }, []);
  const getData = async () => {
    await GetData("location").then((value) => {
      const location = JSON.parse(value);
      setAddressID(location.id);
    });
  };

  useEffect(() => {
    if (selectedAddress) {
      curr_fetchData(0);
    }
  }, [selectedAddress]);

  const check = React.useCallback(() => {
    RNPermissions.checkMultiple(permissionArray)
      .then((data) => {
        for (let index = 0; index < permissionArray.length; index++) {
          if (
            data[permissionArray[index]] === "blocked" ||
            data[permissionArray[index]] === "denied"
          ) {
            isBlocked = true;
            enableLocation();
            break;
          }
        }
        if (!isBlocked) {
          setTimeout(() => {
            userCurrent_location();
          }, 200);
        }
      })
      .then(() => RNPermissions.checkNotifications())
      .then((data) => {})
      .catch((error) => console.warn(error));
  }, []);

  const enableLocation = async () => {
    navigate(assets.NavigationConstants.LOCATION_PERMISSION.NAME);
  };
  const requestPermission = () => {
    RNPermissions.requestMultiple(permissionArray)
      .then(check)
      .catch((error) => console.error("error_requesting_permission", error));
  };

  const userCurrent_location = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setCurrentLat(location.latitude);
        setCurrentLong(location.longitude);
        getPlacedetails(location.latitude, location.longitude);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const getPlacedetails = async (lat, lng) => {
    let zipCode = "";
    let state = "";
    let city = "";
    let street = "";
    let selectedAddressPayload;
    let streeet_num = "";
    Geocoder.init(Secrets.GOOGLE_MAPS.MAP_KEY);
    Geocoder.from(lat, lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components;
        for (var i = 0; i < addressComponent.length; i++) {
          if (
            addressComponent[i].types.findIndex(
              (item) => item === "street_number"
            ) > -1
          ) {
            if (addressComponent[i].long_name.includes("1/2")) {
              let street_valid_num = addressComponent[i].long_name.split(" ");
              streeet_num = street_valid_num[0];
            } else {
              streeet_num = addressComponent[i].long_name;
            }
          } else if (addressComponent[i].types.includes("route")) {
            street = streeet_num + ` ` + addressComponent[i].long_name;
          } else if (addressComponent[i].types.includes("sublocality")) {
            street = street + addressComponent[i].long_name;
          } else if (
            addressComponent[i].types.includes("sublocality_level_1")
          ) {
            street = street + addressComponent[i].long_name;
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "postal_code"
            ) > -1
          ) {
            zipCode = addressComponent[i].long_name;
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "administrative_area_level_1"
            ) > -1
          ) {
            state = addressComponent[i].long_name;
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "administrative_area_level_2"
            ) > -1
          ) {
            if (addressComponent[i]?.long_name) {
              if (
                addressComponent[i]?.long_name.includes("County") ||
                addressComponent[i]?.long_name.includes("county")
              ) {
                let data = addressComponent[i]?.long_name.split(" ");
                city = data[0];
              } else {
                city = addressComponent[i].long_name;
              }
            }
          }
        }
        selectedAddressPayload = {
          street: street,
          city: city,
          state: state,
          zipCode: zipCode,
        };

        setData(selectedAddressPayload);
      })
      .catch((error) => console.warn(error));
  };

  const setData = async (data) => {
    await setSelectedAddress(data);
    await setSelectedAddress(data);
  };

  const location = async (addr) => {
    await SaveData("location", JSON.stringify(addr));
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title="Delivery addresses"
        subtitle=""
      />
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          curr_loading === LOADING_TYPES.LOADING ||
          curr_loading === LOADING_TYPES.FETCHING_MORE
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
        <NoInternetView onRefresh={fetchData} />
      ) : (
        <ScrollView style={[pallete.screen_container]}>
          <TouchableOpacity
            onPress={() =>
              navigate(assets.NavigationConstants.SEARCH_ADDRESS.NAME)
            }
            style={styles.input_view}
          >
            <Ionicons
              name="search"
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={18}
            />
            <Text style={styles.placeHolder}>Add new address</Text>
            {/* <TextInput
              // onPressIn={() =>
              //   navigate(assets.NavigationConstants.SEARCH_ADDRESS.NAME)
              // }
              placeholder="Add new address"
              editable={false}
              placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              style={styles.placeHolder}
            /> */}
          </TouchableOpacity>
          <Addresses_pannel
            id={addressID}
            deliveryAddrs={(item) => location(item)}
            data={deliveryAddress}
            event={() => [(isBlocked = false), requestPermission()]}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Location_Change;
