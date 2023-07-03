import { StyleSheet } from "react-native";
import { dW } from "../../../utils/dynamicHeightWidth";
import assets from "../../../assets";

const useStyle = () => {
  return StyleSheet.create({
    category_list: {
      marginLeft: dW(20),
      marginRight: dW(20),
    },
    categories_content: {
      margin: dW(3),
      alignItems: "center",
    },
    category_image: {
      // marginTop: dW(5),
      height: dW(50),
      width: dW(50),
      alignSelf: "center",
      resizeMode: "cover",
      borderRadius: dW(50) / 2,
      overflow: "hidden",
    },
    category_Text: {
      fontSize: dW(10),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      marginTop: dW(10),
      width: dW(90),
    },

    order_list: {
      marginTop: dW(30),
      marginLeft: dW(20),
    },
    title: {
      fontSize: dW(16),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },

    order_title: {
      fontSize: dW(12),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginTop: dW(10),
      width: dW(120),
    },

    booster_container: {
      marginTop: dW(17),
      margin: dW(3),
      flexDirection: "row",
      alignItems: "center",
      padding: dW(5),
    },
    booster_Right: {
      flexDirection: "column",
      marginLeft: dW(10),
    },
    booster_title: {
      fontSize: dW(8),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      width: dW(50),
    },
    booster_price: {
      fontSize: dW(10),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_BOLD,
      marginTop: dW(15),
    },
    booster_icon: {
      alignSelf: "flex-start",
      borderWidth: dW(0.8),
      borderRadius: dW(15),
      justifyContent: "center",
      top: dW(-8),
      padding: dW(3),
    },
  });
};
export default useStyle;
