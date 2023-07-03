import React, { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../../common_components/Button";
const styles = useStyle();
export const Payment_pannel = ({ click, data, selected, id }) => {
  const { navigate } = useNavigation();
  const [IsselectedColor, setSelectedColor] = useState(id);

  return (
    <View>
      {data.map((item, index) => {
        return (
          <View style={styles.common_content}>
            <Pressable
              onPress={() => {
                selected(item);
                setSelectedColor(item.id);
              }}
              style={styles.icon_right}
            >
              <MaterialCommunityIcons
                name={
                  IsselectedColor === item.id
                    ? "circle-slice-8"
                    : "circle-outline"
                }
                color={
                  IsselectedColor === item.id
                    ? assets.Colors.SIGN_IN_COLOR
                    : assets.Colors.INPUT_TITLE_COLOR
                }
                size={25}
              />
              <Text
                style={[
                  styles.paymantTxt,
                  {
                    fontFamily:
                      IsselectedColor === item.id
                        ? assets.fonts.ROBOTO_MEDIUM
                        : assets.fonts.ROBOTO_REGULAR,
                  },
                ]}
              >
                {item.brand} {item.last4}
              </Text>
            </Pressable>
            <View></View>
          </View>
        );
      })}
      <Text
        onPress={() =>
          navigate(assets.NavigationConstants.DASHBOARD_STACK.NAME, {
            screen: assets.NavigationConstants.ADD_PAYMENT.NAME,
          })
        }
        style={styles.addAddress}
      >
        Add new card
      </Text>
      {data.length > 0 && (
        <Button
          imgBG={""}
          style={styles.address_list}
          event={click}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Confirm payment method"
        />
      )}
    </View>
  );
};
