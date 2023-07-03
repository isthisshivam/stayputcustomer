import { StyleSheet } from "react-native";
import { dH, dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: dW(25),
      paddingTop: dW(10),
    },
    headerLeft: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTxt_container: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: dW(0.8),
      alignItems: "center",
      borderRadius: dW(20),
      borderColor: assets.Colors.ACCOUNT_TXT_COLOR,
      paddingVertical: dW(10),
      paddingHorizontal: dW(10),
    },
    headerTxt_container_drop: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: dW(0.8),
      alignItems: "center",
      width: dW(124),
      height: dH(32),
      borderRadius: dW(20),
      marginLeft: 10,
      backgroundColor: "white",
      borderColor: assets.Colors.ACCOUNT_TXT_COLOR,
      paddingVertical: dW(1),
      paddingHorizontal: dW(2),
    },
    dropdown: {
      marginTop: 10,
      paddingVertical: dW(0),
      paddingHorizontal: dW(0),
      borderRadius: dW(4),
    },
    cart_container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: assets.Colors.ACTIVE_STORES_BG_COLOR,
      borderRadius: dW(18),
      paddingVertical: dW(8),
      paddingHorizontal: dW(15),
    },
    cartTxt: {
      fontSize: dW(16),
      color: assets.Colors.BACKGROUND_THEME_COLOR,
      fontFamily: assets.fonts.ROBOTO_BOLD,
      marginLeft: dW(5),
      textAlign: "center",
    },
    headerTxt: {
      fontSize: dW(14),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },

    input_view: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: dW(0.8),
      borderColor: assets.Colors.ACTIVE_STORES_BG_COLOR,
      padding: dW(8),
      borderRadius: dW(5),
      marginTop: dW(10),
    },
    placeHolder: {
      color: assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR,
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(10),
      width: "82%",
    },
    topMargin: {
      marginTop: dW(19),
    },
    horizontalScroll: {
      backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      marginTop: dW(15),
    },
    productFlow: {
      backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      flexDirection: "row",
      paddingVertical: dW(10),
      alignItems: "center",
    },
    txt: {
      fontSize: dW(12),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
    },

    brand_title: {
      fontSize: dW(18),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    share: {
      height: dW(25),
      width: dW(25),
      resizeMode: "contain",
      alignSelf: "center",
    },
    ratingView: {
      flexDirection: "row",
      marginTop: dW(10),
      paddingHorizontal: dW(25),
      alignItems: "center",
    },
    ratingTxt: {
      fontSize: dW(10),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(5),
      alignSelf: "center",
      textAlignVertical: "center",
    },
    productImage_view: {
      padding: dW(20),
      alignItems: "center",
    },
    image_style: {
      height: dW(120),
      width: dW(120),
      resizeMode: "contain",
      alignSelf: "center",
    },
    horizontal_image: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: dW(20),
    },
    images_style: {
      height: dW(50),
      width: dW(50),
      margin: dW(3),
      resizeMode: "contain",
    },
    add_sub: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    },
    product_price: {
      fontSize: dW(24),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    in_Stock: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
    },
    product_qntity: {
      fontSize: dW(16),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      paddingHorizontal: dW(30),
    },
    product_details: {
      fontSize: dW(16),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    qty: {
      fontSize: dW(13),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      paddingVertical: dW(3),
      paddingHorizontal: dW(8),
    },
    flex_end: { alignSelf: "flex-end", flex: 0.5 },
    icon: {
      borderWidth: dW(0.8),
      borderRadius: dW(20),
      justifyContent: "center",

      padding: dW(3),
      borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    },
    product_detail: {
      fontSize: dW(20),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    paddinghorizontal: {
      paddingHorizontal: dW(25),
    },
    bttn: {
      width: dW(162),
      alignSelf: "flex-end",
      marginRight: dW(20),
    },

    productDetails_container: {
      borderBottomWidth: dW(0.7),
      paddingVertical: dW(20),
      borderColor: assets.Colors.CART_BORDER_CLR,
    },

    details_content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      marginTop: dW(10),
    },
    details_row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    details: {
      fontSize: dW(16),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(10),
    },
    details_bottom: {
      flexDirection: "column",
      marginTop: dW(20),
      marginLeft: dW(25),
      alignItems: "flex-start",
    },
    combo_image: {
      flexDirection: "row",
      alignItems: "center",
      margin: dW(3),
      marginTop: dW(20),
    },
    detailsBottom_rowContent: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginTop: dW(3),
    },
    seeAll_spec: {
      flexDirection: "row",
      alignSelf: "flex-end",
      marginTop: dW(20),
      alignItems: "center",
    },
    model_sku_View: {
      flexDirection: "row",
      alignItems: "center",

      paddingTop: dW(25),
    },
    normal_txt: {
      flex: 1,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginTop: dW(3),
    },
    bold_txt: {
      flex: 0.75,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginTop: dW(3),
    },
  });
};
export default useStyle;
