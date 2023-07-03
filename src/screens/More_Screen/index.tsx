import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  Share,
  Linking,
  Alert,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-gesture-handler";
import Back_Header from "../../common_components/Back_Header";
import assets from "../../assets";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Optional_pannel } from "./component/optional_pannel";
import { GetData, resetStack, showToastMessage } from "../../utils/utilities";
import { clearAsyncStorage, LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { Invite_friends } from "./component/invite_friends_popup";
import { Emergency_call } from "./component/emergency_popup";
import Clipboard from "@react-native-community/clipboard";
import { LoginManager } from "react-native-fbsdk";
import { USER_DEACTIVATE } from "../../Services/ApiUrls";
import useRest, { CALL_TYPES } from "../../Services/rest/api";
const More_Screen = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const navigation = useNavigation();

  const [userid, setUserid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [profile, setProfile] = useState();
  const [referal_code, setReferalCode] = useState("");
  const [invite_popup, setInvitePopup] = useState(false);
  const [emergency_popup, setEmergencyPopup] = useState(false);

  const getData = async () => {
    const value = await GetData(LOGIN_KEY);
    if (value) {
      const user_info = JSON.parse(value);
      setUserid(user_info?.id);
      setFirstName(user_info?.firstname);
      setLastName(user_info?.lastname);
      setEmail(user_info?.email);
      setNumber(user_info?.phone);
      setProfile(user_info?.profile_pic);
      setReferalCode(user_info?.referel_code);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const payload = {
    status: "2",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: USER_DEACTIVATE,
    PAYLOAD: payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    if (responseCode == 200) {
      clearAsyncStorage();
      global.isProfileCompleted = false;
      resetStack(assets.NavigationConstants.AUTH_STACK.NAME, null, navigation);
      fbLogout();
    }
  }, [responseCode]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action

      getData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Promote StayPut and get paid now",
        message: referal_code ? referal_code : "https://stayputdelivery.com/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    setTimeout(() => {
      showToastMessage("Referal Code Copied.");
    }, 100);
  };

  const logout = () => {
    Alert.alert("Logout?", "Do you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          clearAsyncStorage();
          global.isProfileCompleted = false;
          resetStack(
            assets.NavigationConstants.AUTH_STACK.NAME,
            null,
            navigation
          );
          fbLogout();
        },
      },
    ]);
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account?",
      "Are you sure you want to delete your account.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            fetchData(0);
          },
        },
      ]
    );
  };
  const fbLogout = async () => {
    await LoginManager.logOut();
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header icon="" location={false} title="More" subtitle="" />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Pressable onPress={onShare} style={styles.topContainer}>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.promoteApp,
                    { color: assets.Colors.ACCOUNT_TXT_COLOR },
                  ]}
                >
                  Promote StayPut,
                </Text>
                <Text
                  style={[
                    styles.promoteApp,
                    { color: assets.Colors.TERMS_CONDITION_COLOR },
                  ]}
                >
                  {" "}
                  get paid
                </Text>
              </View>
              <Text style={styles.shareNow}>Share now</Text>
            </View>
            <Image
              source={assets.Images.DOLLAR_BAG}
              style={styles.sack_dollar}
            />
          </Pressable>
        </View>
        <Text style={styles.account}>ACCOUNT</Text>
        <Pressable
          onPress={() => navigate(assets.NavigationConstants.EDIT_ACCOUNT.NAME)}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <View style={styles.row}>
              <View style={styles.profile}>
                <Image source={{ uri: profile }} style={styles.image} />
              </View>
              <View style={styles.profile_column}>
                <Text style={styles.name}>
                  {firstName} {lastName}
                </Text>
                <Text style={styles.profile_details}>{email}</Text>
                <Text style={styles.profile_details}>{number}</Text>
              </View>
            </View>
            <Text style={styles.edit}>Edit</Text>
          </View>
        </Pressable>
        <View style={styles.paddingvertical}>
          <Optional_pannel
            icon={"map-marker-outline"}
            title="Delivery addresses"
            OnClick={() =>
              navigate(assets.NavigationConstants.CHANGE_LOCATION.NAME)
            }
          />
          <Optional_pannel
            icon={"credit-card-outline"}
            title="Payment methods"
            OnClick={() =>
              navigate(assets.NavigationConstants.DASHBOARD_STACK.NAME, {
                screen: assets.NavigationConstants.PAYMENT_METHOD.NAME,
              })
            }
          />
          <Optional_pannel
            icon={"tag-multiple-outline"}
            title="Credits, promos & gift cards"
            OnClick={() => alert("In Progress")}
          />
          <Optional_pannel
            icon={"segment"}
            title="My Favorite Products"
            OnClick={() =>
              navigate(assets.NavigationConstants.My_FAV_PRODUCTS.NAME)
            }
          />
          <Optional_pannel
            icon={"map-marker-outline"}
            title="Invite friends"
            OnClick={() => setInvitePopup(true)}
          />
        </View>
        <Text style={styles.account}>HELP</Text>
        <View style={styles.paddingvertical}>
          <Optional_pannel
            icon={"help-circle-outline"}
            title="Help Center"
            OnClick={() => navigate(assets.NavigationConstants.HELP_CENTER.KEY)}
          />
          <Optional_pannel
            icon={"headphones"}
            title="Emergency hotline"
            OnClick={() => setEmergencyPopup(!emergency_popup)}
          />
          <Optional_pannel
            icon={"delete"}
            title="Delete Account"
            OnClick={() => deleteAccount()}
          />
          <Optional_pannel
            icon={"download"}
            title="Logout"
            rightIconVisibility={false}
            OnClick={() => logout()}
          />
        </View>
        <Invite_friends
          handelCopy={(text) => copyToClipboard(text)}
          visible={invite_popup}
          close={() => setInvitePopup(!invite_popup)}
        />
        <Emergency_call
          visible={emergency_popup}
          close={() => setEmergencyPopup(!emergency_popup)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default More_Screen;
