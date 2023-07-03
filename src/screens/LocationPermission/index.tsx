import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Linking,
  AppState,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Button from "../../common_components/Button";

import { CUSTOMER_SAVE_ADDRESS } from "../../Services/ApiUrls";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

import { Secrets } from "../../assets/Secrets";

var isBlocked = false;

const LocationPermission = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const permissionArray =
    Platform.OS === "android"
      ? AndroidLocationPermission
      : IosLocationPermission;
  const { navigate, goBack } = useNavigation();
  const navigation = useNavigation();
  const [appPermission, setappPermission] = useState("Enable Location");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();

  const ADDRESS_PAYLOAD = {
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
    URL: CUSTOMER_SAVE_ADDRESS,
    PAYLOAD: ADDRESS_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data?.status == 200) {
      setTimeout(() => {
        navigate(assets.NavigationConstants.CHANGE_LOCATION.NAME);
      }, 200);
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (selectedAddress) {
      fetchData(0);
    }

    return () => {
      setSelectedAddress(null);
    };
  }, [selectedAddress]);

  const openSetting = React.useCallback(async () => {
    if (Platform.OS === "ios") {
      await Linking.openURL("app-settings:");
    } else {
      await Linking.openSettings();
    }
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
    }
  };
  useEffect(() => {
    const listener = AppState.addEventListener("change", _handleAppStateChange);
    return () => listener.remove();
  }, []);

  const check = React.useCallback(() => {
    isBlocked = false;
    RNPermissions.checkMultiple(permissionArray)
      .then((data) => {
        for (let index = 0; index < permissionArray.length; index++) {
          if (
            data[permissionArray[index]] === "blocked" ||
            data[permissionArray[index]] === "denied"
          ) {
            isBlocked = true;
            openSetting();
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
    Geocoder.init(Secrets.GOOGLE_MAPS.MAP_KEY);
    Geocoder.from(lat, lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components;

        for (var i = 0; i < addressComponent.length; i++) {
          if (addressComponent[i].types.includes("route")) {
            street = street + addressComponent[i].long_name;
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
            city = addressComponent[i].long_name;
          }
        }
        let selectedAddressPayload = {
          street: street,
          city: city,
          state: state,
          zipCode: zipCode,
        };
        setData(selectedAddressPayload);
      })

      .catch((error) => console.warn(error));
  };
  const setData = async (selectedAddressPayload) => {
    await setSelectedAddress(selectedAddressPayload);
    await setSelectedAddress(selectedAddressPayload);
  };

  const requestPermission = () => {
    RNPermissions.requestMultiple(permissionArray)
      .then(check)
      .catch((error) => console.error("error_requesting_permission", error));
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <Modal visible={loading === LOADING_TYPES.LOADING} transparent={true}>
          <View style={[pallete.loader_View]}>
            <ActivityIndicator
              size={"large"}
              color={assets.Colors.WHITE}
              style={[pallete.loader]}
            />
          </View>
        </Modal>
        <Image source={assets.Images.STAY_PUT_LOGO} style={styles.logo} />
        <Text style={styles.subtitle}>Enable Geolocation</Text>
        <Image
          source={assets.Images.LOCATION_ICON}
          style={[styles.logo, { marginTop: 50 }]}
        />
        <Text style={[styles.subtitle, { marginTop: 20 }]}>
          By allowing geolocation you are able to fetch your current location in
          stayput and help your runner to deliever the goodies easily to your
          door step.
        </Text>

        <Button
          style={styles.spaceTop}
          event={() => requestPermission()}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          title={appPermission}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default LocationPermission;
