import { StyleSheet, Platform } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR,
    },
    header: {
      width: "100%",
      flexDirection: "row",
      backgroundColor: "white",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(34),
      height: 55,
      ...Platform.select({
        ios: {
          shadowColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
          shadowOffset: {
            width: dW(0),
            height: dW(8),
          },
          shadowRadius: dW(5),
          shadowOpacity: dW(1.8),
        },
        android: {
          elevation: 5,
        },
        default: {
          // other platforms, web for example
        },
      }),
    },
    back_btn: {
      height: 55,
      width: 55,
      alignItems: "center",
      justifyContent: "center",
    },
    heading: {
      fontSize: dW(21),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
    },
    send: { height: 20, width: 20, resizeMode: "contain" },
    forgot_pass_heading: {
      color: "#000",
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },

    left_msg: {
      padding: 10,
      backgroundColor: "#72E22E",
      borderRadius: 10,
      marginRight: "40%",
      alignSelf: "flex-start",
      marginTop: 6,
      marginLeft: 10,
    },
    sender_img: { height: 30, width: 30, borderRadius: 15 },
    right_msg: {
      borderRadius: 10,
      backgroundColor: assets.Colors.RIGHT_MSG,
      marginLeft: "40%",
      padding: 10,
      marginTop: 6,
      marginRight: 10,
      alignSelf: "flex-end",
    },
    left_msg_c: { flexDirection: "row", marginTop: 20 },
    left_msg_time: {
      color: "gray",
      marginLeft: 10,
      marginTop: 3,
      fontSize: 12,
    },
    right_msg_c: { flexDirection: "row", alignSelf: "flex-end", marginTop: 20 },
    right_msg_c_c: { alignSelf: "flex-end", alignItems: "flex-end" },
    right_msg_text: {
      color: "gray",
      marginRight: 10,
      marginTop: 0,
      fontSize: 12,
    },
  });
};
export default useStyle;
