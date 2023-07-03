import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import assets from "../assets";

const BottomSheet = (props) => {
  const { reference, openCamera, openFiles } = props;

  useEffect(() => {});
  return (
    <RBSheet
      ref={reference}
      height={400}
      closeOnPressMask={true}
      closeOnDragDown={true}
      customStyles={{
        container: { alignItems: "center", borderRadius: 19 },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
    >
      <View
        style={{
          height: 66,
          borderBottomColor: "gray",
          borderBottomWidth: 0.3,
          width: "100%",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          //alignContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            letterSpacing: 1,
          }}
        >{`Upload Paperwork`}</Text>
        <Image
          style={{ width: 22, height: 22, resizeMode: "contain" }}
          source={assets.Images.close}
        ></Image>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 30,
          paddingVertical: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            // backgroundColor: "gray",
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            paddingHorizontal: 20,
          }}
          onPress={() => openCamera()}
        >
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Image
              style={{ width: 24, height: 24, resizeMode: "contain" }}
              source={assets.Images.camera}
            ></Image>
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                letterSpacing: 1,
                marginLeft: 20,
              }}
            >{`Camera`}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openFiles()}
          style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Image
              style={{ width: 24, height: 24, resizeMode: "contain" }}
              source={assets.Images.gallery}
            ></Image>
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                letterSpacing: 1,
                marginLeft: 20,
              }}
            >{`Gallery`}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignSelf: "flex-start",
            marginTop: 20,
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={assets.Images.transfer}
          ></Image>
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                letterSpacing: 1,
                marginLeft: 20,
              }}
            >{`Transfer Mobile`}</Text>

            <Text
              style={{
                color: "#000",
                fontSize: 15,
                letterSpacing: 1,
                marginLeft: 20,
              }}
            >{`Signup by entering codeXPOLV`}</Text>
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;
