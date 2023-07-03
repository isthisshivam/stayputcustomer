import React from "react";
import { View, Text, Pressable } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { dW } from "../../../utils/dynamicHeightWidth";

const styles = useStyle();

export const Common_pannel = ({
  icon1,
  title,
  subtitle,
  event,
  bottom,
  icon,
  subHeadingVisible,
  subHeading,
  numberOfLines,
}) => {
  return (
    <Pressable onPress={event}>
      <View style={styles.common_content}>
        <View style={styles.icon_right}>
          <MaterialCommunityIcons
            name={icon1}
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={dW(23)}
          />
          <View style={styles.center_content}>
            <Text
              numberOfLines={numberOfLines ? numberOfLines : 1}
              style={styles.title}
            >
              {title}
            </Text>
            {bottom == false ? null : (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        </View>
        <SimpleLineIcons
          name={icon}
          color={assets.Colors.INPUT_HOLDER_TXT_COLOR}
          size={22}
        />
      </View>
    </Pressable>
  );
};
