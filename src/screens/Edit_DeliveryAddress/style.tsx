import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    input_view: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: dW(0.8),
      borderRadius: dW(5),
      borderColor: assets.Colors.INPUT_BORDER_COLOR,
      padding: dW(1),
      marginTop: dW(25),
    },
    placeHolder: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(10),
      width: "85%",
    },
    areaTxt: {
      marginTop: dW(10),
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    },
    bottomStyle: {
      flexDirection: "row",
      marginTop: dW(30),
      alignContent: "center",
    },
    address_content: {
      flexDirection: "column",
      marginLeft: dW(15),
    },
    currentLocation: {
      fontSize: dW(16),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
  });
};
export default useStyle;
