import { StyleSheet } from "react-native";
import { dW } from "../../../utils/dynamicHeightWidth";
import assets from "../../../assets";

const useStyle = () => {
  return StyleSheet.create({
    address_list: {
      flex: 1,
      marginTop: dW(15),
      marginBottom: dW(25),
    },
    categories_content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      marginTop: dW(10),
      width: "100%",
    },
    icon_addrs: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    address_content: {
      flexDirection: "column",
      marginLeft: dW(15),
      width: "85%",
    },
    roadTxt: {
      fontSize: dW(18),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      width: "80%",
    },
    areaTxt: {
      marginTop: dW(8),
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    },
    bottomStyle: {
      flexDirection: "row",
      marginTop: dW(30),
      alignItems: "center",
    },
    currentLocation: {
      marginLeft: dW(15),
      fontSize: dW(16),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
  });
};
export default useStyle;
