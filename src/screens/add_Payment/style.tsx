import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    inputView: {
      width: "100%",
      //borderRadius:dW(10),
      borderColor: assets.Colors.INPUT_BORDER_COLOR,
      padding: dW(10),
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: dW(0.8),
      marginTop: dW(10),
      borderRadius: dW(3),
    },
    textinput: {
      flexDirection: "row",
      //marginLeft:dW(10)
    },
    mainContainer: {
      padding: dW(18),
    },
    parentView: {
      width: "100%",
      height: "100%",
    },
    codeView: {
      width: "50%",
      borderWidth: dW(0.8),
      borderColor: assets.Colors.INPUT_BORDER_COLOR,
      padding: dW(10),
      borderRadius: dW(3),
    },
    code: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: dW(10),
    },
    textView: {
      //marginLeft:dW(15),
      width: "50%",
      padding: dW(12),
    },
    text: {
      fontSize: dW(16),
      alignItems: "center",
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    btnView: {
      marginTop: dW(30),
      padding: dW(12),
    },
    mask_input: {
      marginLeft: dW(5),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      width: "100%",
    },
    placehoder: {
      marginLeft: dW(5),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      width: "90%",
    },
    btn: {
      fontSize: dW(20),
      color: "white",
      textAlign: "center",
      fontFamily: assets.fonts.ROBOTO_BOLD,
    },
  });
};
export default useStyle;
