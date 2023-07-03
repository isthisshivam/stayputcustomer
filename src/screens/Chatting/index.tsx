import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import { SEND_MESSAGE_NOTIFICATION } from "../../Services/ApiUrls";
import Back_Header from "../../common_components/Back_Header";
import moment from "moment";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from "../../utils/dynamicHeightWidth";

import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import Message from "../../common_components/Message";
import { GALLERY, CAMERA } from "../../constants/AppConstants";
var localUri = null;
const Chatting = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const messageRef = useRef();
  const [currentUserId] = useState(global.currentUserId);
  const { navigate, goBack, addListener } = useNavigation();
  const [userId, setUserId] = useState("1");
  const [message, setMessage] = useState("");
  const [chatArray, setChatArray] = useState([]);

  const [profile, setProfile] = useState("");
  const [isImageLoading, setImageLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  useEffect(() => {
    const focusListener = addListener("focus", () => {
      pullMessages();
    });
    return () => {
      focusListener();
    };
  }, [props]);

  const pullMessages = async () => {
    await firebase
      .firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(
        props?.route?.params?.runnerId +
          `_` +
          props?.route?.params?.customerId +
          `_` +
          props?.route?.params?.orderId
      )
      .collection(assets.Secrets.MESSAGE_COLLECTION)
      .orderBy(assets.Secrets.CREATED_AT)
      .onSnapshot((querySnapshot) => {
        setLoading(false);
        const refArray = [];
        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            refArray.push(documentSnapshot.data());
          });
          //modify data as per need
          let modifiedArrayData = refArray.map((item, index) => {
            item.isSelected = false;
            return { ...item };
          });
          setChatArray(modifiedArrayData);
        }
      });
  };
  const pushMessageToFireStore = async (message, id, type) => {
    if (type == "image") setImageLoading(true);

    setSent(true);
    var messageToAdd = {
      message,
      runner_id: props?.route?.params?.runnerId,
      customer_id: props?.route?.params?.customerId,
      type: type,
      image: localUri,
      sender_id: currentUserId,
      created_at: moment().format(), ///set current date to firestore
    };

    await firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(
        props?.route?.params?.runnerId +
          `_` +
          props?.route?.params?.customerId +
          `_` +
          props?.route?.params?.orderId
      )
      .collection(assets.Secrets.MESSAGE_COLLECTION)
      .add(messageToAdd)
      .then(() => {});
    ///here pushing latest messageToAdd to doc as field
    await firebase
      .firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(
        props?.route?.params?.runnerId +
          `_` +
          props?.route?.params?.customerId +
          `_` +
          props?.route?.params?.orderId
      )
      ///.doc("2" + `_` + userId)
      .set({ LatestMessage: messageToAdd })
      .then(() => {
        chatArray.push(messageToAdd);
        setMessage("");
        setProfile("");
        setSent(false);
        setImageLoading(false);
        localUri = null;
      });
    sendMessageNotification();
  };
  const sendMessageNotification = async () => {
    let payload = {
      registration_ids: [props?.route?.params?.runnerFcmTkn],

      notification: {
        body: message,
        title: props?.route?.params?.userName + ` Sent a message.`,
        action: "Chatting",
      },
      data: {
        body: message,
        title: props?.route?.params?.userName + ` Text you.`,
        action: "Chatting",
        runnerId: props?.route?.params?.runnerId,
        customerId: props?.route?.params?.customerId,
        orderId: props?.route?.params?.orderId,
        userName: props?.route?.params?.userName,
      },
    };

    const instance = axios({
      method: "POST",
      url: SEND_MESSAGE_NOTIFICATION,
      timeout: 50000,
      headers: {
        Authorization: assets.Secrets.CLOUD_SERVER_KEY,
        "Content-Type": "application/json",
      },
      data: payload,
    });

    return new Promise(function (resolve, reject) {
      instance
        .then(function (response) {
          console.log("sendMsgNotificationRequest.success>>>>", response?.data);
        })
        .catch(function (error) {
          console.log("sendMsgNotificationRequest.failure>>>>", error);
        });
    });
  };
  const chooseMode = () => {
    Alert.alert(
      "Selection",
      "Choose From where you want to send Pictures",
      [
        {
          text: "CANCEL",
          style: "destructive",
          onPress: () => console.log("cancel"),
        },
        {
          text: "GALLERY",
          onPress: () => onPressChooseImageToCapture(GALLERY),
          style: "default",
        },
        {
          text: "CAMERA",
          style: "default",
          onPress: () => onPressChooseImageToCapture(CAMERA),
        },
      ],
      { cancelable: true }
    );
  };
  const onPressChooseImageToCapture = (TYPE) => {
    if (TYPE == CAMERA) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        mediaType: "photo",
        cropping: true,
        compressImageQuality: 0.8,
      }).then((image) => {
        generateValidImage(image);
      });
    } else if (TYPE == GALLERY) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: "photo",
        cropping: true,
        compressImageQuality: 0.8,
      }).then((image) => {
        generateValidImage(image);
      });
    }
  };
  const generateValidImage = (data) => {
    const localUri = data.path;
    const filename = localUri.split("/").pop();
    let fileType = data.mime;
    var newData = {
      uri: localUri,
      name: filename,
      type: fileType,
    };
    setProfile(data.path);
    var obj = {
      sender_id: userId,
      type: "image",
      mode: "local",
      image: data.path,
      created_at: moment().format(), ///set current date to firestore
    };
    chatArray.push(obj);
    setChatArray(chatArray);
    uploadFileToFirebaseStorage(localUri, filename, "image");
  };
  const uploadFileToFirebaseStorage = (path, imageName, type) => {
    setImageLoading(true);
    let reference = storage().ref(imageName);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log(`${imageName} has been successfully uploaded.`);
        let imageRef = firebase.storage().ref("/" + imageName);
        imageRef
          .getDownloadURL()
          .then((url) => {
            console.log(`${imageName} has been downloaded uploaded.`, url);
            localUri = url;
            setImageLoading(false);
            pushMessageToFireStore(message, userId, type);
          })
          .catch((e) => {
            setImageLoading(false);
            console.log("getting downloadURL of image error => ", e);
          });
      })
      .catch((e) => console.log("uploading image error => ", e));
  };

  const Messages = () => {
    return (
      <AutoScrollFlatList
        ListEmptyComponent={() => emptyView()}
        extraData={isSent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
        enabledAutoScrollToEnd
        threshold={20}
        data={chatArray}
        renderItem={(item) => (
          <Message
            receiver_image={"item.item.receiver_image"}
            index={item.index}
            userId={props?.route?.params?.runnerId}
            time={item.item.created_at}
            type={item.item.type}
            sender_profile={"item.item.sender_profile"}
            sender_id={"item.item.sender_id"}
            image={item.item.image}
            message={item.item.message}
            side={
              global.currentUserId == item?.item?.sender_id ? "left" : "right"
            }
          />
        )}
        keyExtractor={(item) => item.created_at}
      />
    );
  };

  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          height: windowHeight() / 1.4,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.forgot_pass_heading}>No messages yet.</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAvoidingView
        style={[
          { flex: 1, backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR },
        ]}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <Back_Header
          title="Messages"
          subtitle=""
          icon="arrow-left"
          sub={""}
          event={""}
        />
        <View style={[{ flex: 1 }]}>
          <SafeAreaProvider>
            {Messages()}
            <KeyboardAvoidingView>
              <View
                style={{
                  height: 60,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  marginBottom: 24,
                }}
              >
                <TextInput
                  placeholderTextColor={"black"}
                  ref={messageRef}
                  value={message}
                  onChangeText={(value) => setMessage(value)}
                  placeholder="Write a message..."
                  style={{
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    height: 45,
                    backgroundColor: assets.Colors.RIGHT_MSG,
                    width: "75%",
                    color: "black",
                  }}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => !isImageLoading && chooseMode()}
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: assets.Colors.RIGHT_MSG,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <FontAwesome5
                    name={"image"}
                    color={assets.Colors.BLACK_COLOR}
                    size={25}
                    style={{}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    !isLoading && message
                      ? [
                          pushMessageToFireStore(message, userId, "text"),
                          messageRef.current.clear(),
                        ]
                      : alert("Please enter messsage!")
                  }
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: assets.Colors.RIGHT_MSG,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  {isSent ? (
                    <ActivityIndicator></ActivityIndicator>
                  ) : (
                    <MaterialCommunityIcons
                      name={"send"}
                      color={assets.Colors.BLACK_COLOR}
                      size={25}
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Chatting;
