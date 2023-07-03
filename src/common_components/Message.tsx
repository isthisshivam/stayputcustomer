import React from "react";
import {
  Dimensions,
  PixelRatio,
  AsyncStorage,
  Platform,
  StatusBar,
  ImageBackground,
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import useStyle from "../screens/Chatting/style";
const Message = (item) => {
  const styles = useStyle();
  const {
    receiver_image,
    type,
    message,
    sender_id,
    created_at,
    sender_profile,
    receiver_id,
    image,
    mode,
    userId,
    side,
  } = item;

  if (side == "right") {
    //side is right
    return (
      <View style={[styles.left_msg_c]}>
        {/* <Image
          source={{ uri: receiver_image }}
          style={styles.sender_img}
        ></Image> */}
        <View>
          {/* <Text style={styles.left_msg_time}>
              {moment(created_at).format("h:mm a")}
            </Text> */}
          {type == "text" && (
            <View style={styles.left_msg}>
              <Text>{message}</Text>
            </View>
          )}
          {type == "image" && (
            <TouchableOpacity>
              <ImageBackground
                style={{ height: 200, width: 200, marginLeft: 4 }}
                imageStyle={{ borderRadius: 10 }}
                resizeMode="cover"
                source={{ uri: image }}
              ></ImageBackground>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.right_msg_c}>
        <View style={styles.right_msg_c_c}>
          {/* <Text style={styles.right_msg_text}>
              {moment(created_at).format("h:mm a")}
            </Text> */}
          {type == "text" && (
            <View style={styles.right_msg}>
              <Text style={{ color: "gray" }}>{message}</Text>
            </View>
          )}

          {type == "image" && image != "" && (
            <TouchableOpacity>
              <ImageBackground
                style={{ height: 200, width: 200, marginRight: 4 }}
                imageStyle={{ borderRadius: 10 }}
                resizeMode="cover"
                source={{ uri: image }}
              ></ImageBackground>
            </TouchableOpacity>
          )}
          {/* {type == "image" && !mode && image != "" && (
            <ImageBackground
              style={{
                height: 200,
                width: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
              imageStyle={{ borderRadius: 10 }}
              resizeMode="cover"
              source={{ uri: image }}
            >
              <ActivityIndicator
                size="large"
                animating={true}
                color="white"
              ></ActivityIndicator>
            </ImageBackground>
          )} */}
        </View>

        {/* <Image
          source={{ uri: sender_profile }}
          style={styles.sender_img}
        ></Image> */}
      </View>
    );
  }
};

export default Message;
