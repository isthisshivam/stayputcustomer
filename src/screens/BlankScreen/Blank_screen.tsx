import { LogBox } from "react-native";
import { Linking, Alert, ImageBackground, AppState } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  OpenCamera,
  OpenPicker,
  requestPermission,
} from "../../utils/PhotoLib";
import BottomSheet from "../../common_components/BottomSheet";

export const BlankScreen = (props) => {
  const refRBSheet = useRef();
  const { navigate } = useNavigation();

  useEffect(() => {
    refRBSheet.current.open();
  }, []);
  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
    }
  };
  useEffect(() => {
    const listener = AppState.addEventListener("change", _handleAppStateChange);
    return () => listener.remove();
  }, []);

  const onFileSelection = (image) => {
    refRBSheet.current.close();
    navigate("ImageViewer", { image });
  };

  return (
    <BottomSheet
      openCamera={() => OpenCamera(onFileSelection)}
      openFiles={() =>
        console.log("requestPermission==", requestPermission(onFileSelection))
      }
      reference={refRBSheet}
    />
  );
};
