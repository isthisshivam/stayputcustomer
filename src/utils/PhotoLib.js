import { LogBox, Alert, Linking, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import ImagePicker, {
  PickerErrorCode,
  PickerErrorCodeIOS,
} from "react-native-image-crop-picker";
import RNPermissions, { checkMultiple } from "react-native-permissions";
const CAMERA_PERMISSION_ERROR_CODE = "E_NO_CAMERA_PERMISSION";
const PICKER_PERMISSION_ERROR_CODE = "E_NO_LIBRARY_PERMISSION";
var isBlocked = false;
var permissionArray =
  Platform.OS === "ios"
    ? ["ios.permission.PHOTO_LIBRARY", "ios.permission.CAMERA"]
    : ["android.permission.CAMERA", "android.permission.READ_EXTERNAL_STORAGE"];
//Initalize class for camera and image picker
//access photos

export function requestPermission(onFileSelect) {
  RNPermissions.requestMultiple(permissionArray)
    .then(check(onFileSelect))
    .catch((error) => console.error("error_requesting_permission", error));
}
const check = (onFileSelect) => {
  {
    isBlocked = false;
    RNPermissions.checkMultiple(permissionArray)
      .then((data) => {
        console.log("photolib===11", JSON.stringify(data));
        for (let index = 0; index < permissionArray.length; index++) {
          if (
            data[permissionArray[index]] === "blocked" ||
            data[permissionArray[index]] === "denied" ||
            data[permissionArray[index]] === "unavailable"
          ) {
            isBlocked = true;
            setTimeout(() => {
              OpenAppSetting();
            }, 200);
            // return false;
          }
          console.log(
            "data[permissionArray[index]]",
            data[permissionArray[index]]
          );
        }

        if (!isBlocked) {
          setTimeout(() => {
            OpenPicker(onFileSelect);
          }, 200);
        }
        console.log("location blocked==", isBlocked);
      })
      .then(() => RNPermissions.checkNotifications())
      .then((data) => {
        console.log("photolib===12", data);
        // return false;
      })
      .catch((error) => {
        console.log(error);
        // return false;
      });
  }
};

export function OpenPicker(onFileSelect) {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  })
    .then((image) => {
      //success
      if (image) {
        const localUri = image?.path;
        const filename = localUri?.split("/").pop();
        onFileSelect({ uri: localUri, filename: filename });
      } else {
        throw "Image is not available";
      }
      console.log(image);
    })
    .catch((e) => {
      //failure
      console.log("openPicker.catch", JSON.stringify(e));
      if (e)
        if (e?.code == PICKER_PERMISSION_ERROR_CODE)
          AlertUser("Please give permission to access Photos Library.");
    });
}
//access camera
export function OpenCamera(onFileSelect) {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  })
    .then((image) => {
      //success
      if (image) {
        const localUri = image?.path;
        const filename = localUri?.split("/").pop();
        onFileSelect({ uri: localUri, filename: filename });
      } else {
        throw "Image is not available";
      }

      console.log(image);
    })
    .catch((e) => {
      //failure
      if (e)
        if (e?.message == CAMERA_PERMISSION_ERROR_CODE)
          AlertUser("Please give permission to access Camera.");
      console.log("openPicker.catch", JSON.stringify(e));
    });
}
// user for any warnings
export function AlertUser(message) {
  Alert.alert("Permission Not Found", message, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => OpenAppSetting() },
  ]);
}
//open mobile app permission  setting
const OpenAppSetting = async () => {
  console.log("openSetting==");
  if (Platform.OS === "ios") {
    await Linking.openURL("app-settings:");
  } else {
    Linking.openSettings();
  }

  console.log("REturned from setttings");
};

const generateImageFromFile = async (data) => {
  const localUri = data?.path;
  const filename = localUri?.split("/").pop();
  let fileType = data?.mime;
  const File = {
    uri: localUri,
    name: filename,
    type: fileType,
  };
};
