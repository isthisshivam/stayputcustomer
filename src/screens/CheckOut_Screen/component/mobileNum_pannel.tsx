import React from "react";
import { View, Text, TextInput } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";
import Button from "../../../common_components/Button";
import { dW } from "../../../utils/dynamicHeightWidth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const styles = useStyle();
export const MobileNum_pannel = ({ click, num, change, bg }) => {
  return (
    <View style={{ marginTop: dW(15) }}>
      <Text
        style={[
          styles.msg,
          {
            fontFamily: assets.fonts.ROBOTO_LIGHT,
            color: assets.Colors.ACCOUNT_TXT_COLOR,
          },
        ]}
      >
        We will text you with order updates. Your runner may also need to
        contact you.
      </Text>
      <Text
        style={[
          styles.msg,
          { fontFamily: assets.fonts.ROBOTO_MEDIUM, marginTop: dW(10) },
        ]}
      >
        Mobile number
      </Text>
      <View style={styles.input_view}>
        <TextInput
          placeholder="(10-digit)"
          value={num}
          keyboardType="numeric"
          returnKeyType={"done"}
          onChangeText={change}
          placeholderTextColor={assets.Colors.ACCOUNT_TXT_COLOR}
          style={styles.placeHolder}
        />
      </View>
      <Button
        imgBG={""}
        style={{ marginTop: dW(10) }}
        event={click}
        bgcolor={bg}
        image={false}
        img={""}
        title="Continue"
      />
    </View>
  );
};

export const Scheduled_pannel = ({
  title,
  bolt,
  icon1,
  icon2,
  change1,
  change2,
}) => {
  return (
    <View>
      <View style={styles.items_container}>
        <View style={styles.rowright}>
          <MaterialCommunityIcons
            onPress={change1}
            name={icon1 === false ? "circle-outline" : "circle-slice-8"}
            color={
              icon1 === false
                ? assets.Colors.INPUT_TITLE_COLOR
                : assets.Colors.SIGN_IN_COLOR
            }
            size={25}
          />
          <FontAwesome
            name="bolt"
            color={assets.Colors.BUTTON_THEME_COLOR}
            size={20}
            style={{ marginLeft: dW(13) }}
          />
          <Text style={styles.scheduleTime_Txt}>1~2hrs</Text>
        </View>
        <Text style={styles.cmnt}>Standard Delivey</Text>
      </View>
      <View style={styles.items_container}>
        <View style={styles.rowright}>
          <MaterialCommunityIcons
            onPress={change2}
            name={icon2 === false ? "circle-outline" : "circle-slice-8"}
            color={
              icon2 === false
                ? assets.Colors.INPUT_TITLE_COLOR
                : assets.Colors.SIGN_IN_COLOR
            }
            size={25}
          />
          {bolt === false ? null : (
            <View style={styles.rowright}>
              <FontAwesome
                name="clock-o"
                color={assets.Colors.THEME_COLOR_PRIMARY}
                size={dW(25)}
                style={{ marginLeft: dW(15), alignItems: "center" }}
              />
              <FontAwesome5
                name="car"
                color={assets.Colors.THEME_COLOR_PRIMARY}
                size={dW(25)}
                style={{ marginLeft: dW(8), alignItems: "center" }}
              />
            </View>
          )}
          <Text style={styles.scheduleTime_Txt}>{title}</Text>
        </View>
        <Text style={styles.cmnt}>Scheduled Delivery</Text>
      </View>
    </View>
  );
};
