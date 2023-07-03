import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";
const useStyle = () => {
  return StyleSheet.create({
    store_content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: dW(25),
    },
    rightContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    store_icon: {
      height: dW(40),
      width: dW(40),
      alignSelf: "center",
      borderRadius: dW(18),
      resizeMode: "contain",
    },

    store: {
      textAlign: "center",
      fontSize: dW(18),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginLeft: dW(10),
    },
    items: {
      textAlign: "center",
      fontSize: dW(14),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },

    cart_content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(30),
    },

    image: {
      height: dW(50),
      width: dW(50),
      alignSelf: "center",
      resizeMode: "contain",
    },
    center_content: {
      flexDirection: "column",
      marginLeft: dW(15),
    },
    titleTxt: {
      fontSize: dW(14),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      width: dW(150),
    },
    priceTxt: {
      marginTop: dW(10),
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    qty: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    center_contents: {
      flexDirection: "row",
      marginTop: dW(15),
    },
    column_content: {
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      fontSize: dW(18),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginLeft: dW(15),
      width: dW(200),
    },
    subtitle: {
      marginTop: dW(8),
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      marginLeft: dW(15),
    },
    storeName: {
      fontSize: dW(18),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_BOLD,
      textAlign: "center",
      marginTop: dW(15),
    },
    num: {
      fontSize: dW(15),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      marginTop: dW(10),
    },
    small_txt: {
      fontSize: dW(12),
      //   width: 20,
      height: 40,
      flex: 1,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
    },
    sub_total: {
      fontSize: dW(12),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
    },
  });
};
export default useStyle;
