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
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";

import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import { SEND_OTP_URL } from "../../Services/ApiUrls";
import { showToastMessage, validateEmail } from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Pass_forgot = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [email, setEmail] = useState("");

  const otp_payload = {
    email: email.trim(),
    type: "2",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: SEND_OTP_URL,
    PAYLOAD: otp_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        showToastMessage(data.message);
      }, 300);
      if (data.status == 200) {
        navigate(assets.NavigationConstants.FORGOT_PASSWORD_OTP.NAME, {
          Email: email.trim(),
          otp: data?.data?.otp,
        });
      }
    }
  }, [data, error, responseCode]);

  const isLoginValid = () => {
    if (!email.trim()) {
      showToastMessage("email id is required");
      return false;
    } else if (!validateEmail(email.trim())) {
      showToastMessage("enter valid email address");
      return false;
    }
    return true;
  };
  const Otp_send = () => {
    if (isLoginValid()) {
      fetchData(0);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.scrollContainer}
      >
        <Modal
          visible={
            loading === LOADING_TYPES.LOADING ||
            loading === LOADING_TYPES.FETCHING_MORE
          }
          transparent={true}
        >
          <View style={[pallete.loader_View]}>
            <ActivityIndicator
              size="large"
              color="white"
              justifyContent={"center"}
              marginTop="100%"
            />
          </View>
        </Modal>
        <FontAwesome
          name={"angle-left"}
          color={assets.Colors.BLACK_COLOR}
          size={45}
          onPress={goBack}
        />
        <Image source={assets.Images.STAY_PUT_LOGO} style={styles.logo} />
        <Text style={styles.subtitle}>Stay put, we'll get it for you!</Text>
        <Text_Input
          placeHolderColor={assets.Colors.INPUT_BORDER_COLOR}
          change={(text) => setEmail(text)}
          edit={email}
          style={[styles.space_vertical, styles.spaceTop]}
          subtitle={"user@example.com"}
          title="Email Address"
        />
        <Button
          imgBG={""}
          style={styles.spaceTop}
          event={Otp_send}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Next"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Pass_forgot;
