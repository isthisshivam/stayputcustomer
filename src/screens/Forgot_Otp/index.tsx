import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import OTPTextInput from "react-native-otp-textinput";
import { VERIFY_OTP, SEND_OTP_URL } from "../../Services/ApiUrls";
import { resetStack, showToastMessage } from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

var RESET_INTERVAL = 10;

const Email_otp = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const navigation = useNavigation();
  const [otp, setOtp] = useState(route?.params?.otp);
  const user_email = route?.params?.Email;
  const [time, setTime] = useState(0);
  const [RESET_INTERVAL_S, setIntervalReset] = useState(RESET_INTERVAL);

  const otp_payload = {
    email: user_email,
    otp: otp.trim(),
    type: "2",
  };
  const resend_otp_payload = {
    email: user_email,
    type: "2",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: VERIFY_OTP,
    PAYLOAD: otp_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  const {
    data: r_data,
    loading: r_loading,
    error: r_error,
    fetchData: r_fetchdata,
    responseCode: r_responseCode,
  } = useRest({
    URL: SEND_OTP_URL,
    PAYLOAD: resend_otp_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        showToastMessage(data.message);
      }, 300);
      if (data.status == 200) {
        resetStack(
          assets.NavigationConstants.RESET_PASSWORD.NAME,
          { password_update_token: data?.data?.password_update_token },
          navigation
        );
      }
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        showToastMessage(r_data.message);
      }, 300);
      if (r_data.status == 200) {
      }
    }
  }, [r_data, r_error, r_responseCode]);

  useEffect(() => {
    setTime(0), setIntervalReset(RESET_INTERVAL);
    const timerId = setInterval(() => {
      time >= RESET_INTERVAL_S ? null : setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const Timer = (time) => {
    const timeRemain = RESET_INTERVAL_S - (time % RESET_INTERVAL_S);
    return (
      <>
        <Text>{time >= RESET_INTERVAL_S ? null : formatTime(timeRemain)}</Text>
      </>
    );
  };
  const formatTime = (time) =>
    `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60
    ).padStart(2, "0")}`;

  const resend = () => {
    setTime(0);
    r_fetchdata(0);
  };

  const isOtpValid = () => {
    if (!otp.trim()) {
      showToastMessage("OTP is required");
      return false;
    } else if (otp.trim().length != 6) {
      showToastMessage("Please enter 6 digit OTP");
      return false;
    }
    return true;
  };

  const Otp_Verified = () => {
    if (isOtpValid()) {
      fetchData(0);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollContainer}>
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
          <View style={styles.screenContainer}>
            <Text style={styles.verify_id}>Verify Your Identity</Text>
            <Text style={styles.smallTxt}>
              Enter the 6-digit code we send to your email id {user_email}
            </Text>
            <OTPTextInput
              defaultValue={otp}
              inputCount={6}
              handleTextChange={(e) => setOtp(e)}
              containerStyle={styles.otp_container}
              textInputStyle={styles.otp_input}
              tintColor={assets.Colors.INACTIVE_STORE_BG_COLOR}
            />
            {time < RESET_INTERVAL ? (
              <Text style={styles.timer_txt}>
                {" "}
                You can resend OTP in{" "}
                {time !== 0 ? <Text>{Timer(time)} Min</Text> : null}{" "}
              </Text>
            ) : (
              <Text onPress={resend} style={styles.resendCode}>
                Resend Code
              </Text>
            )}
          </View>
        </ScrollView>
        <Button
          imgBG={""}
          style={[styles.buttn, pallete.mb_10]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={Otp_Verified}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Continue"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Email_otp;
