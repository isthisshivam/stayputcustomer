import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: assets.Colors.WHITE,
    },
    screen: {
      flex: 1,
      paddingHorizontal: dW(20),
    },

    search_input: {
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
      // elevation: 5,
      shadowOffset: {
        width: dW(2),
        height: dW(2),
      },
      shadowRadius: dW(5),
      shadowOpacity: dW(1.8),
      elevation: 6,
      marginTop: 20,
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
    placeHolder: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(10),
      width: "82%",
    },
    searchList: {
      marginTop: dW(20),
      flex: 1,
    },
    recent_View: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: dW(10),
      alignItems: "center",
    },
    recent_Text: {
      marginLeft: dW(10),
      textAlign: "center",
      fontSize: dW(15),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      width: dW(250),
    },
    order_list: {
      flex: 1,
      marginTop: dW(15),
    },
  });
};
export default useStyle;
