import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import SVG_View from "../../common_components/SVG_View";

import { RUNNER_CREATE } from "../../Services/ApiUrls";
import { IMAGE_URL } from "../../Services/ApiUrls";
import {
  SaveData,
  showToastMessage,
  validateEmail,
  requestAndroidCameraPermission,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { ACCESS_TOKEN, LOGIN_KEY } from "../../Storage/ApplicationStorage";
import useFileUploadingRestApi from "../../Services/rest/apiUploadImage";

import BackButton from "../../common_components/BackButton";
const Take_Selfie = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  const sign_upPayload = {
    step: "1",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: sign_upPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const {
    data: p_data,
    loading: p_loading,
    error: p_error,
    fetchData: p_fetchData,
    responseCode: p_responseCode,
  } = useFileUploadingRestApi({
    URL: IMAGE_URL,
    PAYLOAD: null,
    CALL_TYPE: CALL_TYPES.POST,
    fileList: [],
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      const status = data.status;
      if (status == 200) {
        saveLoginData(data);
        showToastMessage(data.message);
        navigate(assets.NavigationConstants.LICENSE_VERIFIED.NAME);
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 300);
      }
    }
  }, [data]);

  const saveLoginData = async (data) => {
    await SaveData(LOGIN_KEY, JSON.stringify(data.data));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const permission = await requestAndroidCameraPermission();
      if (permission) waitCameraInflation();
    } else {
      waitCameraInflation();
    }
  };
  const waitCameraInflation = () => {
    setTimeout(() => {
      openCamera();
    }, 500);
  };

  const openCamera = async () => {
    showToastMessage("Camera Unavailable!");
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton onBackPress={() => goBack()} />
      <ScrollView style={styles.scrollContainer}>
        <Modal
          visible={
            loading === LOADING_TYPES.LOADING ||
            loading === LOADING_TYPES.FETCHING_MORE
          }
          transparent={true}
        >
          <View style={[pallete.Loader_View]}>
            <ActivityIndicator
              size="large"
              color="white"
              justifyContent={"center"}
              marginTop="100%"
            />
          </View>
        </Modal>
        <Text style={styles.runner}>Take selfie!</Text>
        <Image source={assets.Images.SELFIE_ICON} style={styles.logo} />
        <Text style={styles.smallTxt}>
          Use your phone to selfie to verify with your driver's license
        </Text>
      </ScrollView>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_30]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => requestCameraPermission()}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Take photo"
      />
    </SafeAreaView>
  );
};
export default Take_Selfie;
