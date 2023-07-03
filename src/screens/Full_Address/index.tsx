import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import assets from "../../assets";
import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import Back_Header from "../../common_components/Back_Header";
import GetLocation from "react-native-get-location";
import { CUSTOMER_SAVE_ADDRESS, UPDATE_ADDRESS } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { showToastMessage } from "../../utils/utilities";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Geocoder from "react-native-geocoding";

const Full_Addrs = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const editable = route?.params;
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLong, setCurrentLong] = useState(null);
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address_id, setAddress_id] = useState("");

  const address_payLoad = {
    address: street.trim(),
    latitude: `${currentLat}`,
    longitude: `${currentLong}`,
    apt: apt.trim(),
    bussiness_name: business.trim(),
    city: city.trim(),
    state: state,
    zip: zipCode.trim(),
  };

  const update_addressPayload = {
    id: address_id,
    address: street.trim(),
    latitude: `${currentLat}`.trim(),
    longitude: `${currentLong}`.trim(),
    apt: apt.trim(),
    bussiness_name: business.trim(),
    city: city.trim(),
    state: state,
    zip: zipCode.trim(),
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CUSTOMER_SAVE_ADDRESS,
    PAYLOAD: address_payLoad,
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
    URL: UPDATE_ADDRESS,
    PAYLOAD: update_addressPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    setTimeout(() => {
      showToastMessage(data?.message);
    }, 100);
  }, [data, error, responseCode]);

  useEffect(() => {
    setTimeout(() => {
      showToastMessage(u_data?.message);
    }, 100);
  }, [u_data, u_error, u_responseCode]);

  useEffect(() => {
    if (editable != undefined) {
      setAddress_id(editable.addrs_id);
      setCurrentLat(editable.lat);
      setCurrentLong(editable.lan);
      setStreet(editable.street_name);
      setApt(editable.apt);
      setCity(editable.City);
      setState(editable.state);
      setZipCode(editable.code);
      setBusiness(editable?.bussiness_name);
    }
  }, [editable]);

  useEffect(() => {
    if (editable === undefined) userCurrent_location();
  }, [editable]);

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

  const getPlacedetails = (lat, lng) => {
    Geocoder.from(lat, lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components;
        for (var i = 0; i < addressComponent.length; i++) {
          if (
            addressComponent[i].types.findIndex((item) => item === "route") > -1
          ) {
            setStreet(addressComponent[i].long_name);
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "postal_code"
            ) > -1
          ) {
            setZipCode(addressComponent[i].long_name);
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "administrative_area_level_1"
            ) > -1
          ) {
            setState(addressComponent[i].long_name);
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "administrative_area_level_2"
            ) > -1
          ) {
            setCity(addressComponent[i].long_name);
          }
        }
      })

      .catch((error) => console.log("error", error));
  };

  const is_validAddress = () => {
    if (!street) {
      showToastMessage("Please enter street address.");
      return false;
    } else if (!zipCode) {
      showToastMessage("Please enter your Zip code");
      return false;
    }
    return true;
  };

  const isValid_address = () => {
    if (is_validAddress()) {
      if (editable === undefined) {
        fetchData(0);
      } else {
        u_fetchData(0);
      }
      global.fullAddressRoute
        ? setTimeout(() => {
            navigate(assets.NavigationConstants.CHANGE_LOCATION.NAME);
          }, 1000)
        : goBack();
    }
    global.branchIo.logEvent("Save Delivery Address", {
      customData: {
        anonymousid: global.UserId,

        screenURL: "Full_Address",
      },
    });
  };
  const passAddressToAuthStack = () => {
    //signup process handle @d9n6
    if (is_validAddress()) {
      const ADDRESS_PAYLOAD = {
        address: street.trim(),
        city: city.trim(),
        state: state,
        zip: zipCode.trim(),
        latitude: `${currentLat}`,
        longitude: `${currentLong}`,
      };
      navigate(assets.NavigationConstants.AUTH_STACK.NAME, {
        screen: assets.NavigationConstants.USER_TYPE.NAME,
        params: {
          home: ADDRESS_PAYLOAD?.address,
          full_addr:
            ADDRESS_PAYLOAD?.address +
            `, ` +
            ADDRESS_PAYLOAD?.city +
            ", " +
            ADDRESS_PAYLOAD.state +
            ", " +
            ADDRESS_PAYLOAD.zip,
          address: ADDRESS_PAYLOAD,
        },
      });
      global.deliveryAuthStack = false;
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title="Delivery addresses"
        subtitle=""
      />
      <KeyboardAwareScrollView style={[pallete.screen_container]}>
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
        <View style={styles.container}>
          <View style={styles.mapview}>
            {currentLat && currentLong && (
              <MapView
                style={styles.map}
                mapType={Platform.OS == "android" ? "none" : "standard"}
                initialRegion={{
                  latitude: currentLat,
                  longitude: currentLong,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              >
                <Marker
                  draggable={true}
                  coordinate={{ latitude: currentLat, longitude: currentLong }}
                >
                  <Image
                    source={assets.Images.MAP_MARKER}
                    style={styles.marker}
                  />
                </Marker>
              </MapView>
            )}
          </View>
          <View style={styles.topMargin}>
            <Text_Input
              change={(text) => setStreet(text)}
              edit={street}
              style={styles.space_vertical}
              subtitle={""}
              title="Street Address"
            />
            <Text_Input
              change={(text) => setApt(text)}
              edit={apt}
              style={styles.space_vertical}
              subtitle={""}
              title="Apt, floor, suite, etc (optional)"
            />
            <Text_Input
              change={(text) => setBusiness(text)}
              edit={business}
              style={styles.space_vertical}
              subtitle={""}
              title="Business name (optional)"
            />
            <View style={styles.row_inputs_view}>
              <Text_Input
                change={(text) => setCity(text)}
                edit={city}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="City"
              />
              <View style={styles.horizontal_spacer} />
              <Text_Input
                change={(text) => setZipCode(text)}
                edit={zipCode}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="Zip Code"
              />
            </View>
          </View>
          <Button
            imgBG={""}
            style={styles.topMargin}
            event={() =>
              global.deliveryAuthStack
                ? passAddressToAuthStack()
                : isValid_address()
            }
            bgcolor={assets.Colors.BUTTON_THEME_COLOR}
            image={false}
            img=""
            title="Save address"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Full_Addrs;
