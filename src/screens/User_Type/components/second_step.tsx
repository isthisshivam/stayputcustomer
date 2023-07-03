import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import assets from "../../../assets";
import { dW, windowWidth } from "../../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetLocation from "react-native-get-location";

export default ({
  onSelect,
  addrs,
  full_add,
  prevPage,
  isProfileCompleted,
}) => {
  const navigation = useNavigation();
  const { navigate, goBack } = useNavigation();
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();

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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (full_add) {
        setCurrentLat(full_add.latitude);
        setCurrentLong(full_add.longitude);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!isProfileCompleted && (
        <FontAwesome
          name={"angle-left"}
          color={assets.Colors.BLACK_COLOR}
          size={45}
          onPress={prevPage}
        />
      )}

      <Text style={styles.title}>{"My delivery \naddress is..."}</Text>
      <Text style={styles.subtitle}>
        (Don't worry, you can change this later.)
      </Text>
      <View style={styles.mapview}>
        {currentLat && currentLong && (
          <MapView
            style={styles.map}
            // mapType={Platform.OS == "android" ? "terrain" : "standard"}
            mapType={"standard"}
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
              <Image source={assets.Images.MAP_MARKER} style={styles.marker} />
            </Marker>
          </MapView>
        )}
      </View>
      <View style={styles.addressView}>
        <Text style={styles.address}>Delivery Address</Text>
        <Pressable
          style={[styles.textinput]}
          onPress={() =>
            navigation.navigate(
              assets.NavigationConstants.EDIT_DELIVERY_ADDRESS.NAME
            )
          }
        >
          <Ionicons
            name="search-outline"
            color={assets.Colors.THEME_COLOR_PRIMARY}
            size={22}
          />
          <Text numberOfLines={1} style={styles.input}>
            {full_add?.address} {full_add?.city} {full_add?.state}{" "}
            {full_add?.zip}
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            addrs
              ? [
                  onSelect(full_add),
                  global.branchIo.logEvent("Input Delivery Address", {
                    customData: {
                      anonymousid: global.UserId,
                      referrer: null,
                      screenURL: "User_Type",
                    },
                  }),
                ]
              : null
          }
          style={addrs ? styles.btnView : styles.disable_btnView}
        >
          <Text style={styles.btn}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: windowWidth(),
    padding: dW(15),
    marginTop: dW(20),
  },
  title: {
    fontSize: dW(27),
    textAlign: "center",
    marginTop: dW(40),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  subtitle: {
    marginTop: dW(15),
    fontSize: dW(18),
    color: assets.Colors.PLACEHOLDER_TEXT_COLOR,
    textAlign: "center",
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
  mapview: {
    width: "100%",
    height: "30%",
    marginTop: dW(30),
    borderRadius: dW(10),
  },
  marker: {
    height: dW(40),
    width: dW(40),
    resizeMode: "contain",
    alignSelf: "center",
  },
  addressView: {
    width: "100%",
    marginTop: dW(10),
    padding: dW(15),
  },
  address: {
    fontSize: dW(15),
  },
  logoStyle: {
    height: dW(20),
    width: dW(20),
    //alignSelf: 'center'
    //marginLeft: dW(15)
  },
  textinput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: dW(15),
    borderBottomWidth: 2,
    borderBottomColor: assets.Colors.BUTTON_THEME_COLOR,
    paddingBottom: dW(8),
  },
  input: {
    marginLeft: dW(12),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontSize: dW(16),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    width: "85%",
  },
  btnView: {
    marginTop: dW(30),
    padding: dW(20),
    backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
  },
  disable_btnView: {
    marginTop: dW(30),
    padding: dW(20),
    backgroundColor: "silver",
  },
  btn: {
    fontSize: dW(20),
    color: "white",
    textAlign: "center",
    fontFamily: assets.fonts.ROBOTO_BOLD,
  },
  map: {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: "100%",
    height: "100%",
  },
});
