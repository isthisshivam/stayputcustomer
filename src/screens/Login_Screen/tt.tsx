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
  KeyboardAvoidingView,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import { RUNNER_LOGIN, SOCIAL_LOGIN_URL } from "../../Services/ApiUrls";
import {
  GetData,
  resetStack,
  SaveData,
  showToastMessage,
  validateEmail,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import {
  ACCESS_TOKEN,
  LOGIN_KEY,
  clearAsyncStorage,
} from "../../Storage/ApplicationStorage";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
Global = null;
var TOKEN = null;
const Sign_in = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login_payload = {
    username: email.trim(),
    password: password.trim(),
    firebase_token: TOKEN,
  };
  const [firName, setFirName] = useState("");
  const [lasName, setLasName] = useState("");
  const [email_id, setEmail_id] = useState("");
  const [show, setShow] = useState(false);
  const [social_id, setSocial_id] = useState("");
  const [social_type, setSocial_type] = useState("");
  const getFcToken = async () => {
    TOKEN = await getData("F_TOKEN");
  };
  const socialPayload = {
    firstname: firName,
    lastname: lasName,
    email: email_id || "abc@test.com",
    firebase_token: TOKEN,
    social_type: social_type,
    social_id: social_id,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_LOGIN,
    PAYLOAD: login_payload,
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
    URL: SOCIAL_LOGIN_URL,
    PAYLOAD: socialPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    getFcToken();

    if (data) {
      const status = data.status;
      const valid_user = data.data.is_completed;
      setTimeout(() => {
        showToastMessage(data.message);
      }, 300);

      if (status == 200 && valid_user == "1") {
        saveLoginData(data);
        resetStack(assets.NavigationConstants.DASHBOARD.NAME, null, navigation);
      } else if (status == 200 && valid_user == "0") {
        saveLoginData(data);
        resetStack(
          assets.NavigationConstants.STACKS.COMPLETE_PROFILE_STACK,
          null,
          navigation
        );
      }
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (g_data) {
      const isValid = g_data.status;
      const valid_user = g_data.data.is_completed;
      setTimeout(() => {
        showToastMessage(g_data.message);
      }, 300);
      if (isValid == 200 && valid_user == "1") {
        saveLoginData(g_data);
        showToastMessage(g_data.message);
        resetStack(assets.NavigationConstants.DASHBOARD.NAME, null, navigation);
      } else if (isValid == 200 && valid_user == "0") {
        saveLoginData(g_data);
        showToastMessage(g_data.message);
        resetStack(
          assets.NavigationConstants.STACKS.COMPLETE_PROFILE_STACK,
          null,
          navigation
        );
      }
    }
  }, [g_data, g_error, g_responseCode, g_loading]);

  useEffect(() => {
    if (social_id) g_fetchData(0);
  }, [social_id]);

  const saveLoginData = async (data) => {
    Global = data.data;
    await SaveData(LOGIN_KEY, JSON.stringify(data.data));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  GoogleSignin.configure({
    webClientId:
      Platform.OS === "android"
        ? "1013084230782-0vmeb1f1dpjpgqdi5hsddp21mchrmkn7.apps.googleusercontent.com"
        : "1013084230782-b6ui81uh8q0gbh6in07c07c08v8lic6u.apps.googleusercontent.com",
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
        showToastMessage("Some error occured");
        // some other error happened
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
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  };

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw "Apple Sign-In failed - no identify token returned";
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  };

  const setUserInformationAppleSignIn = (userData) => {
    const { additionalUserInfo, user } = userData;
    var fName;
    if (user) {
      if (user?.email) {
        var data = user?.email.split("@");
        setFirName(data[0]);
      }
    }
    setLasName("");
    setEmail_id(user.email);
    setSocial_type("facebook");
    setSocial_id(user.uid);
  };

  const isLoginValid = () => {
    if (!email.trim()) {
      showToastMessage("email name is required");
      return false;
    } else if (!validateEmail(email.trim())) {
      showToastMessage("enter valid email address");
      return false;
    } else if (!password.trim()) {
      showToastMessage("password is required");
      return false;
    } else if (password.trim().length < 8) {
      showToastMessage("password is required minimum 8 digits");
      return false;
    }
    return true;
  };

  const login = () => {
    if (isLoginValid()) {
      fetchData(0);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollContainer}>
          <Modal
            visible={
              loading === LOADING_TYPES.LOADING ||
              loading === LOADING_TYPES.FETCHING_MORE ||
              g_loading === LOADING_TYPES.LOADING ||
              g_loading === LOADING_TYPES.FETCHING_MORE
            }
            transparent={true}
          >
            <View style={[pallete.Loader_View]}>
              <ActivityIndicator
                size="large"
                color="white"
                justifyContent={"center"}
                marginTop="100%"
              />
            </View>
          </Modal>
          <Image source={assets.Images.STAY_PUT_LOGO} style={styles.logo} />
          <Text style={styles.subtitle}>Stay put, we'll get it for you!</Text>
          <Text_Input
            keyboard_type={""}
            placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
            event={(text) => setEmail(text)}
            edit={email}
            style={[styles.space_vertical, styles.spaceTop]}
            subtitle={"user@example.com"}
            title="Email Address"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text_Input
              keyboard_type={""}
              placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              event={(text) => setPassword(text)}
              edit={password}
              secureEntry={show}
              style={styles.space_vertical}
              subtitle={"* * * * * * *"}
              title="Password"
            />
            <Text
              onPress={() => setShow(!show)}
              style={{
                marginLeft: -40,
                fontSize: 15,
                marginTop: "7%",
                letterSpacing: 1,
              }}
            >
              {show ? " Hide" : "Show"}
            </Text>
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
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            event={login}
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
                { backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR },
              ]}
            >
              <Image
                source={assets.Images.GOOGLE_ICON}
                style={styles.iconStyle}
              />
            </Pressable>
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
          </View>
          <View style={styles.bottom}>
            <Text style={styles.accnt}>
              Don't have account?{" "}
              {
                <Text
                  onPress={() => [
                    clearAsyncStorage(),
                    navigate(assets.NavigationConstants.SIGN_UP.NAME),
                  ]}
                  style={styles.sign_up}
                >
                  Sign up
                </Text>
              }
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Sign_in;
