import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: dW(15),
      flex: 1,
    },
    container: {
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      borderRadius: dW(5),
      padding: dW(20),
      marginTop: dW(12),
      shadowColor: assets.Colors.ORDER_SHADOW,
      shadowOffset: {
        width: dW(0),
        height: dW(1),
      },
      shadowRadius: dW(10),
      shadowOpacity: dW(1.8),
      elevation: 5,
      // backgroundColor: '#0000'
    },
    topContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    column: {
      flexDirection: "column",
    },
    promoteApp: {
      fontSize: dW(18),
      fontFamily: assets.fonts.ROBOTO_BOLD,
    },
    shareNow: {
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.TERMS_CONDITION_COLOR,
      marginTop: dW(10),
    },
    sack_dollar: {
      resizeMode: "contain",
      height: dW(40),
      width: dW(40),
      tintColor: assets.Colors.SIGN_IN_COLOR,
      alignSelf: "center",
    },
    account: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.INPUT_TITLE_COLOR,
      marginTop: dW(12),
    },
    profile: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      borderRadius: dW(40),
      height: dW(80),
      width: dW(80),
      alignSelf: "flex-end",
    },
    image: {
      height: dW(80),
      width: dW(80),
      borderRadius: dW(40),
      alignSelf: "center",
      resizeMode: "contain",
    },
    profile_column: {
      flexDirection: "column",
      alignSelf: "flex-end",
      marginLeft: dW(15),
    },
    name: {
      fontSize: dW(18),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    profile_details: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      marginTop: dW(5),
    },
    edit: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.TERMS_CONDITION_COLOR,
      alignSelf: "flex-end",
      textAlign: "center",
      marginRight: dW(14),
    },
    paddingvertical: {
      paddingVertical: dW(12),
    },
  });
};
export default useStyle;
