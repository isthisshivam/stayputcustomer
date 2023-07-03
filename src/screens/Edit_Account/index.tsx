import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import Back_Header from "../../common_components/Back_Header";
import assets from "../../assets";
import Button from "../../common_components/Button";
import Text_Input from "../../common_components/Text_Input";
import { CUSTOMER_UPDATE, USER_PROFILE_PIC } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import useFileUploadingRestApi from "../../Services/rest/apiUploadImage";
import ImagePicker from "react-native-image-crop-picker";
import Imagepicker_View from "../../common_components/Imagepicker_View";
import {
  GetData,
  SaveData,
  showToastMessage,
  validateEmail,
  validateNumber,
  requestAndroidCameraPermission,
} from "../../utils/utilities";
import { LOGIN_KEY, ACCESS_TOKEN } from "../../Storage/ApplicationStorage";
import { useNavigation } from "@react-navigation/native";
import { dW } from "../../utils/dynamicHeightWidth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Account_Edit = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const [passwordChange, setPasswordChange] = useState(false);
  const [popup, setPopup] = useState(false);
  const [bttnBG, setBttnBG] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileUpdate, setProfileUpdate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cur_pass, setCur_Pass] = useState("");
  const [new_pass, setNew_Pass] = useState("");
  const [confirm_pass, setConfirm_Pass] = useState("");
  const [cur_secure, setCurSecure] = useState(true);
  const [pass_secure, setPassSecure] = useState(true);
  const [confirm_secure, setConfirmSecure] = useState(true);

  const update_accountPayload = {
    firstname: firstName.trim(),
    lastname: lastName.trim(),
    email: emailid.trim(),
    password: cur_pass,
    new_password: new_pass,
    phone: number.trim(),
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CUSTOMER_UPDATE,
    PAYLOAD: update_accountPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const {
    data: p_data,
    loading: p_loading,
    error: p_error,
    fetchData: p_fetchData,
    responseCode: p_responseCode,
  } = useFileUploadingRestApi({
    URL: USER_PROFILE_PIC,
    PAYLOAD: null,
    CALL_TYPE: CALL_TYPES.POST,
    fileList: [],
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      const isValid = data?.status;
      setTimeout(() => {
        showToastMessage(data?.message);
      }, 300);
      if (isValid == 200) {
        saveLoginData(data);
      }
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    var response = JSON.parse(p_data);
    if (response?.status === 200) {
      showToastMessage(response.message);

      saveData(response.data);
    }
  }, [p_data, p_error, p_responseCode]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (profileUpdate) profile_pic();
  }, [profileUpdate]);

  const saveData = async (data) => {
    await SaveData(LOGIN_KEY, JSON.stringify(data));
    await SaveData(ACCESS_TOKEN, data.access_token);
  };

  const chooseFile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setProfile(image.path);
      setProfileUpdate(image.path);
    });
  };

  const getData = async () => {
    const value = await GetData(LOGIN_KEY);

    if (value) {
      const user_info = JSON.parse(value);
      setFirstName(user_info.firstname);
      setLastName(user_info.lastname);
      setEmailid(user_info.email);
      setNumber(user_info.phone);
      setProfile(user_info.profile_pic);
    }
  };
  const saveLoginData = async (data) => {
    const saveData = data.data;

    await SaveData(LOGIN_KEY, JSON.stringify(saveData));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  useEffect(() => {
    if (
      profile ===
      "http://18.215.83.36/backend/web/upload/profile_pic/default-pic.png"
    ) {
      setTimeout(() => {
        setBttnBG(false);
      }, 100);
    } else {
      setBttnBG(true);
    }
  }, [profile]);

  const isValid_userUpdate = () => {
    if (!firstName.trim()) {
      showToastMessage("enter first name");
      return false;
    } else if (!lastName.trim()) {
      showToastMessage("enter last name");
      return false;
    } else if (!emailid.trim()) {
      showToastMessage("enter email id");
      return false;
    } else if (!validateEmail(emailid.trim())) {
      showToastMessage("Please enter valid email");
      return false;
    } else if (!number.trim()) {
      showToastMessage("Please enter mobile number");
      return false;
    } else if (!validateNumber(number.trim())) {
      showToastMessage("Please enter valid mobile number");
      return false;
    } else if (number.trim().length != 10) {
      showToastMessage("Please enter 10 digits number");
      return false;
    }

    return true;
  };

  const profile_pic = () => {
    const arr = [];
    arr.push(profileUpdate);

    p_fetchData(0, arr);
  };

  const valid_update = () => {
    if (isValid_userUpdate()) {
      fetchData(0);
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const permission = await requestAndroidCameraPermission();
      if (permission) {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
        }).then((image) => {
          setProfile(image.path);
          setProfileUpdate(image.path);
        });
      }
    } else {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      }).then((image) => {
        setProfile(image.path);
        setProfileUpdate(image.path);
      });
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        location={false}
        title="Edit your account"
        subtitle=""
        icon="angle-left"
      />
      <Imagepicker_View
        visible={popup}
        setVisible={setPopup}
        camera={() => requestCameraPermission()}
        gallery={() => chooseFile()}
      />
      <KeyboardAwareScrollView style={[pallete.screen_container]}>
        <Modal
          visible={
            loading === LOADING_TYPES.LOADING ||
            loading === LOADING_TYPES.FETCHING_MORE
          }
          transparent={true}
        >
          <View style={[pallete.loader_View]}>
            <ActivityIndicator
              size={"large"}
              color={assets.Colors.WHITE}
              style={[pallete.loader]}
            />
          </View>
        </Modal>
        <Pressable
          onPress={() => setPopup(true)}
          style={styles.profile_container}
        >
          <Image source={{ uri: profile }} style={styles.profile} />
          <Text style={styles.add_photo}>
            {profile ===
            "http://18.215.83.36/backend/web/upload/profile_pic/default-pic.png"
              ? "Add Photo"
              : ""}
          </Text>
        </Pressable>
        <View style={styles.topmargin}>
          <View style={styles.row_inputs_view}>
            <Text_Input
              change={(text) => setFirstName(text)}
              edit={firstName}
              style={[styles.space_vertical, styles.input_row]}
              subtitle={""}
              title="First Name"
            />
            <View style={styles.horizontal_spacer} />
            <Text_Input
              change={(text) => setLastName(text)}
              edit={lastName}
              style={[styles.space_vertical, styles.input_row]}
              subtitle={""}
              title="Last Name"
            />
          </View>
          <Text_Input
            change={(text) => setEmailid(text)}
            edit={emailid}
            style={styles.space_vertical}
            subtitle={""}
            title="Email Address"
          />
          <Text_Input
            keyboard={"numeric"}
            change={(text) => setNumber(text)}
            edit={number}
            style={styles.space_vertical}
            subtitle={""}
            title="Mobile Number"
          />
          {passwordChange == false ? (
            <View style={styles.row_center}>
              <Text_Input
                type={false}
                change={(text) => setPassword(text)}
                edit={password}
                style={styles.space_vertical}
                subtitle={"***********"}
                title="Password"
              />
              <Pressable onPress={() => setPasswordChange(true)}>
                <Text
                  style={[
                    styles.change,
                    { color: assets.Colors.TERMS_CONDITION_COLOR },
                  ]}
                >
                  Change
                </Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <View style={styles.row_center}>
                <Text_Input
                  secure={cur_secure}
                  change={(text) => setCur_Pass(text)}
                  edit={cur_pass}
                  style={styles.space_vertical}
                  subtitle={""}
                  title="Current Password"
                />
                <MaterialCommunityIcons
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    right: dW(50),
                    bottom: dW(15),
                  }}
                  onPress={() => setCurSecure(!cur_secure)}
                  name={cur_secure === false ? "eye" : "eye-off"}
                  size={22}
                  color={assets.Colors.INPUT_TITLE_COLOR}
                />
                <Pressable onPress={() => setPasswordChange(false)}>
                  <Text
                    style={[
                      styles.change,
                      { color: assets.Colors.INPUT_TITLE_COLOR },
                    ]}
                  >
                    Cancel
                  </Text>
                </Pressable>
              </View>
              <View>
                <Text_Input
                  secure={pass_secure}
                  change={(text) => setNew_Pass(text)}
                  edit={new_pass}
                  style={styles.space_vertical}
                  subtitle={""}
                  title="New Password"
                />
                <MaterialCommunityIcons
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    right: dW(0),
                    bottom: dW(15),
                  }}
                  onPress={() => setPassSecure(!pass_secure)}
                  name={pass_secure === false ? "eye" : "eye-off"}
                  size={22}
                  color={assets.Colors.INPUT_TITLE_COLOR}
                />
              </View>
              <Text_Input
                secure={confirm_secure}
                change={(text) => setConfirm_Pass(text)}
                edit={confirm_pass}
                style={styles.space_vertical}
                subtitle={""}
                title="Confirm Password"
              />
              <MaterialCommunityIcons
                style={{
                  position: "absolute",
                  zIndex: 1,
                  right: dW(0),
                  bottom: dW(15),
                }}
                onPress={() => setConfirmSecure(!confirm_secure)}
                name={confirm_secure === false ? "eye" : "eye-off"}
                size={22}
                color={assets.Colors.INPUT_TITLE_COLOR}
              />
            </View>
          )}
        </View>
        <Button
          imgBG={""}
          style={styles.topmargin}
          event={() => valid_update()}
          bgcolor={
            bttnBG === false
              ? assets.Colors.THEME_COLOR_PRIMARY
              : assets.Colors.THEME_COLOR_PRIMARY
          }
          image={false}
          img={""}
          title="Save"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Account_Edit;
