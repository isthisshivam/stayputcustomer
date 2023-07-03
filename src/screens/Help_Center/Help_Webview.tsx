import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Linking,
  Pressable,
  ActivityIndicator,
} from "react-native";

import usePallete from "../../assets/Pallete";

import Header from "./component/header";
import WebView from "react-native-webview";
import { HELP_LINK } from "../../Services/ApiUrls";
const HelpWebView = (props) => {
  const pallete = usePallete();

  const IndicatorLoadingView = () => {
    return (
      <ActivityIndicator
        color="orange"
        size="small"
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Header />
      <WebView
        startInLoadingState={true}
        renderLoading={() => IndicatorLoadingView()}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        source={{ uri: HELP_LINK }}
      />
    </SafeAreaView>
  );
};
export default HelpWebView;
