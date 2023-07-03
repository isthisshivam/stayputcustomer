import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    order_list: {
      flex: 1,
      marginTop: dW(5),
      marginLeft: dW(20),
    },
    search_input: {
      margin: 20,
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      paddingHorizontal: dW(20),
      paddingVertical: dW(10),
      flexDirection: "row",
      alignItems: "center",
      shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
      shadowOffset: {
        width: dW(0),
        height: dW(3),
      },
      shadowRadius: dW(8),
      shadowOpacity: dW(9),
      elevation: 5,
      marginTop: 20,
    },
    placeHolder: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(10),
      width: "82%",
    },
  });
};
export default useStyle;
