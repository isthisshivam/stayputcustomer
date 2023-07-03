import { PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "./dynamicHeightWidth";
import RNImageToPdf from "react-native-image-to-pdf";
import {
  getData,
  ACCESS_TOKEN,
  clearAsyncStorage,
} from "../Storage/ApplicationStorage";

export const navigateToClass = (screenName, params) => {
  const { navigate } = useNavigation();
  navigate(screenName, params);
};

export const cc_expires_format = (string) => {
  return string
    .replace(
      /[^0-9]/g,
      "" // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      "0$1" // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      "$1/$2" // To handle 113 > 11/3
    );
};

export const navigateTo = (screenName, params, navigation) => {
  navigation.navigate(screenName, params);
};

export const validateEmail = (text) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
};
export const validateNumber = (num) => {
  const reg = /^[0-9\b]+$/;
  return reg.test(num);
};

export const showToastMessage = (message) => {
  Toast.show(message, Toast.SHORT);
};

export const resetStack = (route, param, navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: route, params: param }],
    })
  );
};
export const requestAndroidCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "Stayput needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    console.log("Camera granted==", granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission granted");
      return true;
    } else {
      console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const track = async (name, payload) => {
  console.log(JSON.stringify(global.branchIo));
  if (global.branchIo) {
    global.branchIo.logEvent(name, {
      customData: payload,
    });
  } else {
    console.log("track not initalize yet...");
  }
};
export const SaveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("ERROR======", e);
  }
};
export const priceConvert = (price) => {
  console.log("priceConvert==", price);
  if (price) {
    if (typeof price != "string") {
      let strPrice = price.toString();
      return parseFloat(strPrice.replace("$", "")).toFixed(2);
    } else if (typeof price === "string") {
      return parseFloat(price.replace("$", "")).toFixed(2);
    }
  } else return "";
};

export const imageToPdf = async (imagePaths, fileName) => {
  try {
    const options = {
      imagePaths: imagePaths,
      name: fileName,
      maxSize: {
        // optional maximum image dimension - larger images will be resized
        width: 900,
        height: Math.round((windowHeight() / windowWidth()) * 900),
      },
      quality: 0.7, // optional compression paramter
    };
    const pdf = await RNImageToPdf.createPDFbyImages(options);

    console.log(`imageToPdf==`, pdf.filePath);
  } catch (e) {
    console.log(e);
  }
};

export const GetData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("ERROR======", e);
  }
};

// export const logout = async (dispatch, navigation) => {
//   let aToken = await getData(ACCESS_TOKEN);
//   if (aToken) {
//     await clearAsyncStorage();
//     const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
//     showToastMessage("Session expired. Please login again")
//     dispatch({
//       type: "WEB_API_LOGOUT_USER",
//     });
//     wait(200).then(async () => {
//       resetStack(
//         assets.strings.login.ROUTE_NAME,
//         null,
//         navigation
//       );
//     }).catch(() => {
//     });
//     console.log("STACK AFter====== ", navigation.dangerouslyGetState().routes);
//   }
// };
