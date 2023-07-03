import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    title: {
      fontSize: dW(28),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      marginTop: dW(15),
    },

    container: {
      flexDirection: "column",
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      marginTop: dW(10),
      padding: dW(10),
      shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
      shadowOffset: {
        width: dW(0),
        height: dW(1),
      },
      shadowRadius: dW(8),
      shadowOpacity: dW(1.8),
      elevation: dW(5),
      marginHorizontal: 5,
      borderRadius: dW(10),
    },
    mapview: {
      width: "100%",

      height: dW(200),
      borderRadius: dW(10),
      marginTop: dW(10),
    },
    map: {
      width: "100%",
      height: "100%",
      borderRadius: dW(5),
    },
    marker: {
      height: dW(40),
      width: dW(40),
      resizeMode: "contain",
      alignSelf: "center",
    },
    storeName: {
      fontSize: dW(18),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      marginTop: dW(20),
    },
    heading: {
      fontSize: dW(22.5),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.SIGN_IN_COLOR,
      marginTop: dW(10),
    },
    deliveryTxt: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_LIGHT,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      marginTop: dW(15),
    },
    viewOrder: {
      alignSelf: "flex-end",
      borderWidth: dW(0.8),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      borderColor: assets.Colors.ACCOUNT_TXT_COLOR,
      alignContent: "center",
      borderRadius: dW(17),
      marginTop: dW(15),
    },
    viewTxt: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      paddingVertical: dW(8),
      paddingHorizontal: dW(10),
    },

    list: {
      borderBottomWidth: dW(0.5),
      borderColor: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      paddingVertical: dW(15),
    },

    previousorderContainer: {
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    leftContent: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    date_price: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    },
    right: {
      borderWidth: dW(0.8),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      borderColor: assets.Colors.ACCOUNT_TXT_COLOR,
      alignContent: "center",
      borderRadius: dW(17),
    },
  });
};
export default useStyle;
