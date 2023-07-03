import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useIsMounted } from "./isMounted";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import OTPTextInput from "react-native-otp-textinput";
import auth from "@react-native-firebase/auth";
import { showToastMessage } from "../../utils/utilities";

import BackButton from "../../common_components/BackButton";

var RESET_INTERVAL = 10;

const Otp_verify = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();

  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const usernumber = route?.params?.phoneNumber;
  const [confirm, setConfirm] = useState(null);
  const last_numbers = usernumber?.replace(/.(?=.{4,}$)/g, "");
  const [time, setTime] = useState(0);
  const [RESET_INTERVAL_S, setIntervalReset] = useState(RESET_INTERVAL);
  const isMounted = useIsMounted();
  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  useEffect(() => {
    var timerId = null;
    if (isMounted()) {
      if (confirm) {
        setIntervalReset(RESET_INTERVAL);
        timerId = setInterval(() => {
          time >= RESET_INTERVAL_S ? null : setTime((t) => t + 1);
        }, 1000);
      }

      return () => {
        if (timerId) clearInterval(timerId);
      };
    }
  }, [confirm, time]);

  const Timer = (time) => {
    const timeRemain = RESET_INTERVAL_S - (time % RESET_INTERVAL_S);
    return (
      <Text>{time >= RESET_INTERVAL_S ? null : formatTime(timeRemain)}</Text>
    );
  };
  const formatTime = (time) =>
    `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60
    ).padStart(2, "0")}`;

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        "+1" + usernumber
      );
      setTimeout(() => {
        if (isMounted()) {
          setTime(0);
          setConfirm(confirmation);
          showToastMessage("Otp has been sent on your mobile number");
        }
      }, 2000);
    } catch (e) {
      console.log("error==", e);
    }
  };
  useEffect(() => {
    console.log("when ismount will change...........");
  }, [isMounted()]);

  const confirmCode = async () => {
    try {
      const res = await confirm.confirm(otp);
      console.log("OTP Success====", JSON.stringify(res));
      global.universalObject.logEvent("Account-Verified", {
        customData: {
          anonymousid: global.userId,
          device: Platform.OS,
          Screen: "Verify_code",
          URL: "Otp_verify",
        },
      });
      if (res?.additionalUserInfo) {
        navigation.navigate(
          assets.NavigationConstants.STACKS.COMPLETE_PROFILE_STACK
        );
      } else {
        showToastMessage("Invalid code");
      }
    } catch (error) {
      console.log("OTP error====", JSON.stringify(error));
      if (error.code == "auth/invalid-verification-code") {
        showToastMessage("Invalid code");
      } else if (error.code === "auth/provider-already-linked") {
      } else {
        showToastMessage(error.message);
      }
    }
  };

  const resend = () => {
    signInWithPhoneNumber();
  };

  const is_otp = () => {
    if (!otp.trim()) {
      showToastMessage("Please enter your OTP");
      return false;
    } else if (otp.trim().length != 6) {
      showToastMessage("Please enter 6 digit OTP");
      return false;
    }
    return true;
  };

  const verify_OTP = () => {
    if (is_otp()) {
      confirmCode();
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton onBackPress={() => navigation.goBack()}></BackButton>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.screenContainer}>
            <Text style={styles.verify_id}>`Verify Your Identity`</Text>
            <Text style={styles.smallTxt}>
              Enter the 6-digit code we send to the phone number ending in{" "}
              {last_numbers}
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
                {time != 0 ? (
                  <Text style={styles.timer_txt}>{Timer(time)} Min</Text>
                ) : null}
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
          style={styles.buttn}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={verify_OTP}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Continue"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Otp_verify;
