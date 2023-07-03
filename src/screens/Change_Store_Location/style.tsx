import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    input_view: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: dW(1),
      borderRadius: dW(5),
      borderColor: assets.Colors.INPUT_BORDER_COLOR,
      paddingHorizontal: dW(15),
      paddingVertical: dW(10),
      marginTop: dW(25),
    },
    placeHolder: {
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(10),
      width: "90%",
    },
    order_list: {
      flex: 1,
      marginTop: dW(30),
      marginLeft: dW(20),
    },
    title: {
      fontSize: dW(16),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },

    topPadding: {
      padding: dW(20),
    },
    optional_container: {
      paddingHorizontal: dW(3),
    },
    unselected_content: {
      backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      borderRadius: dW(20),
    },
    stores: {
      fontSize: dW(12),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      paddingHorizontal: dW(12),
      paddingVertical: dW(12),
    },
    stores_: {
      fontSize: dW(12),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      paddingHorizontal: dW(12),
      paddingVertical: dW(9),
    },

    search_input: {
      marginTop: dW(15),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      paddingHorizontal: dW(20),
      paddingVertical: dW(10),
      flexDirection: "row",
      alignItems: "center",
      shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
      // shadowOffset: {
      //     width: dW(0),
      //     height: dW(10)
      // },
      // shadowRadius: dW(8),
      // shadowOpacity: dW(1.8),
      shadowOffset: {
        width: dW(2),
        height: dW(2),
      },
      shadowRadius: dW(5),
      shadowOpacity: dW(1.8),

      elevation: 5,
    },
    search: {
      marginTop: dW(15),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      padding: dW(12),
      flexDirection: "row",
      alignItems: "center",
      borderWidth: dW(0.8),
      borderColor: assets.Colors.THEME_COLOR_PRIMARY,
      borderRadius: dW(5),
      marginLeft: dW(20),
      marginRight: dW(20),
    },

    topMargin: {
      marginTop: dW(15),
    },
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
