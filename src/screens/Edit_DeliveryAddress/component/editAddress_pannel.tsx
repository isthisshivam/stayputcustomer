import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
const styles = useStyle();
import Geocoder from "react-native-geocoding";
import { Secrets } from "../../../assets/Secrets";
export const EditAddrs_pannel = ({ data, deliveryAddress }) => {
  const { navigate, goBack } = useNavigation();
  const Items = (item) => (
    <Pressable
      onPress={() => {
        deliveryAddress(item);

        getPlacedetails(item);
      }}
      style={styles.categories_content}
    >
      <View style={styles.icon_addrs}>
        <MaterialCommunityIcons
          name="map-marker-outline"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={25}
        />
        <View style={styles.address_content}>
          <Text style={styles.roadTxt}>{item.name}</Text>
          <Text style={styles.areaTxt}>{item.vicinity}</Text>
        </View>
      </View>
      <View></View>
    </Pressable>
  );

  const getPlacedetails = (item) => {
    var zip = "";
    var state = "";
    var city = "";
    Geocoder.init(Secrets.GOOGLE_MAPS.MAP_KEY);
    Geocoder.from(item.geometry.location.lat, item.geometry.location.lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components;

        for (var i = 0; i < addressComponent.length; i++) {
          if (
            addressComponent[i].types.findIndex(
              (item) => item === "postal_code"
            ) > -1
          ) {
            zip = addressComponent[i].long_name;
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
        const ADDRESS_PAYLOAD = {
          address: item.vicinity,
          city: city,
          state: state,
          zip: zip,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
        };
        navigate(assets.NavigationConstants.AUTH_STACK.NAME, {
          screen: assets.NavigationConstants.USER_TYPE.NAME,
          params: {
            home: item.name,
            full_addr: item.vicinity,
            address: ADDRESS_PAYLOAD,
          },
        });
      })

      .catch((error) => console.warn(error));
  };
  return (
    <View style={styles.address_list}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => Items(item)}
      />
      <View style={styles.bottomStyle}>
        <Feather
          name="navigation"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={18}
        />
        <View style={styles.address_content}>
          <Text style={styles.currentLocation}>Don't see your address</Text>
          <Text
            onPress={() => [
              (global.deliveryAuthStack = true),
              navigate(assets.NavigationConstants.FULL_DELIVERY_ADDRESS.NAME),
            ]}
            style={[
              styles.areaTxt,
              { color: assets.Colors.TERMS_CONDITION_COLOR },
            ]}
          >
            Enter your delivery address manually
          </Text>
        </View>
      </View>
    </View>
  );
};
