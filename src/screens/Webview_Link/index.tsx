import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { dW } from "../../utils/dynamicHeightWidth";

const Web_view = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { goBack } = useNavigation();
  const link = route?.params?.Link;
  const header = route?.params?.title;
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name={"arrow-left"}
          color={assets.Colors.BLACK_COLOR}
          size={dW(30)}
          onPress={goBack}
        />
        <Text style={styles.title}>{header}</Text>
        <View></View>
      </View>
      <View style={styles.webView}>
        <WebView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          source={{ uri: link }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Web_view;
