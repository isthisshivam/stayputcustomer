import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Image, Platform } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";

import { GetData } from "../../utils/utilities";
import {
  ACCESS_TOKEN,
  LOGIN_KEY,
  clearAsyncStorage,
} from "../../Storage/ApplicationStorage";
import { triggerPushNotification } from "../../utils/PushNotification";

var isNot = null;
global.isProfileCompleted = false;
global.userSelectedDeliveryAddress = null;
const Splash = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const value = await GetData(LOGIN_KEY);
    if (value) {
      const user_key = JSON.parse(value);
      global.UserId = user_key?.id;
      const user_check = user_key.is_completed;
      const user_selected_address = user_key?.address;
      global.currentUserId = user_key?.id;

      setTimeout(() => {
        if (user_check == "0") {
          global.isProfileCompleted = false; //when user profile incompleted
          navigation.navigate(assets.NavigationConstants.AUTH_STACK.NAME, {
            screen: assets.NavigationConstants.USER_TYPE.NAME,
          });
          return false;
        } else if (user_check == "1") {
          global.isProfileCompleted = true; //when user profile completed
          global.userSelectedDeliveryAddress = user_selected_address; //when user filled address
          navigation.navigate(assets.NavigationConstants.AUTH_STACK.NAME, {
            screen: assets.NavigationConstants.USER_TYPE.NAME,
          });

          return false;
        } else if (user_check == null) {
          null;
        }
      }, 3000);

      return true;
    } else {
      setTimeout(() => {
        navigation.navigate(assets.NavigationConstants.AUTH_STACK.NAME, {
          screen: assets.NavigationConstants.LOG_IN.NAME,
        });
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            height: 150,
            width: 150,
            marginTop: -100,
            borderRadius: 10,
          }}
          resizeMode="contain"
          source={assets.Images.LOGO}
        ></Image>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
