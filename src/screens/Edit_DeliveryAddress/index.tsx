import React, { useState, useEffect } from "react";
import { SafeAreaView, View, TextInput, Text } from "react-native";
import useStyle from "./style";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-virtualized-view";
import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EditAddrs_pannel } from "./component/editAddress_pannel";
import GetLocation from "react-native-get-location";
import { SaveData, GetData } from "../../utils/utilities";
import LocationPermission from "../LocationPermission";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const Edit_deliveryAddrs = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [searchAddress, setSearchAddress] = useState([]);
  const [searchedTempRestaurent, setSearchedTempRestaurent] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [hasMorePages, setHasMorePages] = useState(true);
  const [token, setToken] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({});
  const [google_address, setGoogleAddress] = useState({
    state: "",
    city: "",
    zipcode: "",
  });

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

  const location = async (addr) => {
    await SaveData("location", JSON.stringify(addr)).then(() => {
      navigate(assets.NavigationConstants.AUTH_STACK.NAME, {
        screen: assets.NavigationConstants.USER_TYPE.NAME,
        params: {
          home: addr.city,
          full_addr: addr.address,
          address: addr,
        },
      });
    });
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
          key: "AIzaSyAg75Ekm-fJV3fmMWULmwxp-z3E5P0p3RM",
          language: "en",
        }}
      />
    );
  };

  const getPlacedetails = (lat, lng, details) => {
    const { address_components, formatted_address } = details;
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
          const ADDRESS_PAYLOAD = {
            address: formatted_address,
            city: cityyyy,
            state: stateee,
            zip: zipcodeeee,
            latitude: lat,
            longitude: lng,
            bussiness_name: "",
            apt: "",
          };
          location(ADDRESS_PAYLOAD);
        }, 1000);
      }
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
      <View style={[pallete.screen_container]}>
        <View style={styles.input_view}>
          {/* <Ionicons
            name="search"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={18}
          />
          <TextInput
            placeholder="Search"
            value={searchedText}
            placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
            style={styles.placeHolder}
            onChangeText={(text) => setSearchedText(text)}
          />
          <Ionicons
            onPress={remove}
            name="md-close-sharp"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={22}
          /> */}
          {GooglePlacesInput()}
        </View>
        <EditAddrs_pannel
          deliveryAddress={(item) => location(item)}
          data={[]}
        />
      </View>
    </SafeAreaView>
  );
};
export default Edit_deliveryAddrs;
