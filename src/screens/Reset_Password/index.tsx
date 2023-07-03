import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
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
import { PASSWORD_RESET_URL } from "../../Services/ApiUrls";
import { resetStack, showToastMessage } from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

const Pass_reset = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const [new_pass, setNew_Pass] = useState("");
  const [confirm_pass, setConfirm_Pass] = useState("");
  const update_token = route?.params?.password_update_token;

  const password_payload = {
    password_update_token: update_token,
    new_password: new_pass.trim(),
    type: "2",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: PASSWORD_RESET_URL,
    PAYLOAD: password_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        showToastMessage(data.message);
      }, 300);
      if (data.status == 200) {
        resetStack(assets.NavigationConstants.LOG_IN.NAME, null, navigation);
      }
    }
  }, [data, error, responseCode]);

  const isPassValid = () => {
    if (!new_pass.trim()) {
      showToastMessage("fill your new password");
      return false;
    } else if (new_pass.trim().length < 8) {
      showToastMessage("password should have 8 digit");
      return false;
    } else if (!confirm_pass.trim()) {
      showToastMessage("confirm your password");
      return false;
    } else if (new_pass.trim() != confirm_pass.trim()) {
      showToastMessage("password not matched");
      return false;
    }
    return true;
  };
  const Valid_Pass = () => {
    if (isPassValid()) {
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
              loading === LOADING_TYPES.FETCHING_MORE
            }
            transparent={true}
          >
            <View style={[pallete.loader_View]}>
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
            secure={false}
            change={(text) => setNew_Pass(text)}
            edit={new_pass}
            style={[styles.space_vertical, styles.spaceTop]}
            subtitle={""}
            title="New Password"
          />
          <Text_Input
            secure={false}
            change={(text) => setConfirm_Pass(text)}
            edit={confirm_pass}
            style={[styles.space_vertical, styles.spaceTop]}
            subtitle={""}
            title="Confirm Password"
          />
          <Button
            imgBG={""}
            style={styles.spaceTop}
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            event={Valid_Pass}
            bgcolor={assets.Colors.BUTTON_THEME_COLOR}
            image={false}
            img={""}
            title="Confirm"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Pass_reset;
