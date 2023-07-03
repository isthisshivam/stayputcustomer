import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Modal,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";

import useStyle from "./style";
import { useNavigation } from "@react-navigation/native";
import usePallete from "../../assets/Pallete";

import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import { SaveData } from "../../utils/utilities";
import { EditAddrs_pannel } from "./component/editAddress_pannel";
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
import { CUSTOMER_SAVE_ADDRESS } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { showToastMessage } from "../../utils/utilities";

import { Secrets } from "../../assets/Secrets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SEarch_deliveryAddrs = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();

  const [hasMorePages, setHasMorePages] = useState(true);

  const [street, setStreet] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({});
  const [google_address, setGoogleAddress] = useState({
    state: "",
    city: "",
    zipcode: "",
  });

  const ADDRESS_PAYLOAD = {
    address: selectedAddress?.vicinity,
    city: google_address.city,
    state: google_address.state,
    zip: google_address.zipcode,
    latitude: `${selectedAddress?.lat}`,
    longitude: `${selectedAddress?.lng}`,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CUSTOMER_SAVE_ADDRESS,
    PAYLOAD: ADDRESS_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const location = async (addr) => {
    await SaveData("location", JSON.stringify(addr)).then(() => {
      goBack();
    });
  };

  useEffect(() => {
    if (data?.status == 200) {
      location(data?.data);
      setTimeout(() => {
        showToastMessage(data?.message);
      }, 100);
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (google_address.city && google_address.state && google_address.zipcode) {
      fetchData(0);
    } else {
    }
  }, [google_address]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setCurrentLat(location.latitude);
        setCurrentLong(location.longitude);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  const getPlacedetails = (lat, lng, details) => {
    const { address_components } = details;
    let addressComponent = address_components;
    var stateee = "";
    var cityyyy = "";
    var zipcodeeee = "";
    var localityyyy = "";
    for (var i = 0; i < addressComponent.length; i++) {
      if (
        addressComponent[i].types.findIndex((item) => item === "postal_code") >
        -1
      ) {
        zipcodeeee = addressComponent[i].long_name;
      } else if (
        addressComponent[i].types.findIndex(
          (item) => item === "administrative_area_level_1"
        ) > -1
      ) {
        stateee = addressComponent[i].long_name;
      } else if (
        addressComponent[i].types.findIndex((item) => item === "locality") > -1
      ) {
        localityyyy = addressComponent[i].long_name;
      } else if (
        addressComponent[i].types.findIndex(
          (item) => item === "administrative_area_level_2"
        ) > -1
      ) {
        if (addressComponent[i]?.long_name) {
          cityyyy = addressComponent[i].long_name;
        }

        setTimeout(() => {
          if (localityyyy) {
            cityyyy = localityyyy;
          }
          setGoogleAddress({
            city: cityyyy,
            state: stateee,
            zipcode: zipcodeeee,
          });
          setStreet("no");
          setHasMorePages(false);
        }, 1000);
      }
    }
  };
  const getPlacedetailsFromLatLng = (lat, lng, details) => {
    var stateee = "";
    var cityyyy = "";
    var zipcodeeee = "";
    var localityyyy = "";

    Geocoder.init(Secrets.GOOGLE_MAPS.MAP_KEY);
    Geocoder.from(lat, lng)
      .then((json) => {
        console.log(json);
        var addressComponent = json.results[0].address_components;

        for (var i = 0; i < addressComponent.length; i++) {
          if (
            addressComponent[i].types.findIndex(
              (item) => item === "postal_code"
            ) > -1
          ) {
            zipcodeeee = addressComponent[i].long_name;
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "administrative_area_level_1"
            ) > -1
          ) {
            stateee = addressComponent[i].long_name;
          } else if (
            addressComponent[i].types.findIndex((item) => item === "locality") >
            -1
          ) {
            localityyyy = addressComponent[i].long_name;
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
                cityyyy = data[0];
              } else {
                cityyyy = addressComponent[i].long_name;
              }
            }

            setTimeout(() => {
              if (localityyyy) {
                cityyyy = localityyyy;
              }
              setGoogleAddress({
                city: cityyyy,
                state: stateee,
                zipcode: zipcodeeee,
              });
            }, 1000);
          }
        }
      })

      .catch((error) => console.warn(error));
  };

  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        styles={{
          textInputContainer: { height: 45 },
          textInput: { color: "black" },
          description: { color: "black" },
        }}
        placeholder="Search"
        fetchDetails={true}
        onPress={(data: any, details: any = null) => {
          if (data?.description) {
            let streetAddress = data?.description.split(",");
            setSelectedAddress({
              vicinity:
                streetAddress.length == 1
                  ? streetAddress[0] + ` ` + streetAddress[1]
                  : streetAddress[0],
              lat: details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
            });
          } else {
            setSelectedAddress({
              vicinity: data?.description,
              lat: details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
            });
          }

          getPlacedetails(
            details?.geometry?.location?.lat,
            details?.geometry?.location?.lng,
            details
          );
        }}
        query={{
          key: assets.Secrets.GOOGLE_AUTO_PLACE_KEY,
          language: "en",
        }}
      />
    );
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
      <View style={[pallete.screen_container]}>
        <View style={styles.input_view}>{GooglePlacesInput()}</View>
        <EditAddrs_pannel
          click={(item) => {
            setSelectedAddress(item);
            getPlacedetailsFromLatLng(
              item?.geometry.location.lat,
              item?.geometry.location.lng,
              null
            );
          }}
          Data={[]}
        />
      </View>
    </SafeAreaView>
  );
};
export default SEarch_deliveryAddrs;
