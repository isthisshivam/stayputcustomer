import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Linking, Pressable } from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";
import Header from "./component/header";
import FAQs_pannel from "./component/faqs_pannel";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CALL_US, EMAIL } from "../../constants/ContactConstants";

const Need_Help = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  const sendMail = () => {
    Linking.openURL(`${EMAIL}`);
  };

  const callUs = () => {
    Linking.openURL(`${CALL_US}`);
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Header />
      <ScrollView style={{ flex: 1, paddingHorizontal: dW(25) }}>
        <Text style={styles.need_help}>Need Help ?</Text>
        <Text style={styles.faq}>FAQs</Text>
        <View style={styles.faqs_containor}>
          <FAQs_pannel
            border={true}
            title={"Who?"}
            subtitle={
              "Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis"
            }
          />
          <FAQs_pannel
            border={true}
            title={"What?"}
            subtitle={
              "Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis"
            }
          />
          <FAQs_pannel
            border={true}
            title={"When?"}
            subtitle={
              "Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis"
            }
          />
          <FAQs_pannel
            border={true}
            title={"Why?"}
            subtitle={
              "Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis"
            }
          />
          <FAQs_pannel
            border={false}
            title={"Where?"}
            subtitle={
              "Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis Sed ut perspiciatis"
            }
          />
        </View>
        <Text style={styles.faq}>Contact Us</Text>
        <View style={styles.bottom_row}>
          {props?.route?.params?.runnerId && (
            <Pressable
              onPress={() =>
                navigate(
                  assets.NavigationConstants.CHATTING.NAME,
                  props?.route?.params
                )
              }
              style={styles.icon_text}
            >
              <View style={styles.icon_bg}>
                <Ionicons
                  name={"chatbubble-ellipses-outline"}
                  color={assets.Colors.SIGN_IN_COLOR}
                  size={dW(28)}
                  style={styles.iconStyle}
                />
              </View>
              <Text style={styles.live_chat}>Live Chat</Text>
            </Pressable>
          )}

          <Pressable onPress={callUs} style={styles.icon_text}>
            <View style={styles.icon_bg}>
              <Ionicons
                name={"call-outline"}
                color={assets.Colors.SIGN_IN_COLOR}
                size={dW(25)}
                style={styles.iconStyle}
              />
            </View>
            <Text style={styles.live_chat}>Call Us</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={sendMail}
          style={[
            styles.icon_text,
            { alignSelf: "flex-start", marginTop: dW(15), marginLeft: dW(11) },
          ]}
        >
          <View style={styles.icon_bg}>
            <Ionicons
              name={"mail"}
              color={assets.Colors.SIGN_IN_COLOR}
              size={dW(26)}
              style={styles.iconStyle}
            />
          </View>
          <Text style={styles.live_chat}>Email</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Need_Help;
