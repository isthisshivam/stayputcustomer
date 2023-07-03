import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(30),
    },
    screenContainer: {
      marginTop: dW(30),
      alignItems: "center",
    },
    verify_id: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(23),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
    },
    smallTxt: {
      color: assets.Colors.INPUT_TITLE_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      marginTop: dW(50),
    },
    otp_container: {
      marginTop: dW(30),
    },
    otp_input: {
      width: dW(40),
    },

    resendCode: {
      color: assets.Colors.BUTTON_THEME_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      alignSelf: "center",
      marginTop: dW(30),
    },
    timer_txt: {
      fontSize: dW(17),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      alignSelf: "center",
      marginTop: dW(30),
    },
    buttn: {
      marginLeft: dW(30),
      marginRight: dW(30),
      marginBottom: dW(80),
    },
  });
};
export default useStyle;
