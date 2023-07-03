import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, StackActions } from "@react-navigation/native";

import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import {
  SaveData,
  showToastMessage,
  validateEmail,
  resetStack,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import {
  CUSTOMER_LOGIN,
  CUSTOMER_SOCIAL_LOGIN,
  USER_DEACTIVATE,
} from "../../Services/ApiUrls";
import {
  ACCESS_TOKEN,
  clearAsyncStorage,
  LOGIN_KEY,
} from "../../Storage/ApplicationStorage";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { dW } from "../../utils/dynamicHeightWidth";
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";

import { setupPushNotification } from "../../utils/PushNotification";
import { getData } from "../../Storage/ApplicationStorage";
import { Secrets } from "../../assets/Secrets";

const Sign_in = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pass_secure, setPassSecure] = useState(true);
  const [fcmToken, setfcmToken] = useState("");
  const [firName, setFirName] = useState("");
  const [lasName, setLasName] = useState("");
  const [email_id, setEmail_id] = useState("");
  const [social_id, setSocial_id] = useState("");
  const [social_type, setSocial_type] = useState("");

  const loginPayload = {
    username: username.trim(),
    password: password,
    firebase_token: fcmToken,
  };

  const socialPayload = {
    firstname: firName,
    lastname: lasName,
    email: email_id || "abc@test.com",
    firebase_token: fcmToken,
    social_type: social_type,
    social_id: social_id,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CUSTOMER_LOGIN,
    PAYLOAD: loginPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  const {
    data: g_data,
    loading: g_loading,
    error: g_error,
    fetchData: g_fetchData,
    responseCode: g_responseCode,
  } = useRest({
    URL: CUSTOMER_SOCIAL_LOGIN,
    PAYLOAD: socialPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const payload = {
    status: "1",
  };

  const {
    data: dataReactive,
    loading: loadingdataReactive,
    error: errordataReactive,
    fetchData: fetchReactive,
    responseCode: codeReactive,
  } = useRest({
    URL: USER_DEACTIVATE,
    PAYLOAD: payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    if (codeReactive == 200) {
      setTimeout(() => {
        resetStack(
          assets.NavigationConstants.STACKS.HOME_STACK,
          null,
          navigation
        );
      }, 100);
    }
  }, [codeReactive]);

  const reactiVateAccount = React.useCallback(() => {
    Alert.alert(
      "Reactivate Account?",
      "Your account has been deactivated. Would you like to reactivate the account?",
      [
        {
          text: "Cancel",
          onPress: () => clearAsyncStorage(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            fetchReactive(0);
          },
        },
      ]
    );
  }, []);
  useEffect(() => {
    if (data) {
      const isvalid = data?.status;
      const userinfo = data?.data?.is_completed;
      const user_selected_address = userinfo?.address;
      const status = data?.data?.status;

      if (isvalid == 200 && userinfo == "1") {
        if (status == "2") {
          saveLoginData(data);
          reactiVateAccount();
        } else {
          global.isProfileCompleted = true; //when user profile completed
          global.userSelectedDeliveryAddress = user_selected_address; //when user filled address

          saveLoginData(data).then(() => {
            setTimeout(() => {
              navigate(assets.NavigationConstants.USER_TYPE.NAME);
            }, 100);
          });
        }
      } else if (isvalid == 200 && userinfo == "0") {
        global.isProfileCompleted = false; //when user profile incompleted
        saveLoginData(data).then(() => {
          setTimeout(() => {
            showToastMessage(data.message);
            navigate(assets.NavigationConstants.USER_TYPE.NAME);
          }, 100);
        });
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 100);
      }
    }
  }, [data]);

  useEffect(async () => {
    const token = await getData("F_TOKEN");

    if (typeof token == "undefined" || token == null) {
      setupPushNotification(tokenCallBack);
    } else {
      tokenCallBack(token);
    }
  }, []);
  const tokenCallBack = async (tokenn) => {
    const token = await getData("F_TOKEN");
    await setfcmToken(token);
  };
  useEffect(() => {
    if (g_data) {
      const isValid = g_data.status;
      const userinfo = g_data.data.is_completed;
      const status = data?.data?.status;
      if (isValid == 200 && userinfo == "1") {
        if (status == "2") {
          saveLoginData(data);
          reactiVateAccount();
        } else {
          saveLoginData(g_data);
          setTimeout(() => {
            resetStack(
              assets.NavigationConstants.STACKS.HOME_STACK,
              null,
              navigation
            );
          }, 100);
        }
      } else if (isValid == 200 && userinfo == "0") {
        saveLoginData(g_data);
        setTimeout(() => {
          showToastMessage(g_data.message);
          navigate(assets.NavigationConstants.USER_TYPE.NAME);
        }, 100);
      } else {
        setTimeout(() => {
          showToastMessage(g_data.message);
        }, 100);
      }
    }
  }, [g_data]);

  useEffect(() => {
    if (social_id) g_fetchData(0);
  }, [social_id]);

  const saveLoginData = async (data) => {
    const saveData = data.data;
    global.currentUserId = data?.data?.id;

    await SaveData(LOGIN_KEY, JSON.stringify(saveData));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  GoogleSignin.configure({
    webClientId: Secrets.FIR_GOOGLE_WEB_CLIENTID_ANDROID,
  });

  const google_signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      setFirName(userInfo.user.givenName);
      setLasName(userInfo.user.familyName);
      setEmail_id(userInfo.user.email);
      setSocial_type("google");
      setSocial_id(userInfo.user.id);
      global.branchIo.logEvent("Account Sign In - Google", {
        customData: {
          anonymousid: userInfo?.user?.id,

          screenURL: "Login_Screen",
        },
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        showToastMessage("Login Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        showToastMessage("Google play services not available");
      } else {
        console.log("ERROR===", error);

        showToastMessage("Some error occured");
      }
    }
  };

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name,email",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
        } else {
          setFirName(user.first_name);
          setLasName(user.last_name);
          setEmail_id(user.email);
          setSocial_type("facebook");
          setSocial_id(user.id);
          global.branchIo.logEvent("Account Sign In - Facebook", {
            customData: {
              anonymousid: user?.id,
              screenURL: "Login_Screen",
            },
          });
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (login) => {
        if (login.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();

            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {}
    );
  };

  const isValidLogin = () => {
    if (!username.trim()) {
      showToastMessage("Please enter email");
      return false;
    } else if (!validateEmail(username.trim())) {
      showToastMessage("Please enter valid email");
      return false;
    } else if (!password) {
      showToastMessage("Please enter password");
      return false;
    } else if (password.length <= 7) {
      showToastMessage("Please enter at least 8 digit");
      return false;
    }
    return true;
  };

  const validLogin = async () => {
    global.branchIo.logEvent("Account Sign In", {
      customData: {
        anonymousid: null,
        screenURL: "Login_Screen",
        "email address": username,
      },
    });

    if (isValidLogin()) {
      fetchData(0);
    }
  };

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    if (appleAuth.isSupported) {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw "Apple Sign-In failed - no identify token returned";
      }

      const { identityToken, nonce } = appleAuthRequestResponse;

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        return appleAuthRequestResponse;
      }

      return appleAuthRequestResponse;
    } else {
      showToastMessage("AppleLogin is not supported!");
    }
  };

  const setUserInformationAppleSignIn = (userData) => {
    const { identityToken, fullName, email, user } = userData;
    if (user) {
      if (email) {
        setFirName(fullName?.givenName);
      }
    }
    setLasName(fullName?.familyName);
    setEmail_id(email);
    setSocial_type("apple");
    setSocial_id(user);
    global.UserId = user;
    global.branchIo.logEvent("Account Sign In - Apple", {
      customData: {
        anonymousid: user,
        screenURL: "Login_Screen",
      },
    });
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAwareScrollView
        style={[styles.scrollContainer]}
        contentInset={{ bottom: 70 }}
      >
        <Modal
          visible={
            loading === LOADING_TYPES.LOADING ||
            loading === LOADING_TYPES.FETCHING_MORE ||
            g_loading === LOADING_TYPES.LOADING ||
            g_loading === LOADING_TYPES.FETCHING_MORE ||
            loadingdataReactive === LOADING_TYPES.LOADING
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
        <Image source={assets.Images.STAY_PUT_LOGO} style={styles.logo} />
        <Text style={styles.subtitle}>Stay put, we'll get it for you!</Text>
        <Text_Input
          placeHolderColor={assets.Colors.INPUT_BORDER_COLOR}
          change={(text) => setUsername(text)}
          edit={username}
          style={[styles.space_vertical, styles.spaceTop]}
          subtitle={"user@example.com"}
          title="Email Address"
        />
        <View>
          <Text_Input
            secure={pass_secure}
            placeHolderColor={assets.Colors.INPUT_BORDER_COLOR}
            change={(text) => setPassword(text)}
            edit={password}
            style={styles.space_vertical}
            subtitle={"*******"}
            title="Password"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              zIndex: 1,
              right: 0,
              bottom: dW(15),
            }}
            onPress={() => setPassSecure(!pass_secure)}
            name={pass_secure === false ? "eye" : "eye-off"}
            size={22}
            color={assets.Colors.INPUT_TITLE_COLOR}
          />
        </View>
        <Text style={styles.char}>At least 8 characters</Text>
        <Text
          onPress={() =>
            navigate(assets.NavigationConstants.FORGOT_PASSWORD.NAME)
          }
          style={styles.forgot_Pass}
        >
          Forgot your password?
        </Text>
        <Button
          imgBG={""}
          style={styles.spaceTop}
          event={validLogin}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Sign in"
        />
        <Text style={styles.or}>or</Text>
        <View style={styles.icons}>
          <Pressable
            onPress={loginWithFacebook}
            style={[
              styles.icon_bg,
              { backgroundColor: assets.Colors.FACEBOOK_BG_COLOR },
            ]}
          >
            <Image
              source={assets.Images.FACEBOOK_ICON}
              style={styles.iconStyle}
            />
          </Pressable>
          <Pressable
            onPress={google_signIn}
            style={[
              styles.icon_bg,
              { backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR },
            ]}
          >
            <Image
              source={assets.Images.GOOGLE_ICON}
              style={styles.iconStyle}
            />
          </Pressable>
          {appleAuth.isSupported && (
            <Pressable
              onPress={() =>
                onAppleButtonPress().then((value) => {
                  setUserInformationAppleSignIn(value);
                })
              }
              style={[
                styles.icon_bg,
                { backgroundColor: assets.Colors.BLACK_COLOR },
              ]}
            >
              <Image
                source={assets.Images.APPLE_ICON}
                style={styles.iconStyle}
              />
            </Pressable>
          )}
        </View>
        <Text style={styles.accnt}>
          Don't have account?{" "}
          {
            <Text
              onPress={() => navigate(assets.NavigationConstants.SIGN_UP.NAME)}
              style={styles.sign_up}
            >
              Sign up
            </Text>
          }
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Sign_in;
