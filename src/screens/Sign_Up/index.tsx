import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Secrets } from "../../assets/Secrets";
import Button from "../../common_components/Button";
import Text_Input from "../../common_components/Text_Input";
import {
  resetStack,
  SaveData,
  showToastMessage,
  validateEmail,
  validateNumber,
} from "../../utils/utilities";
import {
  CUSTOMER_CREATE,
  CUSTOMER_SOCIAL_LOGIN,
  TERM_CONDITION_LINK,
  PRIVACY_LINK,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { ACCESS_TOKEN, LOGIN_KEY } from "../../Storage/ApplicationStorage";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import { dW } from "../../utils/dynamicHeightWidth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getData } from "../../Storage/ApplicationStorage";
const Sign_Up = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNumber, setMobNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const [firName, setFirName] = useState("");
  const [lasName, setLasName] = useState("");
  const [email_id, setEmail_id] = useState("");
  const [social_type, setSocial_type] = useState("");
  const [social_id, setSocial_id] = useState("");
  const [pass_secure, setPassSecure] = useState(true);
  const [fcmToken, setfcmToken] = useState("");

  const signIn_payload = {
    firstname: firstName.trim(),
    lastname: lastName.trim(),
    email: email.trim(),
    password: password,
    phone: mobNumber.trim(),
    firebase_token: fcmToken,
  };

  const socialPayload = {
    firstname: firName,
    lastname: lasName,
    email: email_id,
    firebase_token: fcmToken,
    social_type: social_type,
    social_id: social_id,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CUSTOMER_CREATE,
    PAYLOAD: signIn_payload,
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
  useEffect(() => {
    if (data) {
      if (data.status == 200) {
        saveLoginData(data);
        global.UserId = data?.id;
        global.branchIo.logEvent("Account Sign Up", {
          customData: {
            anonymousid: data?.id,
            referrer: null,
            screenURL: "Sign_Up",
          },
        });
        setTimeout(() => {
          showToastMessage(data.message);
          navigate(assets.NavigationConstants.USER_TYPE.NAME);
        }, 100);
      } else {
        setTimeout(() => showToastMessage(data?.message), 300);
      }
    }
  }, [data, error, responseCode]);
  useEffect(async () => {
    tokenCallBack("token");
  }, []);
  const tokenCallBack = async (tokenn) => {
    const token = await getData("F_TOKEN");
    await setfcmToken(token);
  };
  useEffect(() => {
    if (g_data) {
      const isValid = g_data.status;
      const userinfo = g_data.data.is_completed;
      if (isValid == 200 && userinfo == "1") {
        saveLoginData(g_data);
        setTimeout(() => {
          resetStack(
            assets.NavigationConstants.STACKS.HOME_STACK,
            null,
            navigation
          );
        }, 100);
      } else if (isValid == 200 && userinfo == "0") {
        saveLoginData(g_data);
        setTimeout(() => {
          showToastMessage(g_data.message);
          navigate(assets.NavigationConstants.AUTH_STACK.NAME, {
            screen: assets.NavigationConstants.USER_TYPE.NAME,
          });
        }, 100);
      } else {
        setTimeout(() => showToastMessage(g_data.message), 100);
      }
    }
  }, [g_data, g_error, g_responseCode]);

  useEffect(() => {
    if (social_id) g_fetchData(0);
  }, [social_id]);

  const saveLoginData = async (data) => {
    const saveData = data.data;
    global.currentUserId = data?.data?.id;

    await SaveData(LOGIN_KEY, JSON.stringify(saveData));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  // GoogleSignin.configure({
  //   webClientId:
  //     Platform.OS === "android"
  //       ? "1013084230782-0vmeb1f1dpjpgqdi5hsddp21mchrmkn7.apps.googleusercontent.com"
  //       : "1013084230782-uqbnahhcg4cl57s8ikgqc579dfidh86f.apps.googleusercontent.com",
  // });
  // GoogleSignin.configure({
  //   webClientId:
  //     Platform.OS === "android"
  //       ? Secrets.FIR_GOOGLE_WEB_CLIENTID_ANDROID
  //       : Secrets.FIR_GOOGLE_WEB_CLIENTID_IOS,
  // });
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
      global.UserId = userInfo?.user?.id;
      global.branchIo.logEvent("Account Sign Up - Google", {
        customData: {
          anonymousid: userInfo?.user?.id,
          referrer: null,
          screenURL: "Sign_Up",
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
          console.log("login info has error: " + error);
        } else {
          setFirName(user.first_name);
          setLasName(user.last_name);
          setEmail_id(user.email);
          setSocial_type("facebook");
          setSocial_id(user.id);
          global.UserId = user?.id;
          global.branchIo.logEvent("Account Sign Up - Facebook", {
            customData: {
              anonymousid: user?.id,
              referrer: null,
              screenURL: "Sign_Up",
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
          console.log("Login cancelled");
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
    // const appleCredential = auth.AppleAuthProvider.credential(
    //     identityToken,
    //     nonce
    // );
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      return appleAuthRequestResponse;

      // return credentialState;
    }

    // Sign the user in with the credential
    // return auth().signInWithCredential(appleCredential);
    return appleAuthRequestResponse;
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
        anonymousid: user?.id,
        referrer: null,
        screenURL: "Sign_Up",
      },
    });
  };

  const isValid_signUp = () => {
    if (!firstName.trim()) {
      showToastMessage("Please enter first name");
      return false;
    } else if (!lastName.trim()) {
      showToastMessage("Please enter last name");
      return false;
    } else if (!email.trim()) {
      showToastMessage("Please enter email address");
      return false;
    } else if (!validateEmail(email.trim())) {
      showToastMessage("Please enter valid email");
      return false;
    } else if (!mobNumber.trim()) {
      showToastMessage("Please enter mobile number");
      return false;
    } else if (!validateNumber(mobNumber.trim())) {
      showToastMessage("Please enter valid mobile number");
      return false;
    } else if (mobNumber.trim().length != 10) {
      showToastMessage("Please enter 10 digits number");
      return false;
    } else if (!password) {
      showToastMessage("Please enter password");
      return false;
    } else if (password.length <= 7) {
      showToastMessage("Please enter at least 8 digit password");
      return false;
    }
    return true;
  };

  const valid_Signup = () => {
    if (isValid_signUp()) {
      fetchData(0);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAwareScrollView style={[pallete.screen_container]}>
        <Modal
          visible={
            loading === LOADING_TYPES.LOADING ||
            loading === LOADING_TYPES.FETCHING_MORE ||
            g_loading === LOADING_TYPES.LOADING ||
            g_loading === LOADING_TYPES.FETCHING_MORE
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
        <View style={styles.bottom_space}>
          <Image
            source={assets.Images.STAY_PUT_LOGO}
            style={styles.logoStyle}
          />
          <Text style={styles.subtitle}>Stay put, we'll get it for you!</Text>
          <View style={styles.accountSignin_View}>
            <Text style={styles.hveAccnt}>Already have an account? </Text>
            <Text onPress={goBack} style={styles.sign_in}>
              Sign in
            </Text>
          </View>
          <View style={styles.center_content}>
            <Button
              style={styles.bttn_width}
              event={loginWithFacebook}
              bgcolor={assets.Colors.FACEBOOK_BG_COLOR}
              image={true}
              imgBG={assets.Colors.BACKGROUND_THEME_COLOR}
              img={assets.Images.FB_ICON}
              title="Continue with Facebook"
            />
            <Button
              style={styles.bttn_width}
              event={google_signIn}
              bgcolor={assets.Colors.GOOGLE_BG_COLOR}
              image={true}
              img={assets.Images.GOOGLE_ICON}
              imgBG={assets.Colors.BACKGROUND_THEME_COLOR}
              title="Continue with Google+   "
            />
            {appleAuth.isSupported && (
              <Button
                style={styles.bttn_width}
                event={() =>
                  onAppleButtonPress().then((data) => {
                    setUserInformationAppleSignIn(data);
                  })
                }
                bgcolor={assets.Colors.BLACK_COLOR}
                image={true}
                img={assets.Images.APPLE_ICON}
                imgBG={assets.Colors.BLACK_COLOR}
                title="Continue with Apple       "
              />
            )}

            <Text
              onPress={() => alert("")}
              style={[styles.hveAccnt, styles.bttn_width]}
            >
              or continue with email
            </Text>
          </View>

          <View style={styles.bttn_width}>
            <View style={styles.row_inputs_view}>
              <Text_Input
                change={(e) => setFirstName(e)}
                edit={firstName}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="First Name"
              />
              <View style={styles.horizontal_spacer} />
              <Text_Input
                change={(e) => setLastName(e)}
                edit={lastName}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="Last Name"
              />
            </View>

            <Text_Input
              change={(e) => setEmail(e)}
              edit={email}
              style={styles.space_vertical}
              subtitle={""}
              title="Email Address"
            />
            <Text_Input
              keyboard={"numeric"}
              placeHolderColor={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              change={(e) => setMobNumber(e)}
              edit={mobNumber}
              style={styles.space_vertical}
              subtitle={"+1"}
              title="Mobile Number"
            />
            <View style={styles.row_inputs_view}>
              {/* <View style={styles.input_view}> */}
              {/* <Text style={styles.input_title}>Password</Text> */}
              {/* <TextInput placeholder='at least 8 characters' value={password}
                                    placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                                    style={styles.placeholder}
                                    returnKeyType={'done'}
                                    secureTextEntry={secure}
                                    onChangeText={(e) => setPassword(e)} /> */}
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
              {/* </View> */}
              {/* <Text onPress={() => setSecure(false)} style={styles.show}>Show</Text> */}
            </View>
            {/* <Pressable style={[styles.center_content, { backgroundColor: assets.Colors.BUTTON_THEME_COLOR, alignItems: 'center', justifyContent: 'center' }]} onPress={valid_Signup}>
                            <Text style={[{ padding: dW(12), fontSize: dW(16), color: 'white', fontFamily: assets.fonts.ROBOTO_MEDIUM }]}   >Sign up</Text>
                        </Pressable> */}
            <Button
              imgBG={""}
              style={styles.spaceTop}
              event={valid_Signup}
              bgcolor={assets.Colors.BUTTON_THEME_COLOR}
              image={false}
              img={""}
              title="Sign up"
            />
          </View>

          <View style={styles.bottom_view}>
            <Pressable
              style={styles.bottom_row}
              onPress={() =>
                navigate(assets.NavigationConstants.WEBVIEW.NAME, {
                  Link: TERM_CONDITION_LINK,
                  title: "Terms and Conditions",
                })
              }
            >
              <Text style={styles.bottomTxt}>
                By clicking sign up, you agree to our
              </Text>
              <Text style={styles.terms_condition}> Terms and </Text>
            </Pressable>

            <View style={styles.bottom_row}>
              <Text
                onPress={() =>
                  navigate(assets.NavigationConstants.WEBVIEW.NAME, {
                    Link: TERM_CONDITION_LINK,
                    title: "Terms and Conditions",
                  })
                }
                style={styles.terms_condition}
              >
                Conditions
              </Text>
              <Pressable
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigate(assets.NavigationConstants.WEBVIEW.NAME, {
                    Link: PRIVACY_LINK,
                    title: "Privacy Policy",
                  })
                }
              >
                <Text style={styles.bottomTxt}> and</Text>
                <Text style={styles.terms_condition}> Privacy Statement</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Sign_Up;
