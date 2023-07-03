import { StyleSheet } from "react-native";
import assets from ".";
import { dW } from "../utils/dynamicHeightWidth";
const usePallete = () => {
  return StyleSheet.create({
    mainContainor: {
      flex: 1,
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      // paddingTop:dW(10)
    },
    screen_container: {
      paddingHorizontal: dW(15),
      flex: 1,
    },
    loader_View: {
      flex: 1,
      backgroundColor: assets.Colors.MODAL_BACKGROUND_COLOR,
    },
    loader: {
      alignSelf: "center",
      flex: 1,
    },
    cardView: {
      flexDirection: "row",
      padding: dW(30),
      alignItems: "center",
      backgroundColor: "white",
      marginTop: dW(25),
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      borderRadius: dW(6),
    },
    footer: {
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });
};
export default usePallete;
