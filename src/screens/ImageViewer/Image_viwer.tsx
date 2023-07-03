import { LogBox, Touchable } from "react-native";
import {
  Linking,
  Alert,
  View,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import React, { useEffect, useRef } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";

import { imageToPdf } from "../../utils/utilities";
var imagePaths = [];
var fileName = null;
export const ImageViewer = (props) => {
  useEffect(() => {
    setImagePaths();
  });

  const setImagePaths = () => {
    if (props.route.params.image) imagePaths.push(props.route.params.image.uri);
    if (props.route.params.image.filename) {
      const imageNameData = props.route.params.image.filename;
      const split = imageNameData.split(".");
      fileName = split[0];
    }
  };

  return (
    <View style={{ paddingHorizontal: 30 }}>
      <Image
        onError={(e) => console.log("errror", JSON.stringify(e))}
        source={{ uri: props.route.params.image.uri }}
        style={{ width: "100%", height: "85%", marginTop: 20 }}
        borderRadius={10}
        resizeMode="cover"
      ></Image>
      <TouchableOpacity
        onPress={() => imageToPdf(imagePaths, fileName)}
        style={{
          marginTop: 30,
          width: "100%",
          height: 55,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "gray",
        }}
      >
        <Text style={{ color: "white", fontSize: 17, letterSpacing: 2 }}>
          UPLOAD
        </Text>
      </TouchableOpacity>
    </View>
  );
};
